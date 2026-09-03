const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const packagesRoot = path.join(appRoot, 'packages');
const publicationRoot = path.join(appRoot, 'publication');
const targetPath = path.join(appRoot, 'publication-target.json');
const boundaryPath = path.join(appRoot, 'release-boundary.json');
const brandPath = path.join(appRoot, 'brand.json');
const migrationPath = path.join(publicationRoot, 'scope-migration-plan.json');
const yarnRcPath = path.join(appRoot, '.yarnrc');
const requireReady = process.argv.includes('--require-ready');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function getPackageEntries() {
  const entries = new Map();

  for (const directory of fs.readdirSync(packagesRoot, { withFileTypes: true })) {
    if (!directory.isDirectory()) {
      continue;
    }

    const manifestPath = path.join(packagesRoot, directory.name, 'package.json');

    if (!fs.existsSync(manifestPath)) {
      continue;
    }

    const manifest = readJson(manifestPath);

    if (manifest.name) {
      entries.set(manifest.name, manifest);
    }
  }

  return entries;
}

function getGitRemoteStatus() {
  const result = spawnSync(
    'git',
    ['-c', `safe.directory=${repoRoot}`, 'remote', 'get-url', 'origin'],
    {
    cwd: repoRoot,
    encoding: 'utf8',
    stdio: 'pipe',
    },
  );

  return result.status === 0 && result.stdout.trim()
    ? { configured: true, value: result.stdout.trim() }
    : { configured: false, value: null };
}

function assertPlaceholderTokensOnly() {
  const exampleFiles = fs
    .readdirSync(publicationRoot)
    .filter(name => name.endsWith('.npmrc.example'));

  for (const filename of exampleFiles) {
    const content = fs.readFileSync(path.join(publicationRoot, filename), 'utf8');
    const tokenAssignments = content.match(/_authToken=.*$/gm) || [];

    for (const assignment of tokenAssignments) {
      if (!/_authToken=\$\{[A-Z0-9_]+\}$/.test(assignment)) {
        throw new Error(`Publication template contains a non-placeholder token: ${filename}`);
      }
    }
  }
}

function main() {
  const target = readJson(targetPath);
  const boundary = readJson(boundaryPath);
  const brand = readJson(brandPath);
  const migration = readJson(migrationPath);
  const packageEntries = getPackageEntries();

  if (target.selectedRegistry.id !== 'npmjs') {
    throw new Error('F-16 selected registry must remain npmjs until a new decision is documented');
  }

  if (target.selectedRegistry.url !== 'https://registry.npmjs.org/') {
    throw new Error('Unexpected selected public registry URL');
  }

  if (target.credentials.storedInRepository !== false) {
    throw new Error('Repository credential storage must remain disabled');
  }

  if (target.currentPackageScope !== brand.packageScope) {
    throw new Error('Current package scope does not match the release boundary');
  }

  const expectedPackages = [...boundary.publicReleasePackages].sort();
  const migrationPackages = [...migration.publicPackages].sort();

  if (JSON.stringify(expectedPackages) !== JSON.stringify(migrationPackages)) {
    throw new Error('Scope migration plan does not cover the complete public release wave');
  }

  for (const packageName of expectedPackages) {
    if (!packageName.startsWith(`${target.currentPackageScope}/`)) {
      throw new Error(`Package is outside the configured scope: ${packageName}`);
    }

    const manifest = packageEntries.get(packageName);

    if (!manifest) {
      throw new Error(`Missing public package manifest: ${packageName}`);
    }

    if (manifest.private || manifest.publishConfig?.access !== 'public') {
      throw new Error(`Public package metadata is not ready: ${packageName}`);
    }

    if (manifest.publishConfig?.registry) {
      throw new Error(`Package manifest must remain registry-agnostic: ${packageName}`);
    }
  }

  const yarnRc = fs.readFileSync(yarnRcPath, 'utf8');

  if (!yarnRc.includes('https://registry.npmjs.org')) {
    throw new Error('Active Yarn registry is not the selected public npm registry');
  }

  assertPlaceholderTokensOnly();

  const gitRemote = getGitRemoteStatus();
  const ready =
    target.publicationAllowed === true &&
    target.scopeStrategy.ownershipStatus === 'confirmed' &&
    gitRemote.configured;

  if (requireReady && !ready) {
    throw new Error(
      'Publication target is intentionally blocked: confirm scope ownership, configure origin and explicitly enable publication first',
    );
  }

  console.log('Publication target policy checked.');
  console.log(`Selected registry: ${target.selectedRegistry.id} (${target.selectedRegistry.url})`);
  console.log(`Public packages: ${expectedPackages.length}`);
  console.log(`Current scope: ${target.currentPackageScope}`);
  console.log(`Scope ownership: ${target.scopeStrategy.ownershipStatus}`);
  console.log(`Git origin configured: ${gitRemote.configured ? 'yes' : 'no'}`);
  console.log(`Repository credentials stored: ${target.credentials.storedInRepository ? 'yes' : 'no'}`);
  console.log(`Publication allowed: ${ready ? 'yes' : 'no'}`);
}

main();
