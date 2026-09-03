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
  const withoutSourceRoot = sourceTarget.replace(/^\.\/src\//, '');
  return `./${withoutSourceRoot.replace(/\.(ts|tsx)$/, '')}.js`;
};

const toTypesTarget = sourceTarget => {
  const withoutSourceRoot = sourceTarget.replace(/^\.\/src\//, '');
  return `./${withoutSourceRoot.replace(/\.(ts|tsx)$/, '')}.d.ts`;
};

const toCjsTarget = sourceTarget => {
  const withoutSourceRoot = sourceTarget.replace(/^\.\/src\//, '');
  return `./cjs/${withoutSourceRoot.replace(/\.(ts|tsx)$/, '')}.js`;
};

const fileExists = target => fs.existsSync(path.join(distRoot, target.replace(/^\.\//, '')));

const createExportEntry = sourceTarget => {
  const entry = {
    types: toTypesTarget(sourceTarget),
    import: toBuiltTarget(sourceTarget),
    require: toCjsTarget(sourceTarget),
  };
  const missingTargets = Object.values(entry).filter(target => !fileExists(target));

  if (missingTargets.length > 0) {
    throw new Error(
      `Cannot create export for ${sourceTarget}. Missing built targets: ${missingTargets.join(', ')}`,
    );
  }

  return entry;
};

const exportsMap = {};

for (const [exportPath, sourceTarget] of Object.entries(packageJson.exports || {})) {
  exportsMap[exportPath] = createExportEntry(sourceTarget);
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
