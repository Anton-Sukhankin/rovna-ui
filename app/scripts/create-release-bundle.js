const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const packagesRoot = path.join(appRoot, 'packages');
const releaseRoot = path.join(repoRoot, 'release');
const stagingRoot = path.join(repoRoot, 'tmp', 'f15-release-bundle');
const npmCacheRoot = path.join(stagingRoot, 'npm-cache');
const releaseBoundaryPath = path.join(appRoot, 'release-boundary.json');
const releaseBoundary = readJson(releaseBoundaryPath);
const npmCliPath = [
  path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js'),
  path.resolve(
    path.dirname(process.execPath),
    '..',
    'lib',
    'node_modules',
    'npm',
    'bin',
    'npm-cli.js',
  ),
].find(candidate => fs.existsSync(candidate));

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function sha256(filePath) {
  const hash = crypto.createHash('sha256');
  hash.update(fs.readFileSync(filePath));
  return hash.digest('hex');
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || repoRoot,
    encoding: 'utf8',
    env: { ...process.env, CI: '1' },
    stdio: options.capture ? 'pipe' : 'inherit',
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const details = options.capture
      ? `\n${result.stdout || ''}${result.stderr || ''}`
      : '';
    throw new Error(
      `${command} ${args.join(' ')} failed with exit code ${result.status}${details}`,
    );
  }

  return result;
}

function runNpm(args, options = {}) {
  if (npmCliPath) {
    return run(process.execPath, [npmCliPath, ...args], options);
  }

  return run(process.platform === 'win32' ? 'npm.cmd' : 'npm', args, options);
}

function assertGeneratedPath(targetPath, expectedParent, expectedName) {
  const relative = path.relative(expectedParent, targetPath);

  if (
    relative.startsWith('..') ||
    path.isAbsolute(relative) ||
    path.basename(targetPath) !== expectedName
  ) {
    throw new Error(`Refusing to clear unexpected generated path: ${targetPath}`);
  }
}

function readPackageEntries() {
  const entries = new Map();

  for (const directory of fs.readdirSync(packagesRoot, { withFileTypes: true })) {
    if (!directory.isDirectory()) {
      continue;
    }

    const sourceManifestPath = path.join(packagesRoot, directory.name, 'package.json');

    if (!fs.existsSync(sourceManifestPath)) {
      continue;
    }

    const sourceManifest = readJson(sourceManifestPath);

    if (sourceManifest.name) {
      entries.set(sourceManifest.name, {
        folder: directory.name,
        sourceManifest,
        distRoot: path.join(packagesRoot, directory.name, 'dist'),
      });
    }
  }

  return entries;
}

function getReleasePlan(entries) {
  const releaseNames = new Set();
  const queue = [...releaseBoundary.publicReleasePackages];

  while (queue.length > 0) {
    const packageName = queue.shift();

    if (releaseNames.has(packageName)) {
      continue;
    }

    const entry = entries.get(packageName);

    if (!entry) {
      throw new Error(`Missing local release package: ${packageName}`);
    }

    releaseNames.add(packageName);

    for (const dependencyName of Object.keys(entry.sourceManifest.dependencies || {})) {
      if (dependencyName.startsWith('@rovna-ui/')) {
        queue.push(dependencyName);
      }
    }
  }

  const expectedNames = [...releaseBoundary.publicReleasePackages].sort();
  const actualNames = [...releaseNames].sort();

  if (JSON.stringify(actualNames) !== JSON.stringify(expectedNames)) {
    throw new Error('Computed release closure does not match app/release-boundary.json');
  }

  const remaining = new Map(
    actualNames.map(packageName => [
      packageName,
      new Set(
        Object.keys(entries.get(packageName).sourceManifest.dependencies || {}).filter(name =>
          releaseNames.has(name),
        ),
      ),
    ]),
  );
  const levels = [];

  while (remaining.size > 0) {
    const level = [...remaining.entries()]
      .filter(([, dependencies]) => dependencies.size === 0)
      .map(([packageName]) => packageName)
      .sort();

    if (level.length === 0) {
      throw new Error(`Cyclic release dependency graph: ${[...remaining.keys()].join(', ')}`);
    }

    levels.push(level);
    level.forEach(packageName => remaining.delete(packageName));
    remaining.forEach(dependencies =>
      level.forEach(packageName => dependencies.delete(packageName)),
    );
  }

  return { releaseNames, levels };
}

function tarballFilename(manifest) {
  return `${manifest.name.replace(/^@/, '').replace('/', '-')}-${manifest.version}.tgz`;
}

function validateDistManifest(manifest, packageName) {
  if (manifest.name !== packageName) {
    throw new Error(`Dist manifest name mismatch for ${packageName}`);
  }

  if (manifest.private) {
    throw new Error(`Public release artifact is private: ${packageName}`);
  }

  if (!manifest.publishConfig || manifest.publishConfig.access !== 'public') {
    throw new Error(`Public access metadata is missing: ${packageName}`);
  }

  if (manifest.scripts || manifest.devDependencies) {
    throw new Error(`Artifact contains build-only metadata: ${packageName}`);
  }

  if (/samoletgroup\.ru|@samolet\.ru/i.test(JSON.stringify(manifest))) {
    throw new Error(`Artifact contains closed corporate metadata: ${packageName}`);
  }
}

function collectExternalRequirements(packageRecords, releaseNames) {
  const requirements = new Map();

  for (const record of packageRecords) {
    for (const [dependencyName, range] of Object.entries(record.dependencies)) {
      if (releaseNames.has(dependencyName)) {
        continue;
      }

      const key = `runtime:${dependencyName}:${range}`;
      const current = requirements.get(key) || {
        name: dependencyName,
        range,
        type: 'runtime',
        requiredBy: [],
      };
      current.requiredBy.push(record.name);
      requirements.set(key, current);
    }

    for (const [dependencyName, range] of Object.entries(record.peerDependencies)) {
      const key = `peer:${dependencyName}:${range}`;
      const current = requirements.get(key) || {
        name: dependencyName,
        range,
        type: 'peer',
        requiredBy: [],
      };
      current.requiredBy.push(record.name);
      requirements.set(key, current);
    }
  }

  return [...requirements.values()]
    .map(requirement => ({
      ...requirement,
      requiredBy: [...new Set(requirement.requiredBy)].sort(),
    }))
    .sort((left, right) =>
      `${left.name}:${left.type}:${left.range}`.localeCompare(
        `${right.name}:${right.type}:${right.range}`,
      ),
    );
}

function createPublicationGuide({ bundleName, rootVersion, levels, packageRecords }) {
  const recordsByName = new Map(packageRecords.map(record => [record.name, record]));
  const lines = [
    '# Publication Guide',
    '',
    'This bundle is registry-agnostic. No registry URL, token or credential is embedded.',
    '',
    '## Preconditions',
    '',
    '- choose a public registry that supports scoped public packages;',
    '- authenticate outside this bundle;',
    '- set `ROVNA_UI_REGISTRY` in the current shell;',
    '- verify every SHA-256 entry before publication;',
    '- stop immediately if a package/version already exists with different content.',
    '',
    'PowerShell setup example:',
    '',
    '```powershell',
    "$env:ROVNA_UI_REGISTRY = '<selected-public-registry-url>'",
    '```',
    '',
    '## Ordered Publication',
    '',
    'Publish one level at a time. Verify package visibility before continuing to the next level.',
    '',
  ];

  levels.forEach((level, levelIndex) => {
    lines.push(`### Level ${levelIndex}`, '');

    level.forEach(packageName => {
      const record = recordsByName.get(packageName);
      lines.push(
        '```powershell',
        `npm.cmd publish ".\\packages\\${record.file}" --registry $env:ROVNA_UI_REGISTRY --access public`,
        '```',
        '',
      );
    });
  });

  lines.push(
    '## Consumer Verification',
    '',
    'After all levels are visible in the selected registry, verify in a clean React 17 project:',
    '',
    '```powershell',
    `npm.cmd install @rovna-ui/components@${rootVersion} react@17.0.2 react-dom@17.0.2 react-is@17.0.2 styled-components@5 --registry $env:ROVNA_UI_REGISTRY`,
    '```',
    '',
    'Do not publish the local compensation packages. They are excluded from this bundle.',
    '',
    `Bundle identity: \`${bundleName}\`.`,
    '',
  );

  return `${lines.join('\n')}\n`;
}

function createBundleReadme({ bundleName, rootVersion, packageCount }) {
  return `# Rovna UI Release Bundle\n\n` +
    `Bundle: \`${bundleName}\`\n\n` +
    `Root package: \`@rovna-ui/components@${rootVersion}\`\n\n` +
    `Public artifacts: \`${packageCount}\`\n\n` +
    `This directory is a publication payload, not a standalone mirror of public npm dependencies. ` +
    `Use \`PUBLICATION.md\` for the registry-neutral release order and ` +
    `\`publication-manifest.json\` for machine-readable metadata.\n\n` +
    `Verify all files against \`SHA256SUMS\` before use. No private local compensation package is included.\n`;
}

function main() {
  run(process.execPath, [path.join(__dirname, 'prepare-public-release.js'), '--check'], {
    cwd: appRoot,
  });

  const entries = readPackageEntries();
  const { releaseNames, levels } = getReleasePlan(entries);
  const rootEntry = entries.get(releaseBoundary.releaseRoot);
  const rootVersion = rootEntry.sourceManifest.version;
  const bundleName = `rovna-ui-${rootVersion}`;
  const bundleRoot = path.join(releaseRoot, bundleName);
  const bundlePackagesRoot = path.join(bundleRoot, 'packages');
  const archiveName = `${bundleName}-release-bundle.tgz`;
  const archivePath = path.join(releaseRoot, archiveName);
  const archiveChecksumPath = `${archivePath}.sha256`;

  assertGeneratedPath(bundleRoot, releaseRoot, bundleName);
  assertGeneratedPath(stagingRoot, path.join(repoRoot, 'tmp'), 'f15-release-bundle');

  fs.rmSync(bundleRoot, { recursive: true, force: true });
  fs.rmSync(stagingRoot, { recursive: true, force: true });
  fs.rmSync(archivePath, { force: true });
  fs.rmSync(archiveChecksumPath, { force: true });
  fs.mkdirSync(bundlePackagesRoot, { recursive: true });
  fs.mkdirSync(npmCacheRoot, { recursive: true });

  const packageRecords = [];

  levels.forEach((level, levelIndex) => {
    console.log(`Packing release level ${levelIndex}: ${level.join(', ')}`);

    for (const packageName of level) {
      const entry = entries.get(packageName);
      const distManifestPath = path.join(entry.distRoot, 'package.json');

      if (!fs.existsSync(distManifestPath)) {
        throw new Error(`Missing built package manifest: ${distManifestPath}`);
      }

      const distManifest = readJson(distManifestPath);
      validateDistManifest(distManifest, packageName);

      runNpm(
        [
          'pack',
          '--ignore-scripts',
          '--pack-destination',
          bundlePackagesRoot,
          '--cache',
          npmCacheRoot,
        ],
        { cwd: entry.distRoot, capture: true },
      );

      const filename = tarballFilename(distManifest);
      const packedPath = path.join(bundlePackagesRoot, filename);

      if (!fs.existsSync(packedPath)) {
        throw new Error(`Expected release tarball was not created: ${packedPath}`);
      }

      packageRecords.push({
        name: packageName,
        version: distManifest.version,
        level: levelIndex,
        file: filename,
        size: fs.statSync(packedPath).size,
        sha256: sha256(packedPath),
        internalDependencies: Object.keys(distManifest.dependencies || {})
          .filter(name => releaseNames.has(name))
          .sort(),
        dependencies: distManifest.dependencies || {},
        peerDependencies: distManifest.peerDependencies || {},
      });
    }
  });

  if (packageRecords.length !== releaseBoundary.publicReleasePackages.length) {
    throw new Error(`Unexpected packed package count: ${packageRecords.length}`);
  }

  const packedNames = new Set(packageRecords.map(record => record.name));
  const forbiddenNames = releaseBoundary.offlineOnlyPackages
    .map(entry => entry.name)
    .filter(name => packedNames.has(name));

  if (forbiddenNames.length > 0) {
    throw new Error(`Offline-only packages entered release bundle: ${forbiddenNames.join(', ')}`);
  }

  const publicationManifest = {
    formatVersion: 1,
    bundle: bundleName,
    registryAgnostic: true,
    publicationPerformed: false,
    rootPackage: {
      name: releaseBoundary.releaseRoot,
      version: rootVersion,
    },
    packageCount: packageRecords.length,
    releaseLevels: levels.map((level, index) => ({ level: index, packages: level })),
    packages: packageRecords,
    externalRequirements: collectExternalRequirements(packageRecords, releaseNames),
    excludedOfflineOnlyPackages: releaseBoundary.offlineOnlyPackages,
    verification: {
      metadataCheck: 'passed',
      artifactChecksums: 'SHA256SUMS',
      priorConsumerRehearsal: 'F-14 passed offline install, Vite build and DOM smoke',
    },
  };

  const manifestPath = path.join(bundleRoot, 'publication-manifest.json');
  const publicationGuidePath = path.join(bundleRoot, 'PUBLICATION.md');
  const readmePath = path.join(bundleRoot, 'README.md');
  writeJson(manifestPath, publicationManifest);
  fs.writeFileSync(
    publicationGuidePath,
    createPublicationGuide({ bundleName, rootVersion, levels, packageRecords }),
  );
  fs.writeFileSync(
    readmePath,
    createBundleReadme({ bundleName, rootVersion, packageCount: packageRecords.length }),
  );

  const checksumTargets = [
    ...packageRecords.map(record => path.join(bundlePackagesRoot, record.file)),
    manifestPath,
    publicationGuidePath,
    readmePath,
  ].sort();
  const checksumLines = checksumTargets.map(filePath => {
    const relativePath = path.relative(bundleRoot, filePath).replace(/\\/g, '/');
    return `${sha256(filePath)}  ${relativePath}`;
  });
  fs.writeFileSync(path.join(bundleRoot, 'SHA256SUMS'), `${checksumLines.join('\n')}\n`);

  run('tar', ['-czf', archivePath, '-C', releaseRoot, bundleName], {
    cwd: releaseRoot,
    capture: true,
  });

  const archiveChecksum = sha256(archivePath);
  fs.writeFileSync(archiveChecksumPath, `${archiveChecksum}  ${archiveName}\n`);
  const archiveListing = run('tar', ['-tf', archivePath], {
    cwd: releaseRoot,
    capture: true,
  }).stdout
    .split(/\r?\n/)
    .filter(Boolean);
  const archivedTarballCount = archiveListing.filter(name => name.endsWith('.tgz')).length;

  if (archivedTarballCount !== packageRecords.length) {
    throw new Error(
      `Archive tarball count mismatch: expected ${packageRecords.length}, got ${archivedTarballCount}`,
    );
  }

  writeJson(path.join(releaseRoot, 'f15-result.json'), {
    status: 'passed',
    bundle: bundleName,
    packageCount: packageRecords.length,
    releaseLevelCount: levels.length,
    archive: archiveName,
    archiveSha256: archiveChecksum,
    publicationPerformed: false,
    registryContacted: false,
    offlineOnlyPackagesIncluded: false,
  });

  fs.rmSync(stagingRoot, { recursive: true, force: true });

  console.log('F-15 release bundle created.');
  console.log(`Public package tarballs: ${packageRecords.length}`);
  console.log(`Release levels: ${levels.length}`);
  console.log(`Bundle directory: ${bundleRoot}`);
  console.log(`Bundle archive: ${archivePath}`);
  console.log(`Archive SHA-256: ${archiveChecksum}`);
  console.log('Publication performed: no');
}

main();
