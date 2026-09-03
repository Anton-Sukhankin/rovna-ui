const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const yarnLockfile = require('@yarnpkg/lockfile');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const packagesRoot = path.join(appRoot, 'packages');
const stagingRoot = path.join(repoRoot, 'tmp', 'f13-local-tarball-rehearsal');
const tarballsRoot = path.join(stagingRoot, 'tarballs');
const archiveRoot = path.join(stagingRoot, 'offline-archive');
const mirrorRoot = path.join(archiveRoot, 'packages');
const consumerRoot = path.join(os.tmpdir(), 'ds-rovna-ui-f13-isolated-consumer');
const exampleRoot = path.join(repoRoot, 'examples', 'consumer-tarball');
const archiveInputRoot = path.join(repoRoot, 'tmp', 'offline-public-archive-staging', 'inbox');
const archivePath = path.join(archiveInputRoot, 'offline-public-package-archive-v2.zip');
const manifestPath = path.join(
  archiveInputRoot,
  'offline-public-package-archive-v2-manifest.json',
);
const releaseBoundaryPath = path.join(appRoot, 'release-boundary.json');
const releaseBoundary = JSON.parse(fs.readFileSync(releaseBoundaryPath, 'utf8').replace(/^\uFEFF/, ''));
const publicRegistry = 'https://registry.npmjs.org';
const usePublicRegistry = process.argv.includes('--public-registry');
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
const cachedYarnRuntimePath = path.join(
  process.env.LOCALAPPDATA || '',
  'node',
  'corepack',
  'v1',
  'yarn',
  '1.22.15',
  'bin',
  'yarn.js',
);

const toPosix = value => value.replace(/\\/g, '/');
const readJson = filePath => JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {
    cwd: options.cwd || repoRoot,
    encoding: 'utf8',
    env: {
      ...process.env,
      ...(options.env || {}),
      CI: '1',
    },
    stdio: options.capture ? 'pipe' : 'inherit',
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const details = options.capture
      ? `\n${result.stdout || ''}${result.stderr || ''}`
      : '';
    throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status}${details}`);
  }

  return result;
};

const runYarn = (args, options = {}) => {
  if (fs.existsSync(cachedYarnRuntimePath)) {
    return run(process.execPath, [cachedYarnRuntimePath, ...args], options);
  }

  return run(process.platform === 'win32' ? 'yarn.cmd' : 'yarn', args, options);
};

const runNpm = (args, options = {}) => {
  if (npmCliPath) {
    return run(process.execPath, [npmCliPath, ...args], options);
  }

  return run(process.platform === 'win32' ? 'npm.cmd' : 'npm', args, options);
};

const sha256 = filePath => {
  const hash = crypto.createHash('sha256');
  hash.update(fs.readFileSync(filePath));
  return hash.digest('hex');
};

const assertGeneratedPath = targetPath => {
  const expectedParent = path.join(repoRoot, 'tmp');
  const relative = path.relative(expectedParent, targetPath);

  if (relative.startsWith('..') || path.isAbsolute(relative) || path.basename(targetPath) !== 'f13-local-tarball-rehearsal') {
    throw new Error(`Refusing to clear unexpected staging path: ${targetPath}`);
  }
};

const assertConsumerPath = targetPath => {
  const relative = path.relative(os.tmpdir(), targetPath);

  if (
    relative.startsWith('..') ||
    path.isAbsolute(relative) ||
    path.basename(targetPath) !== 'ds-rovna-ui-f13-isolated-consumer'
  ) {
    throw new Error(`Refusing to clear unexpected consumer path: ${targetPath}`);
  }
};

const readPackageEntries = () => {
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
};

const getReleasePlan = entries => {
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
    [...releaseNames].map(packageName => [
      packageName,
      new Set(
        Object.keys(entries.get(packageName).sourceManifest.dependencies || {}).filter(name =>
          releaseNames.has(name),
        ),
      ),
    ]),
  );
  const layers = [];

  while (remaining.size > 0) {
    const layer = [...remaining.entries()]
      .filter(([, dependencies]) => dependencies.size === 0)
      .map(([packageName]) => packageName)
      .sort();

    if (layer.length === 0) {
      throw new Error(`Cyclic release dependency graph: ${[...remaining.keys()].join(', ')}`);
    }

    layers.push(layer);
    layer.forEach(packageName => remaining.delete(packageName));
    remaining.forEach(dependencies => layer.forEach(packageName => dependencies.delete(packageName)));
  }

  return { releaseNames, layers };
};

const tarballFilename = manifest =>
  `${manifest.name.replace(/^@/, '').replace('/', '-')}-${manifest.version}.tgz`;

const yarnMirrorFilename = ({ sourceUrl }) => {
  const source = new URL(sourceUrl);
  const pathnameParts = source.pathname.split('/').filter(Boolean);
  const basename = pathnameParts[pathnameParts.length - 1];

  if (pathnameParts[0] && pathnameParts[0].startsWith('@')) {
    return `${pathnameParts[0]}-${basename}`;
  }

  return basename;
};

const extractArchive = () => {
  const quotePowerShell = value => `'${value.replace(/'/g, "''")}'`;
  const command = [
    'Add-Type -AssemblyName System.IO.Compression.FileSystem;',
    `[System.IO.Compression.ZipFile]::ExtractToDirectory(${quotePowerShell(archivePath)}, ${quotePowerShell(archiveRoot)})`,
  ].join(' ');

  run('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', command]);
};

const prepareOfflineMirror = manifest => {
  extractArchive();

  for (const packageEntry of manifest.packages) {
    const archivedPath = path.join(archiveRoot, ...packageEntry.archivePath.split('/'));
    const mirrorPath = path.join(mirrorRoot, yarnMirrorFilename(packageEntry));

    if (!fs.existsSync(archivedPath)) {
      throw new Error(`Archive entry is missing after extraction: ${packageEntry.archivePath}`);
    }

    if (sha256(archivedPath) !== packageEntry.sha256) {
      throw new Error(`Archive entry checksum mismatch: ${packageEntry.archivePath}`);
    }

    if (archivedPath !== mirrorPath) {
      if (fs.existsSync(mirrorPath)) {
        if (sha256(mirrorPath) !== packageEntry.sha256) {
          throw new Error(`Yarn mirror filename collision: ${path.basename(mirrorPath)}`);
        }
        fs.rmSync(archivedPath);
      } else {
        fs.renameSync(archivedPath, mirrorPath);
      }
    }
  }

  const mirrorTarballs = fs.readdirSync(mirrorRoot).filter(name => name.endsWith('.tgz'));
  if (mirrorTarballs.length !== manifest.packages.length) {
    throw new Error(
      `Offline mirror count mismatch: expected ${manifest.packages.length}, got ${mirrorTarballs.length}`,
    );
  }

  return mirrorTarballs.length;
};

const packRelease = (entries, layers) => {
  const packed = new Map();

  layers.forEach((layer, layerIndex) => {
    console.log(`Packing release level ${layerIndex}: ${layer.join(', ')}`);

    for (const packageName of layer) {
      const entry = entries.get(packageName);
      const distManifestPath = path.join(entry.distRoot, 'package.json');

      if (!fs.existsSync(distManifestPath)) {
        throw new Error(`Missing dist manifest: ${distManifestPath}`);
      }

      const distManifest = readJson(distManifestPath);
      const filename = tarballFilename(distManifest);

      runNpm(
        [
          'pack',
          '--ignore-scripts',
          '--pack-destination',
          tarballsRoot,
          '--cache',
          path.join(stagingRoot, 'npm-cache'),
        ],
        { cwd: entry.distRoot, capture: true },
      );

      const packedPath = path.join(tarballsRoot, filename);

      if (!fs.existsSync(packedPath)) {
        throw new Error(`Expected tarball was not created: ${packedPath}`);
      }

      packed.set(packageName, { path: packedPath, manifest: distManifest, layer: layerIndex });
    }
  });

  return packed;
};

const packCompensations = (entries, releaseNames) => {
  const compensationNames = new Set();

  for (const packageName of releaseNames) {
    const entry = entries.get(packageName);
    const distManifest = readJson(path.join(entry.distRoot, 'package.json'));

    for (const dependencyName of Object.keys(distManifest.dependencies || {})) {
      if (entries.has(dependencyName) && !dependencyName.startsWith('@rovna-ui/')) {
        compensationNames.add(dependencyName);
      }
    }
  }

  const packed = new Map();
  const sortedNames = [...compensationNames].sort();
  const expectedNames = releaseBoundary.offlineOnlyPackages
    .filter(packageEntry => packageEntry.includeInConsumerBundle)
    .map(packageEntry => packageEntry.name)
    .sort();

  if (JSON.stringify(sortedNames) !== JSON.stringify(expectedNames)) {
    throw new Error(
      `Offline compensation boundary mismatch. Expected ${expectedNames.join(', ')}, got ${sortedNames.join(', ')}`,
    );
  }

  console.log(`Packing local compensation layer: ${sortedNames.join(', ')}`);

  for (const packageName of sortedNames) {
    const entry = entries.get(packageName);

    if (!entry.sourceManifest.private || entry.sourceManifest.publishConfig) {
      throw new Error(`Offline-only compensation must remain private and unpublished: ${packageName}`);
    }

    const filename = tarballFilename(entry.sourceManifest);

    runNpm(
      [
        'pack',
        '--ignore-scripts',
        '--pack-destination',
        tarballsRoot,
        '--cache',
        path.join(stagingRoot, 'npm-cache'),
      ],
      { cwd: path.join(packagesRoot, entry.folder), capture: true },
    );

    const packedPath = path.join(tarballsRoot, filename);

    if (!fs.existsSync(packedPath)) {
      throw new Error(`Expected compensation tarball was not created: ${packedPath}`);
    }

    packed.set(packageName, {
      path: packedPath,
      manifest: entry.sourceManifest,
      layer: 'local-compensation',
    });
  }

  return packed;
};

const copyExample = () => {
  const copyDirectory = (sourceRoot, targetRoot) => {
    fs.mkdirSync(targetRoot, { recursive: true });

    for (const entry of fs.readdirSync(sourceRoot, { withFileTypes: true })) {
      const sourcePath = path.join(sourceRoot, entry.name);
      const targetPath = path.join(targetRoot, entry.name);

      if (entry.isDirectory()) {
        copyDirectory(sourcePath, targetPath);
      } else if (entry.isFile()) {
        fs.copyFileSync(sourcePath, targetPath);
      }
    }
  };

  copyDirectory(exampleRoot, consumerRoot);
};

const writeConsumerManifest = packed => {
  const rootManifest = readJson(path.join(appRoot, 'package.json'));
  const directDependencies = {};
  const internalResolutions = {};
  const directPackageNames = new Set(releaseBoundary.directTarballConsumerPackages);

  [...packed.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .forEach(([packageName, packageEntry]) => {
      const tarballReference = `file:${toPosix(packageEntry.path)}`;
      internalResolutions[packageName] = tarballReference;

      if (directPackageNames.has(packageName)) {
        directDependencies[packageName] = tarballReference;
      }
    });

  for (const packageName of directPackageNames) {
    if (!directDependencies[packageName]) {
      throw new Error(`Missing direct tarball consumer package: ${packageName}`);
    }
  }

  const packageJson = {
    name: 'rovna-ui-f13-isolated-tarball-consumer',
    version: '1.0.0',
    private: true,
    packageManager: 'yarn@1.22.15',
    scripts: {
      build: 'vite build --configLoader runner',
      verify: 'node verify-dom.cjs',
    },
    dependencies: {
      ...directDependencies,
      react: '^17.0.2',
      'react-dom': '^17.0.2',
      'react-is': '^17.0.2',
      'styled-components': '^5',
    },
    devDependencies: {
      '@vitejs/plugin-react': rootManifest.devDependencies['@vitejs/plugin-react'],
      jsdom: '^20.0.0',
      vite: rootManifest.devDependencies.vite,
    },
    resolutions: internalResolutions,
  };

  fs.writeFileSync(path.join(consumerRoot, 'package.json'), `${JSON.stringify(packageJson, null, 2)}\n`);
  fs.copyFileSync(path.join(appRoot, 'yarn.lock'), path.join(consumerRoot, 'yarn.lock'));
  const yarnConfiguration = [`"registry" "${publicRegistry}"`];
  if (!usePublicRegistry) {
    yarnConfiguration.push(
      `"yarn-offline-mirror" "${toPosix(mirrorRoot)}"`,
      '"yarn-offline-mirror-pruning" false',
    );
  }
  yarnConfiguration.push('');
  fs.writeFileSync(path.join(consumerRoot, '.yarnrc'), yarnConfiguration.join('\n'));
};

const prepareSupplementalCache = manifest => {
  const cacheDirResult = runYarn(['cache', 'dir'], {
    cwd: appRoot,
    capture: true,
  });
  const globalCacheV6 = cacheDirResult.stdout.trim().split(/\r?\n/).at(-1);
  if (!globalCacheV6 || !fs.existsSync(globalCacheV6)) {
    throw new Error('The public Yarn cache is required for the offline consumer rehearsal');
  }

  const parsedLock = yarnLockfile.parse(fs.readFileSync(path.join(appRoot, 'yarn.lock'), 'utf8'));
  if (parsedLock.type !== 'success') throw new Error(`Cannot parse yarn.lock: ${parsedLock.type}`);
  const required = new Set();
  for (const [selectors, entry] of Object.entries(parsedLock.object)) {
    for (const selector of selectors.split(/,\s+/)) {
      const match = selector.match(/^(@[^/]+\/[^@]+|[^@]+)@/);
      if (match && entry.version) required.add(`${match[1]}@${entry.version}`);
    }
  }
  const archived = new Set(
    manifest.packages.map(entry => `${entry.package}@${entry.resolvedVersion}`),
  );
  const targetRoot = path.join(consumerRoot, '.yarn-cache', 'v6');
  fs.mkdirSync(targetRoot, { recursive: true });
  let copied = 0;

  for (const entry of fs.readdirSync(globalCacheV6, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const source = path.join(globalCacheV6, entry.name);
    const nodeModules = path.join(source, 'node_modules');
    if (!fs.existsSync(nodeModules)) continue;
    const top = fs.readdirSync(nodeModules, { withFileTypes: true }).filter(item => !item.name.startsWith('.'));
    const packageDirectories = [];
    for (const item of top) {
      const first = path.join(nodeModules, item.name);
      if (item.name.startsWith('@')) {
        for (const scoped of fs.readdirSync(first, { withFileTypes: true })) {
          if (scoped.isDirectory()) packageDirectories.push(path.join(first, scoped.name));
        }
      } else if (item.isDirectory()) {
        packageDirectories.push(first);
      }
    }
    const packageDirectory = packageDirectories.find(directory =>
      fs.existsSync(path.join(directory, '.yarn-metadata.json')),
    );
    if (!packageDirectory) continue;
    const metadata = readJson(path.join(packageDirectory, '.yarn-metadata.json'));
    const identity = `${metadata.manifest?.name}@${metadata.manifest?.version}`;
    if (!required.has(identity) || archived.has(identity)) continue;
    fs.cpSync(source, path.join(targetRoot, entry.name), { recursive: true });
    copied += 1;
  }

  return copied;
};

const writeResult = ({ archiveChecksum, mirrorCount, supplementalCacheEntries, packed, compensations, layers }) => {
  const result = {
    status: 'passed',
    mode: usePublicRegistry ? 'public-dependencies-local-tarballs' : 'offline-local-tarballs',
    archiveChecksum,
    offlineMirrorTarballs: mirrorCount,
    supplementalPublicCacheEntries: supplementalCacheEntries,
    publicDependencyRegistry: usePublicRegistry ? publicRegistry : null,
    publicDependencyRegistryContacted: usePublicRegistry,
    releaseLevels: layers.map((layer, index) => ({ level: index, packages: layer })),
    packedTarballs: [...packed.entries()].map(([packageName, entry]) => ({
      package: packageName,
      version: entry.manifest.version,
      level: entry.layer,
      filename: path.basename(entry.path),
      sha256: sha256(entry.path),
    })),
    compensationTarballs: [...compensations.entries()].map(([packageName, entry]) => ({
      package: packageName,
      version: entry.manifest.version,
      filename: path.basename(entry.path),
      sha256: sha256(entry.path),
    })),
    distributionBoundary: {
      publicReleasePackages: releaseBoundary.publicReleasePackages,
      offlineOnlyPackages: releaseBoundary.offlineOnlyPackages,
      directTarballConsumerPackages: releaseBoundary.directTarballConsumerPackages,
    },
    consumer: {
      path: consumerRoot,
      install: usePublicRegistry
        ? 'passed with local Rovna UI tarballs and public npm dependencies'
        : 'passed with yarn --offline',
      dependencyCache: usePublicRegistry
        ? 'public npm registry for external dependencies; local tarballs for Rovna UI and compensations'
        : 'public Yarn cache plus reviewed offline archive',
      build: 'passed without source aliases',
      domSmoke: 'passed',
      registryContacted: usePublicRegistry,
      actionableWarnings: [],
      acceptedWarnings: releaseBoundary.acceptedConsumerWarnings,
    },
  };

  fs.writeFileSync(path.join(stagingRoot, 'result.json'), `${JSON.stringify(result, null, 2)}\n`);
};

const main = () => {
  if (!usePublicRegistry && (!fs.existsSync(archivePath) || !fs.existsSync(manifestPath))) {
    throw new Error('Offline-public archive v2 and its manifest are required for F-13');
  }

  runYarn(['--version'], { capture: true });

  run(process.execPath, [path.join(appRoot, 'scripts', 'prepare-public-release.js'), '--check'], {
    cwd: appRoot,
  });

  const entries = readPackageEntries();
  const { releaseNames, layers } = getReleasePlan(entries);

  if (
    releaseNames.size !== releaseBoundary.publicReleasePackages.length ||
    layers.flat().length !== releaseBoundary.publicReleasePackages.length
  ) {
    throw new Error(`Unexpected release plan: ${releaseNames.size} packages in ${layers.length} levels`);
  }

  const manifest = usePublicRegistry ? null : readJson(manifestPath);
  const archiveChecksum = usePublicRegistry ? null : sha256(archivePath);

  if (!usePublicRegistry && archiveChecksum !== manifest.archive.checksum) {
    throw new Error(`Offline-public archive checksum mismatch: ${archiveChecksum}`);
  }

  assertGeneratedPath(stagingRoot);
  assertConsumerPath(consumerRoot);
  fs.rmSync(stagingRoot, { recursive: true, force: true });
  fs.rmSync(consumerRoot, { recursive: true, force: true });
  fs.mkdirSync(tarballsRoot, { recursive: true });

  const mirrorCount = usePublicRegistry ? 0 : prepareOfflineMirror(manifest);
  const supplementalCacheEntries = usePublicRegistry ? 0 : prepareSupplementalCache(manifest);
  const packed = packRelease(entries, layers);
  const compensations = packCompensations(entries, releaseNames);
  const consumerPackages = new Map([...packed, ...compensations]);
  copyExample();
  writeConsumerManifest(consumerPackages);

  const installArgs = [
    '--use-yarnrc',
    path.join(consumerRoot, '.yarnrc'),
    'install',
    '--ignore-scripts',
    '--ignore-engines',
    '--non-interactive',
  ];
  const installEnvironment = {};
  if (usePublicRegistry) {
    installArgs.push('--registry', publicRegistry);
    installEnvironment.COREPACK_ENABLE_NETWORK = '1';
    installEnvironment.npm_config_offline = 'false';
    installEnvironment.npm_config_registry = publicRegistry;
  } else {
    installArgs.push(
      '--offline',
      '--cache-folder',
      path.join(consumerRoot, '.yarn-cache'),
    );
  }
  const installResult = runYarn(installArgs, {
    cwd: consumerRoot,
    capture: true,
    env: installEnvironment,
  });
  const installOutput = `${installResult.stdout || ''}${installResult.stderr || ''}`;
  fs.writeFileSync(path.join(stagingRoot, 'consumer-install.log'), installOutput);
  process.stdout.write(installOutput);

  const unexpectedPeerWarnings = installOutput
    .split(/\r?\n/)
    .filter(line => /unmet peer dependency/i.test(line))
    .filter(
      line =>
        !/babel-plugin-styled-components.*@babel\/plugin-syntax-jsx.*@babel\/core/i.test(line),
    );
  const actionableWarnings = [];

  const duplicateCacheWarnings = installOutput
    .split(/\r?\n/)
    .filter(line => /trying to unpack in the same destination/i.test(line));
  const acceptedRootTarballDuplicate = duplicateCacheWarnings.every(
    line =>
      line.includes(`${releaseBoundary.releaseRoot}@file:`) &&
      line.includes(tarballFilename(entries.get(releaseBoundary.releaseRoot).sourceManifest)),
  );

  if (duplicateCacheWarnings.length > 0 && !acceptedRootTarballDuplicate) {
    actionableWarnings.push('duplicate cache destination');
  }

  if (unexpectedPeerWarnings.length > 0) {
    actionableWarnings.push(`unexpected unmet peer dependency: ${unexpectedPeerWarnings.join(' | ')}`);
  }

  if (actionableWarnings.length > 0) {
    throw new Error(`Actionable consumer warnings remain: ${actionableWarnings.join(', ')}`);
  }

  const buildResult = runYarn(['build'], {
    cwd: consumerRoot,
    capture: true,
  });
  const buildOutput = `${buildResult.stdout || ''}${buildResult.stderr || ''}`;
  fs.writeFileSync(path.join(stagingRoot, 'consumer-build.log'), buildOutput);
  process.stdout.write(buildOutput);
  runYarn(['verify'], { cwd: consumerRoot });

  writeResult({ archiveChecksum, mirrorCount, supplementalCacheEntries, packed, compensations, layers });

  console.log(
    usePublicRegistry
      ? 'F-13 public-dependency/local-tarball rehearsal passed.'
      : 'F-13 local tarball rehearsal passed.',
  );
  console.log(`Packed internal tarballs: ${packed.size}`);
  console.log(`Packed compensation tarballs: ${compensations.size}`);
  console.log(`Offline public mirror tarballs: ${mirrorCount}`);
  console.log(`Supplemental public cache entries: ${supplementalCacheEntries}`);
  console.log(`Result: ${path.join(stagingRoot, 'result.json')}`);
};

main();
