const fs = require('fs');
const path = require('path');

const packageRoot = path.resolve(__dirname, '..');
const distRoot = path.join(packageRoot, 'dist');
const packagePath = path.join(packageRoot, 'package.json');
const distPackagePath = path.join(distRoot, 'package.json');
const repositoryLicensePath = path.resolve(packageRoot, '..', '..', '..', 'LICENSE');
const repositoryTrademarkPath = path.resolve(packageRoot, '..', '..', '..', 'TRADEMARKS.md');

const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

const toBuiltTarget = sourceTarget => {
  if (!sourceTarget.startsWith('./src/')) {
    return sourceTarget;
  }

  const withoutSourceRoot = sourceTarget.slice('./src/'.length);
  const withoutExtension = withoutSourceRoot.replace(/\.(ts|tsx)$/, '');

  return `./${withoutExtension}.js`;
};

const toTypesTarget = sourceTarget => {
  if (!sourceTarget.startsWith('./src/')) {
    return sourceTarget;
  }

  const withoutSourceRoot = sourceTarget.slice('./src/'.length);
  const withoutExtension = withoutSourceRoot.replace(/\.(ts|tsx)$/, '');

  return `./${withoutExtension}.d.ts`;
};

const toCjsTarget = sourceTarget => {
  if (!sourceTarget.startsWith('./src/')) {
    return sourceTarget;
  }

  const withoutSourceRoot = sourceTarget.slice('./src/'.length);
  const withoutExtension = withoutSourceRoot.replace(/\.(ts|tsx)$/, '');

  return `./cjs/${withoutExtension}.js`;
};

const fileExists = target => fs.existsSync(path.join(distRoot, target.replace(/^\.\//, '')));

const writeTypeOnlyRuntimeStub = target => {
  const targetPath = path.join(distRoot, target.replace(/^\.\//, ''));

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, 'export {};\n');
};

const writeTypeOnlyCjsStub = target => {
  const targetPath = path.join(distRoot, target.replace(/^\.\//, ''));

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, '"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\n');
};

const ensureTypeOnlySourceMap = (target, sourceTarget) => {
  const targetPath = path.join(distRoot, target.replace(/^\.\//, ''));
  const sourcePath = path.join(packageRoot, sourceTarget.replace(/^\.\//, ''));
  const mapPath = `${targetPath}.map`;
  const map = {
    version: 3,
    file: path.basename(targetPath),
    sources: fs.existsSync(sourcePath)
      ? [path.relative(path.dirname(targetPath), sourcePath).replace(/\\/g, '/')]
      : [],
    sourcesContent: null,
    names: [],
    mappings: '',
  };
  fs.writeFileSync(mapPath, `${JSON.stringify(map)}\n`);

  const source = fs.readFileSync(targetPath, 'utf8').replace(/\s*$/, '');
  if (!source.includes('sourceMappingURL=')) {
    fs.writeFileSync(targetPath, `${source}\n//# sourceMappingURL=${path.basename(mapPath)}\n`);
  }
};

const createExportEntry = sourceTarget => {
  const entry = {
    types: toTypesTarget(sourceTarget),
    import: toBuiltTarget(sourceTarget),
    require: toCjsTarget(sourceTarget),
  };

  if (fileExists(entry.types)) {
    if (!fileExists(entry.import)) {
      writeTypeOnlyRuntimeStub(entry.import);
    }

    if (!fileExists(entry.require)) {
      writeTypeOnlyCjsStub(entry.require);
    }

    ensureTypeOnlySourceMap(entry.import, sourceTarget);
    ensureTypeOnlySourceMap(entry.require, sourceTarget);
  }

  const missingTargets = Object.values(entry).filter(target => !fileExists(target));

  if (missingTargets.length > 0) {
    throw new Error(
      `Cannot create export for ${sourceTarget}. Missing built targets: ${missingTargets.join(', ')}`,
    );
  }

  return entry;
};

const exportsMap = {
  '.': {
    types: './index.d.ts',
    import: './index.js',
    require: './cjs/index.js',
  },
};

for (const [exportPath, sourceTarget] of Object.entries(packageJson.exports || {})) {
  exportsMap[exportPath] = createExportEntry(sourceTarget);
}

for (const target of Object.values(exportsMap['.'])) {
  if (!fileExists(target)) {
    throw new Error(`Cannot create root export. Missing built target: ${target}`);
  }
}

const distPackageJson = {
  ...packageJson,
  main: 'cjs/index.js',
  module: 'index.js',
  types: 'index.d.ts',
  sideEffects: packageJson.sideEffects ?? ['**/*.css'],
  exports: exportsMap,
};

if (distPackageJson.scripts) {
  delete distPackageJson.scripts.prepare;
}

fs.writeFileSync(distPackagePath, `${JSON.stringify(distPackageJson, null, 2)}\n`);
if (!fs.existsSync(repositoryLicensePath)) {
  throw new Error(`Repository license not found: ${repositoryLicensePath}`);
}
fs.copyFileSync(repositoryLicensePath, path.join(distRoot, 'LICENSE'));
if (fs.existsSync(repositoryTrademarkPath)) {
  fs.copyFileSync(repositoryTrademarkPath, path.join(distRoot, 'TRADEMARKS.md'));
}
