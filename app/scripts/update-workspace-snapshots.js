const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const packagesRoot = path.join(appRoot, 'packages');
const requestedPackages = new Set(process.argv.slice(2));
const runJest = path.join(__dirname, 'run-jest.js');

const packages = fs
  .readdirSync(packagesRoot, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)
  .filter(name => requestedPackages.size === 0 || requestedPackages.has(name))
  .filter(name => {
    const packageRoot = path.join(packagesRoot, name);
    const packageJsonPath = path.join(packageRoot, 'package.json');
    const jestConfigPath = path.join(packageRoot, 'jest.config.js');

    if (!fs.existsSync(packageJsonPath) || !fs.existsSync(jestConfigPath)) return false;

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return Boolean(packageJson.scripts?.['test:update']);
  })
  .sort();

if (requestedPackages.size > 0 && packages.length !== requestedPackages.size) {
  const missing = [...requestedPackages].filter(name => !packages.includes(name));
  console.error(`Packages without a snapshot update target: ${missing.join(', ')}`);
  process.exit(1);
}

for (const packageName of packages) {
  console.log(`\nUpdating snapshots: ${packageName}`);
  const result = spawnSync(
    process.execPath,
    [runJest, '--config', './jest.config.js', '--runInBand', '--updateSnapshot'],
    {
      cwd: path.join(packagesRoot, packageName),
      env: process.env,
      stdio: 'inherit',
    },
  );

  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log(`\nSnapshots updated for ${packages.length} package(s).`);
