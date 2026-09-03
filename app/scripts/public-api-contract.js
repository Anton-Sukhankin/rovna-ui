const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const appRoot = path.resolve(__dirname, '..');
const packagesRoot = path.join(appRoot, 'packages');
const scopePath = path.join(appRoot, 'ds-package-scope.json');
const supportedClassifications = new Set(['core', 'extended']);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function toPosix(value) {
  return value.replace(/\\/g, '/');
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

function exportConditions(value) {
  if (typeof value === 'string') {
    return { types: value };
  }
  return value && typeof value === 'object' ? value : {};
}

function replaceStar(value, replacement) {
  return typeof value === 'string' ? value.replace('*', replacement) : null;
}

function patternMatcher(pattern) {
  const escaped = pattern
    .replace(/^\.\//, '')
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace('*', '(.*)');
  return new RegExp(`^${escaped}$`);
}

function resolveTarget(distRoot, target) {
  if (!target) return null;
  const absolute = path.resolve(distRoot, target.replace(/^\.\//, ''));
  if (absolute !== distRoot && !absolute.startsWith(`${distRoot}${path.sep}`)) {
    throw new Error(`Export target escapes package dist: ${target}`);
  }
  return absolute;
}

function expandManifestExports(packageEntry, errors) {
  const { distRoot, manifest } = packageEntry;
  const allFiles = listFiles(distRoot).map(file => toPosix(path.relative(distRoot, file)));
  const resolved = new Map();
  const exportEntries = Object.entries(manifest.exports || {});
  const ordered = [...exportEntries].sort(([left], [right]) => {
    const leftWildcard = left.includes('*') ? 1 : 0;
    const rightWildcard = right.includes('*') ? 1 : 0;
    return leftWildcard - rightWildcard || left.localeCompare(right);
  });

  for (const [declaredSubpath, rawConditions] of ordered) {
    const conditions = exportConditions(rawConditions);
    if (!conditions.types) {
      errors.push(`${manifest.name} ${declaredSubpath}: types condition is missing`);
      continue;
    }
    if (Boolean(conditions.import) !== Boolean(conditions.require)) {
      errors.push(`${manifest.name} ${declaredSubpath}: import and require must be declared together`);
    }

    const replacements = [];
    if (declaredSubpath.includes('*')) {
      if (!conditions.types.includes('*')) {
        errors.push(`${manifest.name} ${declaredSubpath}: wildcard types target is missing *`);
        continue;
      }
      const matcher = patternMatcher(conditions.types);
      for (const file of allFiles) {
        const match = file.match(matcher);
        if (match) replacements.push(match[1]);
      }
      if (!replacements.length) {
        errors.push(`${manifest.name} ${declaredSubpath}: wildcard resolves to no declaration files`);
      }
    } else {
      replacements.push(null);
    }

    for (const replacement of replacements) {
      const subpath = replacement === null
        ? declaredSubpath
        : declaredSubpath.replace('*', replacement);
      if (resolved.has(subpath)) continue;
      const targets = {
        types: replaceStar(conditions.types, replacement),
        import: replaceStar(conditions.import, replacement),
        require: replaceStar(conditions.require, replacement),
      };
      for (const [condition, target] of Object.entries(targets)) {
        if (!target) continue;
        const absolute = resolveTarget(distRoot, target);
        if (!fs.existsSync(absolute) || fs.statSync(absolute).isDirectory()) {
          errors.push(`${manifest.name} ${subpath}: ${condition} target is missing (${target})`);
        }
      }
      resolved.set(subpath, {
        subpath,
        specifier: subpath === '.' ? manifest.name : `${manifest.name}${subpath.slice(1)}`,
        declaredSubpath,
        types: targets.types,
        import: targets.import,
        require: targets.require,
      });
    }
  }

  return [...resolved.values()].sort((left, right) => left.subpath.localeCompare(right.subpath));
}

function discoverSupportedPackages() {
  const scope = readJson(scopePath);
  return scope.packages
    .filter(entry => supportedClassifications.has(entry.classification))
    .sort((left, right) => left.buildOrder - right.buildOrder || left.name.localeCompare(right.name))
    .map(scopeEntry => {
      const packageRoot = path.join(packagesRoot, scopeEntry.directory);
      const distRoot = path.join(packageRoot, 'dist');
      const manifestPath = path.join(distRoot, 'package.json');
      if (!fs.existsSync(manifestPath)) throw new Error(`${scopeEntry.name}: dist/package.json is missing`);
      const manifest = readJson(manifestPath);
      return { ...scopeEntry, packageRoot, distRoot, manifestPath, manifest };
    });
}

function createContract() {
  const errors = [];
  const packages = discoverSupportedPackages();
  const expandedByPackage = packages.map(packageEntry => ({
    packageEntry,
    entrypoints: expandManifestExports(packageEntry, errors),
  }));
  const declarationFiles = [...new Set(expandedByPackage.flatMap(({ packageEntry, entrypoints }) =>
    entrypoints.map(entrypoint => resolveTarget(packageEntry.distRoot, entrypoint.types))))];
  const program = ts.createProgram({
    rootNames: declarationFiles,
    options: {
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      jsx: ts.JsxEmit.React,
      module: ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      skipLibCheck: true,
      target: ts.ScriptTarget.ES2020,
    },
  });
  const checker = program.getTypeChecker();
  const snapshotPackages = [];

  for (const { packageEntry, entrypoints } of expandedByPackage) {
    const snapshotEntrypoints = entrypoints.map(entrypoint => {
      const typePath = resolveTarget(packageEntry.distRoot, entrypoint.types);
      const sourceFile = program.getSourceFile(typePath);
      let symbols = [];
      if (!sourceFile) {
        errors.push(`${packageEntry.name} ${entrypoint.subpath}: declaration is not in TypeScript program`);
      } else {
        const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
        if (!moduleSymbol) {
          errors.push(`${packageEntry.name} ${entrypoint.subpath}: declaration has no module symbol`);
        } else {
          symbols = checker.getExportsOfModule(moduleSymbol).map(symbol => symbol.getName()).sort();
        }
      }
      return {
        subpath: entrypoint.subpath,
        specifier: entrypoint.specifier,
        types: toPosix(path.relative(appRoot, typePath)),
        import: entrypoint.import,
        require: entrypoint.require,
        symbols,
      };
    });
    snapshotPackages.push({
      name: packageEntry.manifest.name,
      version: packageEntry.manifest.version,
      classification: packageEntry.classification,
      peerDependencies: Object.fromEntries(
        Object.entries(packageEntry.manifest.peerDependencies || {}).sort(([left], [right]) => left.localeCompare(right)),
      ),
      entrypoints: snapshotEntrypoints,
    });
  }

  const snapshot = {
    formatVersion: 1,
    packages: snapshotPackages,
  };
  const entrypoints = snapshotPackages.flatMap(packageEntry => packageEntry.entrypoints);
  const summary = {
    packages: snapshotPackages.length,
    publicSubpaths: entrypoints.length,
    runtimeSubpaths: entrypoints.filter(entrypoint => entrypoint.import && entrypoint.require).length,
    typeOnlySubpaths: entrypoints.filter(entrypoint => !entrypoint.import && !entrypoint.require).length,
    exportedSymbols: entrypoints.reduce((total, entrypoint) => total + entrypoint.symbols.length, 0),
  };
  return { errors: [...new Set(errors)].sort(), snapshot, summary };
}

module.exports = {
  appRoot,
  createContract,
  readJson,
};
