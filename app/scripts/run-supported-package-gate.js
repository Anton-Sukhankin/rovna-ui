const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const packagesRoot = path.join(appRoot, 'packages');
const scopePath = path.join(appRoot, 'ds-package-scope.json');
const reportPath = path.join(repoRoot, 'tmp', 'g07-supported-package-gate.json');
const logPath = path.join(repoRoot, 'tmp', 'g07-supported-package-build.log');
const buildTimeout = Number(process.env.DS_PACKAGE_BUILD_TIMEOUT || 900000);
const checkOnly = process.argv.includes('--check-only');
const onlyArgument = process.argv.find(argument => argument.startsWith('--only='));
const onlyNames = onlyArgument
  ? new Set(onlyArgument.slice('--only='.length).split(',').filter(Boolean))
  : null;
const supportedClassifications = new Set(['core', 'extended']);
const allowedClassifications = new Set([
  'core',
  'extended',
  'experimental/source-only',
  'excluded',
]);

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

function targetExists(distRoot, target) {
  const relative = target.replace(/^\.\//, '').replace(/\//g, path.sep);
  if (!relative.includes('*')) return fs.existsSync(path.join(distRoot, relative));

  const normalizedPattern = relative.replace(/\\/g, '/');
  const [prefix, suffix] = normalizedPattern.split('*');
  return listFiles(distRoot).some(filePath => {
    const candidate = path.relative(distRoot, filePath).replace(/\\/g, '/');
    return candidate.startsWith(prefix) && candidate.endsWith(suffix);
  });
}

function assertSafeDistPath(packageRoot, distRoot) {
  const expected = path.join(path.resolve(packageRoot), 'dist');
  if (path.resolve(distRoot) !== expected || !expected.startsWith(`${path.resolve(packageRoot)}${path.sep}`)) {
    throw new Error(`Unsafe dist path: ${distRoot}`);
  }
}

function discoverPublicPackages() {
  const packages = [];
  for (const entry of fs.readdirSync(packagesRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const manifestPath = path.join(packagesRoot, entry.name, 'package.json');
    if (!fs.existsSync(manifestPath)) continue;
    const manifest = readJson(manifestPath);
    if (manifest.name?.startsWith('@rovna-ui/') && !manifest.private) {
      packages.push({ name: manifest.name, directory: entry.name, manifest });
    }
  }
  return packages.sort((left, right) => left.name.localeCompare(right.name));
}

function validateScope(scope, discovered) {
  const errors = [];
  const configuredNames = scope.packages.map(entry => entry.name);
  const discoveredNames = discovered.map(entry => entry.name);
  const duplicateNames = configuredNames.filter((name, index) => configuredNames.indexOf(name) !== index);
  const missing = discoveredNames.filter(name => !configuredNames.includes(name));
  const unknown = configuredNames.filter(name => !discoveredNames.includes(name));

  if (duplicateNames.length) errors.push(`Duplicate scope packages: ${[...new Set(duplicateNames)].join(', ')}`);
  if (missing.length) errors.push(`Public packages missing from scope: ${missing.join(', ')}`);
  if (unknown.length) errors.push(`Unknown packages in scope: ${unknown.join(', ')}`);

  for (const entry of scope.packages) {
    if (!allowedClassifications.has(entry.classification)) {
      errors.push(`${entry.name}: invalid classification ${entry.classification}`);
    }
    const discoveredEntry = discovered.find(candidate => candidate.name === entry.name);
    if (discoveredEntry && discoveredEntry.directory !== entry.directory) {
      errors.push(`${entry.name}: directory mismatch (${entry.directory} != ${discoveredEntry.directory})`);
    }
    if (!entry.reason) errors.push(`${entry.name}: missing classification reason`);
    if (supportedClassifications.has(entry.classification) && !Number.isInteger(entry.buildOrder)) {
      errors.push(`${entry.name}: supported package requires buildOrder`);
    }
  }

  return errors;
}

function validateArtifact(scopeEntry, selectedNames) {
  const packageRoot = path.join(packagesRoot, scopeEntry.directory);
  const sourceManifest = readJson(path.join(packageRoot, 'package.json'));
  const distRoot = path.join(packageRoot, 'dist');
  const errors = [];

  if (!fs.existsSync(distRoot)) return { errors: ['dist directory is missing'] };
  const distManifestPath = path.join(distRoot, 'package.json');
  if (!fs.existsSync(distManifestPath)) return { errors: ['dist/package.json is missing'] };

  const distManifest = readJson(distManifestPath);
  if (distManifest.name !== sourceManifest.name) errors.push('dist package name does not match source');
  if (distManifest.version !== sourceManifest.version) errors.push('dist package version does not match source');
  if (
    !Array.isArray(distManifest.sideEffects) ||
    !distManifest.sideEffects.includes('**/*.css')
  ) {
    errors.push('dist manifest must declare CSS-only sideEffects');
  }

  for (const field of ['module', 'main', 'types']) {
    if (!distManifest[field]) errors.push(`dist manifest has no ${field}`);
    else if (!targetExists(distRoot, distManifest[field])) {
      errors.push(`${field} target is missing: ${distManifest[field]}`);
    }
  }

  if (!distManifest.exports || !distManifest.exports['.']) {
    errors.push('conditional root export is missing');
  } else {
    for (const [subpath, conditions] of Object.entries(distManifest.exports)) {
      if (!conditions || typeof conditions !== 'object') {
        errors.push(`${subpath}: export is not a conditional object`);
        continue;
      }
      const requiredConditions = subpath === '.' ? ['types', 'import', 'require'] : ['types'];
      for (const condition of requiredConditions) {
        if (!conditions[condition]) errors.push(`${subpath}: ${condition} target is missing`);
      }
      if (!!conditions.import !== !!conditions.require) {
        errors.push(`${subpath}: import and require targets must be declared together`);
      }
      for (const condition of ['types', 'import', 'require']) {
        if (conditions[condition] && !targetExists(distRoot, conditions[condition])) {
          errors.push(`${subpath}: ${condition} file is missing (${conditions[condition]})`);
        }
      }
    }
  }

  const internalDependencies = Object.keys(sourceManifest.dependencies || {}).filter(name =>
    name.startsWith('@rovna-ui/'),
  );
  const outsideScope = internalDependencies.filter(name => !selectedNames.has(name));
  if (outsideScope.length) {
    errors.push(`supported package depends on packages outside scope: ${outsideScope.join(', ')}`);
  }

  const files = listFiles(distRoot);
  const jsFiles = files.filter(file => file.endsWith('.js'));
  const sourceMapFiles = files.filter(file => file.endsWith('.js.map'));
  const missingSourceMaps = jsFiles.filter(file => !fs.existsSync(`${file}.map`));
  const orphanSourceMaps = sourceMapFiles.filter(file => !fs.existsSync(file.slice(0, -4)));
  if (missingSourceMaps.length) {
    errors.push(`JavaScript files without source maps: ${missingSourceMaps.length}`);
  }
  if (orphanSourceMaps.length) {
    errors.push(`orphan JavaScript source maps: ${orphanSourceMaps.length}`);
  }
  return {
    errors,
    files: files.length,
    declarations: files.filter(file => file.endsWith('.d.ts')).length,
    javaScript: jsFiles.length,
    sourceMaps: sourceMapFiles.length,
    exports: Object.keys(distManifest.exports || {}).length,
    internalDependencies,
    entrypoints: {
      esm: distManifest.module || null,
      cjs: distManifest.main || null,
      types: distManifest.types || null,
    },
  };
}

function buildPackage(scopeEntry) {
  const packageRoot = path.join(packagesRoot, scopeEntry.directory);
  const distRoot = path.join(packageRoot, 'dist');
  assertSafeDistPath(packageRoot, distRoot);
  fs.rmSync(distRoot, { force: true, recursive: true });

  const startedAt = Date.now();
  const result = spawnSync(
    'corepack',
    ['yarn', 'workspace', scopeEntry.name, 'build'],
    {
      cwd: appRoot,
      encoding: 'utf8',
      env: {
        ...process.env,
        COREPACK_ENABLE_NETWORK: '0',
        STORYBOOK_DISABLE_TELEMETRY: '1',
        npm_config_offline: 'true',
      },
      maxBuffer: 100 * 1024 * 1024,
      shell: process.platform === 'win32',
      timeout: buildTimeout,
    },
  );

  fs.appendFileSync(
    logPath,
    `\n===== ${scopeEntry.name} =====\n${result.stdout || ''}${result.stderr || ''}`,
  );

  return {
    status: result.status,
    signal: result.signal || null,
    error: result.error ? result.error.message : null,
    durationMs: Date.now() - startedAt,
  };
}

function main() {
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  if (!checkOnly && !onlyNames) fs.writeFileSync(logPath, '');
  else if (!checkOnly && onlyNames) fs.appendFileSync(logPath, '\n===== REPAIR BUILD =====\n');

  const scope = readJson(scopePath);
  const discovered = discoverPublicPackages();
  const scopeErrors = validateScope(scope, discovered);
  const selected = scope.packages
    .filter(entry => supportedClassifications.has(entry.classification))
    .sort((left, right) => left.buildOrder - right.buildOrder || left.name.localeCompare(right.name));
  const selectedNames = new Set(selected.map(entry => entry.name));
  const results = [];
  const startedAt = Date.now();

  if (!scopeErrors.length) {
    for (const entry of selected) {
      const shouldBuild = !checkOnly && (!onlyNames || onlyNames.has(entry.name));
      const build = shouldBuild ? buildPackage(entry) : null;
      const artifact = build && build.status !== 0
        ? { errors: [`build failed with code ${build.status}: ${build.error || 'see build log'}`] }
        : validateArtifact(entry, selectedNames);
      const status = artifact.errors.length ? 'failed' : 'passed';
      results.push({ ...entry, status, build, artifact });
      console.log(`${entry.name}: ${status}${build ? ` (${Math.round(build.durationMs / 1000)}s)` : ''}`);
    }
  }

  const classificationCounts = scope.packages.reduce((counts, entry) => {
    counts[entry.classification] = (counts[entry.classification] || 0) + 1;
    return counts;
  }, {});
  const failed = results.filter(result => result.status === 'failed');
  const report = {
    status: scopeErrors.length || failed.length ? 'failed' : 'passed',
    mode: checkOnly ? 'check-only' : onlyNames ? 'repair-build' : 'fresh-build',
    networkInstallAllowed: false,
    discoveredPublicPackages: discovered.length,
    configuredPackages: scope.packages.length,
    classificationCounts,
    selectedPackages: selected.length,
    passedPackages: results.filter(result => result.status === 'passed').length,
    failedPackages: failed.length,
    scopeErrors,
    results,
    durationMs: Date.now() - startedAt,
    scopePath,
    logPath: checkOnly ? null : logPath,
  };

  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`G-07 supported package gate: ${report.status}`);
  console.log(`Scope: ${JSON.stringify(classificationCounts)}`);
  console.log(`Selected: ${report.selectedPackages}; passed: ${report.passedPackages}; failed: ${report.failedPackages}`);
  console.log(`Report: ${reportPath}`);
  if (scopeErrors.length) console.error(scopeErrors.join('\n'));
  for (const result of failed) console.error(`${result.name}: ${result.artifact.errors.join('; ')}`);
  process.exitCode = report.status === 'passed' ? 0 : 1;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
