const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const packagesRoot = path.join(appRoot, 'packages');
const yarnRcPath = path.join(appRoot, '.yarnrc');
const yarnLockPath = path.join(appRoot, 'yarn.lock');
const releaseBoundaryPath = path.join(appRoot, 'release-boundary.json');
const releaseBoundary = JSON.parse(fs.readFileSync(releaseBoundaryPath, 'utf8'));
const checkOnly = process.argv.includes('--check');
const blockedMetadataPattern = /(?:samoletgroup\.ru|@samolet\.ru)/i;
const blockedRegistryPattern = /https?:\/\/packages\.samoletgroup\.ru\/repository\/npm-all\//g;
const publicRegistry = 'https://registry.npmjs.org';
const publicYarnRc = `"registry" "${publicRegistry}"\n`;
const metadataFields = ['repository', 'homepage', 'bugs', 'author', 'contributors', 'maintainers'];
const artifactOnlyFields = ['scripts', 'devDependencies', 'prettier', 'eslintConfig', 'jest'];

const packageEntries = new Map();

for (const entry of fs.readdirSync(packagesRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) {
    continue;
  }

  const packagePath = path.join(packagesRoot, entry.name, 'package.json');

  if (!fs.existsSync(packagePath)) {
    continue;
  }

  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  if (packageJson.name) {
    packageEntries.set(packageJson.name, {
      folder: entry.name,
      packagePath,
      packageJson,
      distPackagePath: path.join(packagesRoot, entry.name, 'dist', 'package.json'),
    });
  }
}

const expectedReleaseNames = new Set(releaseBoundary.publicReleasePackages);
const releaseNames = new Set();
const queue = [...expectedReleaseNames];

while (queue.length > 0) {
  const packageName = queue.shift();

  if (releaseNames.has(packageName)) {
    continue;
  }

  const entry = packageEntries.get(packageName);

  if (!entry) {
    throw new Error(`Missing local package required for public release: ${packageName}`);
  }

  releaseNames.add(packageName);

  for (const dependencyName of Object.keys(entry.packageJson.dependencies || {})) {
    if (dependencyName.startsWith('@rovna-ui/')) {
      queue.push(dependencyName);
    }
  }
}

const missingReleaseNames = [...expectedReleaseNames].filter(packageName => !releaseNames.has(packageName));
const unexpectedReleaseNames = [...releaseNames].filter(packageName => !expectedReleaseNames.has(packageName));

if (missingReleaseNames.length > 0 || unexpectedReleaseNames.length > 0) {
  throw new Error(
    `Release boundary mismatch. Missing: ${missingReleaseNames.join(', ') || 'none'}. Unexpected: ${unexpectedReleaseNames.join(', ') || 'none'}.`,
  );
}

for (const offlinePackage of releaseBoundary.offlineOnlyPackages) {
  const entry = packageEntries.get(offlinePackage.name);

  if (!entry) {
    throw new Error(`Missing offline-only compensation package: ${offlinePackage.name}`);
  }

  if (!entry.packageJson.private) {
    throw new Error(`Offline-only compensation package must remain private: ${offlinePackage.name}`);
  }

  if (entry.packageJson.publishConfig) {
    throw new Error(`Offline-only compensation package must not have publishConfig: ${offlinePackage.name}`);
  }
}

const sanitizeMetadata = (packageJson, { releasePackage, artifact }) => {
  const sanitized = JSON.parse(JSON.stringify(packageJson));

  for (const field of metadataFields) {
    if (field in sanitized && blockedMetadataPattern.test(JSON.stringify(sanitized[field]))) {
      delete sanitized[field];
    }
  }

  if (releasePackage) {
    if (sanitized.private) {
      throw new Error(`Release package must not be private: ${sanitized.name}`);
    }

    sanitized.publishConfig = {
      ...(sanitized.publishConfig || {}),
      access: 'public',
    };

    if (
      sanitized.publishConfig.registry &&
      blockedMetadataPattern.test(sanitized.publishConfig.registry)
    ) {
      delete sanitized.publishConfig.registry;
    }
  }

  if (artifact) {
    for (const field of artifactOnlyFields) {
      delete sanitized[field];
    }
  }

  return sanitized;
};

const plannedWrites = [];
const planJsonWrite = (filePath, value) => {
  const nextContent = `${JSON.stringify(value, null, 2)}\n`;
  const currentContent = fs.readFileSync(filePath, 'utf8');

  if (currentContent !== nextContent) {
    plannedWrites.push({ filePath, nextContent });
  }
};

for (const [packageName, entry] of packageEntries) {
  const releasePackage = releaseNames.has(packageName);
  const sanitizedSource = sanitizeMetadata(entry.packageJson, {
    releasePackage,
    artifact: false,
  });

  planJsonWrite(entry.packagePath, sanitizedSource);

  if (!releasePackage) {
    continue;
  }

  if (!fs.existsSync(entry.distPackagePath)) {
    throw new Error(`Missing built package manifest: ${entry.distPackagePath}`);
  }

  const distPackageJson = JSON.parse(fs.readFileSync(entry.distPackagePath, 'utf8'));
  const sanitizedArtifact = sanitizeMetadata(distPackageJson, {
    releasePackage: true,
    artifact: true,
  });

  planJsonWrite(entry.distPackagePath, sanitizedArtifact);
}

const currentYarnRc = fs.readFileSync(yarnRcPath, 'utf8');

if (currentYarnRc !== publicYarnRc) {
  plannedWrites.push({ filePath: yarnRcPath, nextContent: publicYarnRc });
}

const currentYarnLock = fs.readFileSync(yarnLockPath, 'utf8');
const sanitizedYarnLock = currentYarnLock.replace(blockedRegistryPattern, `${publicRegistry}/`);

if (currentYarnLock !== sanitizedYarnLock) {
  plannedWrites.push({ filePath: yarnLockPath, nextContent: sanitizedYarnLock });
}

const remaining = new Map(
  [...releaseNames].map(packageName => {
    const dependencies = Object.keys(packageEntries.get(packageName).packageJson.dependencies || {}).filter(
      dependencyName => releaseNames.has(dependencyName),
    );

    return [packageName, new Set(dependencies)];
  }),
);
const releaseLayers = [];

while (remaining.size > 0) {
  const layer = [...remaining.entries()]
    .filter(([, dependencies]) => dependencies.size === 0)
    .map(([packageName]) => packageName)
    .sort();

  if (layer.length === 0) {
    throw new Error(`Cyclic internal release dependencies: ${[...remaining.keys()].join(', ')}`);
  }

  releaseLayers.push(layer);

  for (const packageName of layer) {
    remaining.delete(packageName);
  }

  for (const dependencies of remaining.values()) {
    for (const packageName of layer) {
      dependencies.delete(packageName);
    }
  }
}

if (checkOnly && plannedWrites.length > 0) {
  throw new Error(
    `Public release metadata is not prepared. Files requiring updates:\n${plannedWrites
      .map(({ filePath }) => `- ${path.relative(appRoot, filePath)}`)
      .join('\n')}`,
  );
}

if (!checkOnly) {
  for (const { filePath, nextContent } of plannedWrites) {
    fs.writeFileSync(filePath, nextContent);
  }
}

const mode = checkOnly ? 'checked' : 'prepared';

console.log(`Public release metadata ${mode}.`);
console.log(`Release package count: ${releaseNames.size}`);
console.log(`Files changed: ${checkOnly ? 0 : plannedWrites.length}`);
console.log('Release order:');

releaseLayers.forEach((layer, index) => {
  const packages = layer
    .map(packageName => `${packageName}@${packageEntries.get(packageName).packageJson.version}`)
    .join(', ');
  console.log(`  ${index}: ${packages}`);
});
