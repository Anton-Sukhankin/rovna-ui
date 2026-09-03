const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const zlib = require('zlib');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const packagesRoot = path.join(appRoot, 'packages');
const boundaryPath = path.join(appRoot, 'release-boundary.json');
const budgetPath = path.join(appRoot, 'artifact-size-budgets.json');
const releaseRoot = path.join(repoRoot, 'release', 'rovna-ui-4.82.0');
const publicationManifestPath = path.join(releaseRoot, 'publication-manifest.json');
const reportPath = path.join(repoRoot, 'docs', 'r07-package-artifacts.json');
const update = process.argv.includes('--update');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function listFiles(root) {
  const files = [];
  const queue = [root];
  while (queue.length) {
    const current = queue.shift();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) queue.push(absolute);
      else files.push(absolute);
    }
  }
  return files;
}

function sum(files) {
  return files.reduce((total, filePath) => total + fs.statSync(filePath).size, 0);
}

function gzipSum(files) {
  return files.reduce(
    (total, filePath) => total + zlib.gzipSync(fs.readFileSync(filePath), { level: 9 }).length,
    0,
  );
}

function roundBudget(value, ratio, quantum) {
  return Math.ceil((value * ratio) / quantum) * quantum;
}

function findPackageDirectories() {
  const entries = new Map();
  for (const directory of fs.readdirSync(packagesRoot, { withFileTypes: true })) {
    if (!directory.isDirectory()) continue;
    const manifestPath = path.join(packagesRoot, directory.name, 'package.json');
    if (!fs.existsSync(manifestPath)) continue;
    const manifest = readJson(manifestPath);
    if (manifest.name) entries.set(manifest.name, directory.name);
  }
  return entries;
}

function tarballEntries(tarballPath) {
  const result = spawnSync('tar', ['-tzf', tarballPath], {
    encoding: 'utf8',
    maxBuffer: 100 * 1024 * 1024,
  });
  if (result.status !== 0) {
    throw new Error(`Cannot list ${tarballPath}: ${result.stderr || result.error?.message}`);
  }
  return result.stdout.split(/\r?\n/).filter(Boolean);
}

function validateMap(mapPath, jsPath, packageRoot, errors) {
  const relativeMap = path.relative(packageRoot, mapPath).replace(/\\/g, '/');
  const raw = fs.readFileSync(mapPath, 'utf8');
  let map;
  try {
    map = JSON.parse(raw);
  } catch (error) {
    errors.push(`${relativeMap}: invalid JSON (${error.message})`);
    return { sources: 0 };
  }

  if (map.version !== 3) errors.push(`${relativeMap}: source map version must be 3`);
  if (map.file !== path.basename(jsPath)) {
    errors.push(`${relativeMap}: map.file does not match ${path.basename(jsPath)}`);
  }
  if (map.sourcesContent !== null && map.sourcesContent !== undefined) {
    errors.push(`${relativeMap}: sourcesContent must be null or omitted from public artifacts`);
  }
  if (!Array.isArray(map.sources)) errors.push(`${relativeMap}: sources must be an array`);

  for (const source of map.sources || []) {
    const normalized = String(source).replace(/\\/g, '/');
    if (
      path.isAbsolute(source) ||
      /^[A-Za-z]:[\\/]/.test(source) ||
      /^(?:file|https?):\/\//i.test(source) ||
      normalized.startsWith('//') ||
      normalized.includes('/node_modules/')
    ) {
      errors.push(`${relativeMap}: unsafe source path ${source}`);
      continue;
    }
    const resolved = path.resolve(path.dirname(mapPath), ...normalized.split('/'));
    if (resolved !== packageRoot && !resolved.startsWith(`${packageRoot}${path.sep}`)) {
      errors.push(`${relativeMap}: source escapes package root (${source})`);
    } else if (!fs.existsSync(resolved)) {
      errors.push(`${relativeMap}: source does not exist (${source})`);
    }
  }

  if (/(?:file:\/\/|https?:\/\/|[A-Za-z]:[\\/]Users[\\/]|\\\\[^\\])/i.test(raw)) {
    errors.push(`${relativeMap}: absolute path or URL leaked into source map`);
  }
  return { sources: (map.sources || []).length };
}

function measurePackage(packageName, directory, releaseEntry) {
  const packageRoot = path.join(packagesRoot, directory);
  const distRoot = path.join(packageRoot, 'dist');
  const errors = [];
  if (!fs.existsSync(distRoot)) return { name: packageName, errors: ['dist is missing'] };

  const files = listFiles(distRoot);
  const jsFiles = files.filter(filePath => filePath.endsWith('.js'));
  const mapFiles = files.filter(filePath => filePath.endsWith('.js.map'));
  const declarationFiles = files.filter(filePath => filePath.endsWith('.d.ts'));
  const esmFiles = jsFiles.filter(filePath => !path.relative(distRoot, filePath).startsWith(`cjs${path.sep}`));
  const cjsFiles = jsFiles.filter(filePath => path.relative(distRoot, filePath).startsWith(`cjs${path.sep}`));
  let mappedSources = 0;

  for (const jsPath of jsFiles) {
    const mapPath = `${jsPath}.map`;
    const relativeJs = path.relative(packageRoot, jsPath).replace(/\\/g, '/');
    if (!fs.existsSync(mapPath)) {
      errors.push(`${relativeJs}: source map is missing`);
      continue;
    }
    const source = fs.readFileSync(jsPath, 'utf8');
    const references = [...source.matchAll(/\/\/[#@]\s*sourceMappingURL=([^\s]+)/g)];
    if (references.length !== 1 || references[0][1] !== path.basename(mapPath)) {
      errors.push(`${relativeJs}: invalid sourceMappingURL`);
    }
    mappedSources += validateMap(mapPath, jsPath, packageRoot, errors).sources;
  }

  for (const mapPath of mapFiles) {
    if (!fs.existsSync(mapPath.slice(0, -4))) {
      errors.push(`${path.relative(packageRoot, mapPath)}: orphan source map`);
    }
  }

  const distManifestPath = path.join(distRoot, 'package.json');
  const distManifest = fs.existsSync(distManifestPath) ? readJson(distManifestPath) : {};
  if (
    !Array.isArray(distManifest.sideEffects) ||
    !distManifest.sideEffects.includes('**/*.css')
  ) {
    errors.push('dist/package.json must declare CSS-only sideEffects');
  }

  let tarball = null;
  if (!releaseEntry) {
    errors.push('release tarball entry is missing');
  } else {
    const tarballPath = path.join(releaseRoot, 'packages', releaseEntry.file);
    if (!fs.existsSync(tarballPath)) {
      errors.push(`release tarball is missing: ${releaseEntry.file}`);
    } else {
      const entries = tarballEntries(tarballPath);
      const tarballJs = entries.filter(entry => entry.endsWith('.js')).length;
      const tarballMaps = entries.filter(entry => entry.endsWith('.js.map')).length;
      if (tarballJs !== jsFiles.length || tarballMaps !== mapFiles.length) {
        errors.push(
          `tarball JS/map coverage ${tarballJs}/${tarballMaps} does not match dist ${jsFiles.length}/${mapFiles.length}`,
        );
      }
      tarball = {
        file: releaseEntry.file,
        bytes: fs.statSync(tarballPath).size,
        jsFiles: tarballJs,
        sourceMaps: tarballMaps,
      };
    }
  }

  return {
    name: packageName,
    directory,
    status: errors.length ? 'failed' : 'passed',
    errors,
    files: files.length,
    jsFiles: jsFiles.length,
    esmFiles: esmFiles.length,
    cjsFiles: cjsFiles.length,
    declarations: declarationFiles.length,
    sourceMaps: mapFiles.length,
    mappedSources,
    sizes: {
      distBytes: sum(files),
      esmBytes: sum(esmFiles),
      cjsBytes: sum(cjsFiles),
      sourceMapBytes: sum(mapFiles),
      esmGzipBytes: gzipSum(esmFiles),
      cjsGzipBytes: gzipSum(cjsFiles),
      tarballBytes: tarball?.bytes || 0,
    },
    tarball,
  };
}

function createBudgets(rows) {
  const packages = {};
  for (const row of rows) {
    packages[row.name] = {
      baseline: row.sizes,
      max: {
        distBytes: roundBudget(row.sizes.distBytes, 1.08, 4096),
        esmBytes: roundBudget(row.sizes.esmBytes, 1.06, 2048),
        cjsBytes: roundBudget(row.sizes.cjsBytes, 1.06, 2048),
        sourceMapBytes: roundBudget(row.sizes.sourceMapBytes, 1.08, 4096),
        esmGzipBytes: roundBudget(row.sizes.esmGzipBytes, 1.08, 1024),
        cjsGzipBytes: roundBudget(row.sizes.cjsGzipBytes, 1.08, 1024),
        tarballBytes: roundBudget(row.sizes.tarballBytes, 1.1, 4096),
      },
    };
  }
  return {
    formatVersion: 1,
    updatedAt: new Date().toISOString(),
    policy: 'Explicit R-07 baseline with 6-10% rounded headroom; update requires review.',
    packages,
  };
}

function applyBudgets(rows, budgets) {
  const violations = [];
  for (const row of rows) {
    const budget = budgets?.packages?.[row.name]?.max;
    if (!budget) {
      violations.push(`${row.name}: budget is missing`);
      continue;
    }
    for (const [metric, maximum] of Object.entries(budget)) {
      const actual = row.sizes[metric];
      if (!Number.isFinite(actual) || actual > maximum) {
        violations.push(`${row.name}: ${metric} ${actual} exceeds ${maximum}`);
      }
    }
  }
  return violations;
}

function main() {
  const startedAt = Date.now();
  const boundary = readJson(boundaryPath);
  const directories = findPackageDirectories();
  const publication = fs.existsSync(publicationManifestPath)
    ? readJson(publicationManifestPath)
    : { packages: [] };
  const releaseEntries = new Map((publication.packages || []).map(entry => [entry.name, entry]));
  const rows = boundary.publicReleasePackages.map(packageName =>
    measurePackage(packageName, directories.get(packageName), releaseEntries.get(packageName)),
  );
  const artifactErrors = rows.flatMap(row => row.errors.map(error => `${row.name}: ${error}`));

  let budgets = fs.existsSync(budgetPath) ? readJson(budgetPath) : null;
  if (update && artifactErrors.length === 0) {
    budgets = createBudgets(rows);
    fs.writeFileSync(budgetPath, `${JSON.stringify(budgets, null, 2)}\n`);
  }
  const budgetViolations = update ? [] : applyBudgets(rows, budgets);
  const errors = [...artifactErrors, ...budgetViolations];
  const report = {
    status: errors.length ? 'failed' : 'passed',
    mode: update ? 'update' : 'check',
    checkedAt: new Date().toISOString(),
    networkInstallAllowed: false,
    packages: rows.length,
    summary: {
      passedPackages: rows.filter(row => row.status === 'passed').length,
      jsFiles: rows.reduce((total, row) => total + (row.jsFiles || 0), 0),
      sourceMaps: rows.reduce((total, row) => total + (row.sourceMaps || 0), 0),
      declarations: rows.reduce((total, row) => total + (row.declarations || 0), 0),
      mappedSources: rows.reduce((total, row) => total + (row.mappedSources || 0), 0),
      distBytes: rows.reduce((total, row) => total + (row.sizes?.distBytes || 0), 0),
      tarballBytes: rows.reduce((total, row) => total + (row.sizes?.tarballBytes || 0), 0),
      artifactErrors: artifactErrors.length,
      budgetViolations: budgetViolations.length,
    },
    budget: path.relative(repoRoot, budgetPath).replace(/\\/g, '/'),
    errors,
    rows,
    durationMs: Date.now() - startedAt,
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`R-07 package artifact audit: ${report.status}`);
  console.log(
    `Packages: ${report.summary.passedPackages}/${rows.length}; JS/maps: ${report.summary.jsFiles}/${report.summary.sourceMaps}`,
  );
  console.log(`Artifact errors: ${artifactErrors.length}; budget violations: ${budgetViolations.length}`);
  console.log(`Report: ${reportPath}`);
  if (errors.length) {
    for (const error of errors.slice(0, 50)) console.error(error);
    process.exitCode = 1;
  }
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
}
