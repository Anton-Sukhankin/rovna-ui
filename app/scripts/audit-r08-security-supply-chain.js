const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const lockfile = require('@yarnpkg/lockfile');
const parseSpdx = require('spdx-expression-parse');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const packagesRoot = path.join(appRoot, 'packages');
const docsRoot = path.join(repoRoot, 'docs');
const lockPath = path.join(appRoot, 'yarn.lock');
const boundaryPath = path.join(appRoot, 'release-boundary.json');
const sourceAuditPath = path.join(repoRoot, 'tmp', 'f17-github-snapshot-audit.json');
const sbomPath = path.join(docsRoot, 'sbom.cdx.json');
const licensePath = path.join(docsRoot, 'dependency-license-inventory.json');
const reportPath = path.join(docsRoot, 'r08-security-supply-chain.json');
const allowedRegistry = 'registry.npmjs.org';

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function sha256Buffer(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function sha256(filePath) {
  return sha256Buffer(fs.readFileSync(filePath));
}

function packagePurl(name, version) {
  const encoded = name.startsWith('@')
    ? `%40${name.slice(1).split('/').map(encodeURIComponent).join('/')}`
    : encodeURIComponent(name);
  return `pkg:npm/${encoded}@${encodeURIComponent(version)}`;
}

function deterministicUuid(hash) {
  const chars = hash.slice(0, 32).split('');
  chars[12] = '5';
  chars[16] = ((parseInt(chars[16], 16) & 3) | 8).toString(16);
  const value = chars.join('');
  return `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}-${value.slice(16, 20)}-${value.slice(20)}`;
}

function workspacePackages() {
  const entries = new Map();
  for (const directory of fs.readdirSync(packagesRoot, { withFileTypes: true })) {
    if (!directory.isDirectory()) continue;
    const manifestPath = path.join(packagesRoot, directory.name, 'package.json');
    if (!fs.existsSync(manifestPath)) continue;
    const manifest = readJson(manifestPath);
    if (manifest.name) entries.set(manifest.name, { manifest, directory: path.dirname(manifestPath) });
  }
  return entries;
}

function findExternalManifest(name, fromDirectory) {
  let current = path.resolve(fromDirectory);
  while (true) {
    const candidate = path.join(current, 'node_modules', ...name.split('/'), 'package.json');
    if (fs.existsSync(candidate)) return candidate;
    if (current === appRoot || current === path.dirname(current)) break;
    current = path.dirname(current);
  }
  const rootCandidate = path.join(appRoot, 'node_modules', ...name.split('/'), 'package.json');
  return fs.existsSync(rootCandidate) ? rootCandidate : null;
}

function dependencyNames(manifest) {
  return [...new Set([
    ...Object.keys(manifest.dependencies || {}),
    ...Object.keys(manifest.optionalDependencies || {}),
    ...Object.keys(manifest.peerDependencies || {}),
  ])].sort();
}

function normalizeLicense(manifest) {
  let declared = manifest.license;
  if (!declared && Array.isArray(manifest.licenses)) {
    declared = manifest.licenses.map(item => item?.type || item).filter(Boolean).join(' OR ');
  }
  if (declared && typeof declared === 'object') declared = declared.type || declared.name;
  if (typeof declared !== 'string' || !declared.trim()) {
    return { declared: null, status: 'missing', spdx: null };
  }
  declared = declared.trim();
  try {
    parseSpdx(declared);
    return { declared, status: 'valid-spdx', spdx: declared };
  } catch {
    return { declared, status: 'non-spdx-or-invalid', spdx: null };
  }
}

function buildRuntimeGraph(workspaces, releaseNames) {
  const queue = releaseNames.map(name => ({ name, from: appRoot }));
  const components = new Map();
  const edges = new Map();
  const missing = [];

  while (queue.length) {
    const request = queue.shift();
    let record = workspaces.get(request.name);
    let manifestPath = null;
    let kind = 'workspace';
    if (!record) {
      manifestPath = findExternalManifest(request.name, request.from);
      if (!manifestPath) {
        missing.push({ dependency: request.name, requestedBy: request.requestedBy || null });
        continue;
      }
      record = { manifest: readJson(manifestPath), directory: path.dirname(manifestPath) };
      kind = 'external';
    }
    const manifest = record.manifest;
    if (!manifest.name || !manifest.version) continue;
    const ref = packagePurl(manifest.name, manifest.version);
    if (components.has(ref)) continue;
    const license = normalizeLicense(manifest);
    const role = releaseNames.includes(manifest.name)
      ? 'release-package'
      : kind === 'workspace'
        ? 'local-compensation-or-workspace'
        : 'external-runtime';
    components.set(ref, {
      name: manifest.name,
      version: manifest.version,
      ref,
      role,
      license,
      directory: record.directory,
      dependencies: dependencyNames(manifest),
    });
    const childRefs = [];
    for (const dependency of dependencyNames(manifest)) {
      const workspace = workspaces.get(dependency);
      const childManifestPath = workspace ? null : findExternalManifest(dependency, record.directory);
      const child = workspace || (childManifestPath
        ? { manifest: readJson(childManifestPath), directory: path.dirname(childManifestPath) }
        : null);
      if (!child?.manifest?.version) {
        const optional = Boolean(manifest.optionalDependencies?.[dependency]);
        const peerOptional = Boolean(manifest.peerDependenciesMeta?.[dependency]?.optional);
        if (!optional && !peerOptional) {
          missing.push({ dependency, requestedBy: manifest.name });
        }
        continue;
      }
      childRefs.push(packagePurl(child.manifest.name, child.manifest.version));
      queue.push({ name: dependency, from: record.directory, requestedBy: manifest.name });
    }
    edges.set(ref, [...new Set(childRefs)].sort());
  }
  return { components: [...components.values()], edges, missing };
}

function installedPackages() {
  const root = path.join(appRoot, 'node_modules');
  const queue = [root];
  const visitedNodeModules = new Set();
  const visitedPackageDirectories = new Set();
  const rows = new Map();

  while (queue.length) {
    const nodeModules = queue.shift();
    let realNodeModules;
    try {
      realNodeModules = fs.realpathSync(nodeModules);
    } catch {
      continue;
    }
    if (visitedNodeModules.has(realNodeModules)) continue;
    visitedNodeModules.add(realNodeModules);
    for (const entry of fs.readdirSync(nodeModules, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue;
      const first = path.join(nodeModules, entry.name);
      const candidates = entry.name.startsWith('@')
        ? fs.readdirSync(first, { withFileTypes: true })
            .filter(item => item.isDirectory() || item.isSymbolicLink())
            .map(item => path.join(first, item.name))
        : [first];
      for (const packageDirectory of candidates) {
        let realPackage;
        try {
          realPackage = fs.realpathSync(packageDirectory);
        } catch {
          continue;
        }
        if (visitedPackageDirectories.has(realPackage)) continue;
        visitedPackageDirectories.add(realPackage);
        const manifestPath = path.join(packageDirectory, 'package.json');
        if (!fs.existsSync(manifestPath)) continue;
        let manifest;
        try {
          manifest = readJson(manifestPath);
        } catch {
          continue;
        }
        if (manifest.name && manifest.version) {
          const key = `${manifest.name}@${manifest.version}`;
          if (!rows.has(key)) {
            rows.set(key, {
              name: manifest.name,
              version: manifest.version,
              license: normalizeLicense(manifest),
              lifecycleScripts: ['preinstall', 'install', 'postinstall'].filter(
                script => typeof manifest.scripts?.[script] === 'string',
              ),
            });
          }
        }
        const nested = path.join(packageDirectory, 'node_modules');
        if (fs.existsSync(nested)) queue.push(nested);
      }
    }
  }
  return [...rows.values()].sort(
    (left, right) => left.name.localeCompare(right.name) || left.version.localeCompare(right.version),
  );
}

function lockAudit() {
  const raw = fs.readFileSync(lockPath, 'utf8');
  const parsed = lockfile.parse(raw);
  if (parsed.type !== 'success') throw new Error(`Cannot parse yarn.lock: ${parsed.type}`);
  const entries = Object.entries(parsed.object);
  const invalidSources = [];
  const missingVersion = [];
  const missingResolved = [];
  const missingIntegrity = [];
  const hosts = new Map();
  for (const [selector, entry] of entries) {
    if (!entry.version) missingVersion.push(selector);
    if (!entry.resolved) {
      missingResolved.push(selector);
      continue;
    }
    let url;
    try {
      url = new URL(entry.resolved.split('#')[0]);
    } catch {
      invalidSources.push({ selector, resolved: entry.resolved, reason: 'invalid-url' });
      continue;
    }
    hosts.set(url.hostname, (hosts.get(url.hostname) || 0) + 1);
    if (url.protocol !== 'https:' || url.hostname !== allowedRegistry) {
      invalidSources.push({ selector, resolved: entry.resolved, reason: 'non-public-source' });
    }
    if (!entry.integrity) missingIntegrity.push(selector);
  }
  return {
    entries: entries.length,
    lockSha256: sha256(lockPath),
    registryHosts: Object.fromEntries([...hosts.entries()].sort()),
    invalidSources,
    missingVersion,
    missingResolved,
    missingIntegrity,
  };
}

function gitCandidates() {
  function run(args) {
    const result = spawnSync(
      'git',
      ['-c', `safe.directory=${repoRoot}`, ...args, '-z'],
      { cwd: repoRoot, encoding: 'utf8' },
    );
    if (result.status !== 0) throw new Error(result.stderr || 'git path inventory failed');
    return result.stdout.split('\0').filter(Boolean).map(item => item.replace(/\\/g, '/'));
  }
  return [...new Set([
    ...run(['ls-files']),
    ...run(['ls-files', '--others', '--exclude-standard']),
  ])].sort();
}

function sourceArtifactAudit(workspaces) {
  const executableExtensions = new Set(['.exe', '.dll', '.msi', '.com', '.scr', '.node', '.so', '.dylib', '.class', '.jar']);
  const expectedBinaryExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.ico', '.webp', '.avif', '.bmp', '.woff', '.woff2', '.ttf', '.otf', '.eot', '.pdf', '.zip', '.gz', '.tgz', '.mp3', '.mp4', '.wav']);
  const suspiciousNames = /(?:^|\/)(?:\.env|id_rsa|id_dsa|id_ed25519|credentials)(?:\.|$)|\.(?:pem|pfx|p12|key)$/i;
  const executableArtifacts = [];
  const unexpectedBinaryArtifacts = [];
  const suspiciousCredentialFiles = [];
  const activeAbsolutePaths = [];
  const referenceAbsolutePaths = [];
  const absolutePathPattern = /(?:[A-Za-z]:[\\/](?:Users|Documents and Settings)[\\/][^\\/\s]+[\\/]|\/(?:Users|home)\/[^/\s]+\/)/i;

  for (const relative of gitCandidates()) {
    const absolute = path.join(repoRoot, ...relative.split('/'));
    if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) continue;
    const extension = path.extname(relative).toLowerCase();
    if (executableExtensions.has(extension)) executableArtifacts.push(relative);
    if (suspiciousNames.test(relative) && !/\.example$/i.test(relative)) {
      suspiciousCredentialFiles.push(relative);
    }
    const buffer = fs.readFileSync(absolute);
    const sample = buffer.subarray(0, Math.min(buffer.length, 8192));
    const binary = sample.includes(0);
    if (binary && !expectedBinaryExtensions.has(extension)) unexpectedBinaryArtifacts.push(relative);
    if (binary) continue;
    const text = buffer.toString('utf8');
    const match = text.match(absolutePathPattern);
    if (!match) continue;
    const active = relative.startsWith('app/') &&
      /\.(?:js|jsx|ts|tsx|mjs|cjs|json|ya?ml)$/i.test(relative) &&
      !/(?:\.stories\.|\.test\.|\.spec\.|\/__snapshots__\/|CHANGELOG\.md)/i.test(relative);
    (active ? activeAbsolutePaths : referenceAbsolutePaths).push({ file: relative, sample: match[0] });
  }

  const sourceLifecycleScripts = [];
  for (const [name, record] of workspaces) {
    const scripts = ['preinstall', 'install', 'postinstall'].filter(
      script => typeof record.manifest.scripts?.[script] === 'string',
    );
    if (scripts.length) sourceLifecycleScripts.push({ name, scripts });
  }
  return {
    executableArtifacts,
    unexpectedBinaryArtifacts,
    suspiciousCredentialFiles,
    activeAbsolutePaths,
    referenceAbsolutePathFiles: referenceAbsolutePaths.length,
    sourceLifecycleScripts,
  };
}

function createSbom(runtime, lockSha256, releaseNames) {
  const sorted = runtime.components.sort((left, right) => left.ref.localeCompare(right.ref));
  return {
    bomFormat: 'CycloneDX',
    specVersion: '1.5',
    serialNumber: `urn:uuid:${deterministicUuid(lockSha256)}`,
    version: 1,
    metadata: {
      component: {
        type: 'application',
        'bom-ref': `rovna-ui-workspace@${lockSha256.slice(0, 12)}`,
        name: 'Rovna UI workspace',
        version: lockSha256.slice(0, 12),
        licenses: [{ expression: 'MIT' }],
        properties: [
          { name: 'rovna-ui:release-package-count', value: String(releaseNames.length) },
          { name: 'rovna-ui:yarn-lock-sha256', value: lockSha256 },
          { name: 'rovna-ui:license-policy', value: 'MIT' },
        ],
      },
    },
    components: sorted.map(component => ({
      type: 'library',
      'bom-ref': component.ref,
      group: component.name.startsWith('@') ? component.name.split('/')[0].slice(1) : undefined,
      name: component.name.startsWith('@') ? component.name.split('/')[1] : component.name,
      version: component.version,
      scope: 'required',
      purl: component.ref,
      licenses: component.license.spdx
        ? [{ expression: component.license.spdx }]
        : undefined,
      properties: [{ name: 'rovna-ui:role', value: component.role }],
    })),
    dependencies: sorted.map(component => ({
      ref: component.ref,
      dependsOn: runtime.edges.get(component.ref) || [],
    })),
  };
}

function main() {
  const boundary = readJson(boundaryPath);
  const releaseNames = boundary.publicReleasePackages;
  const workspaces = workspacePackages();
  const runtime = buildRuntimeGraph(workspaces, releaseNames);
  const installed = installedPackages();
  const runtimeRefs = new Set(runtime.components.map(component => `${component.name}@${component.version}`));
  const lock = lockAudit();
  const sourceArtifacts = sourceArtifactAudit(workspaces);
  const sourceAudit = fs.existsSync(sourceAuditPath) ? readJson(sourceAuditPath) : null;
  const rootLicensePresent = fs.readdirSync(repoRoot).some(name => /^LICEN[CS]E(?:\.|$)/i.test(name));
  const releaseSet = new Set(releaseNames);

  const licenseRows = installed.map(row => ({
    name: row.name,
    version: row.version,
    dependencyClass: runtimeRefs.has(`${row.name}@${row.version}`) ? 'runtime' : 'development',
    releaseRole: releaseSet.has(row.name)
      ? 'release-package-owner-license-pending'
      : workspaces.has(row.name)
        ? 'local-workspace-owner-license-pending'
        : 'third-party',
    declaredLicense: row.license.declared,
    licenseStatus:
      workspaces.has(row.name) ? 'owner-unconfirmed-metadata' : row.license.status,
    lifecycleScripts: row.lifecycleScripts,
  }));
  const licenseSummary = {
    packages: licenseRows.length,
    runtimePackages: licenseRows.filter(row => row.dependencyClass === 'runtime').length,
    developmentPackages: licenseRows.filter(row => row.dependencyClass === 'development').length,
    validSpdx: licenseRows.filter(row => row.licenseStatus === 'valid-spdx').length,
    missing: licenseRows.filter(row => row.licenseStatus === 'missing').length,
    nonSpdxOrInvalid: licenseRows.filter(row => row.licenseStatus === 'non-spdx-or-invalid').length,
    ownerUnconfirmedMetadata: licenseRows.filter(row => row.licenseStatus === 'owner-unconfirmed-metadata').length,
    installedLifecyclePackages: licenseRows.filter(row => row.lifecycleScripts.length > 0).length,
  };
  const licenseReport = {
    schemaVersion: 1,
    lockSha256: lock.lockSha256,
    projectLicense: {
      status: rootLicensePresent ? 'present' : 'owner-decision-pending',
      rootLicensePresent,
      spdx: rootLicensePresent ? 'MIT' : null,
      manifestMetadataIsAuthorization: false,
    },
    summary: licenseSummary,
    packages: licenseRows,
  };

  const sbom = createSbom(runtime, lock.lockSha256, releaseNames);
  const report = {
    schemaVersion: 1,
    status: 'passed',
    lockSha256: lock.lockSha256,
    releaseBoundary: {
      expectedPackages: releaseNames.length,
      representedPackages: runtime.components.filter(row => row.role === 'release-package').length,
    },
    sbom: {
      format: 'CycloneDX 1.5',
      components: sbom.components.length,
      dependencyEdges: sbom.dependencies.reduce((sum, row) => sum + row.dependsOn.length, 0),
      missingDependencies: runtime.missing,
      deterministicSerialNumber: sbom.serialNumber,
    },
    licenses: licenseSummary,
    lockfile: lock,
    sourceAudit: sourceAudit
      ? {
          secretFindings: sourceAudit.secretFindings.length,
          activeInternalReferences: sourceAudit.internalReferences.activeSourceFiles.length,
          unreviewedReferenceFiles: sourceAudit.internalReferences.unreviewedReferenceOnlyFiles.length,
          unexpectedCandidates: sourceAudit.unexpectedCandidates.length,
          blockers: sourceAudit.blockers,
        }
      : { missing: true },
    sourceArtifacts,
    installPolicy: {
      lifecycleScriptsExecutedDuringR08: false,
      publicRegistryOnly: true,
      closedCorporateSourcesUsed: false,
    },
    ownerDecisions: [
      {
        id: 'project-license',
        status: rootLicensePresent ? 'resolved' : 'pending',
        blockingLocalUse: false,
        note: rootLicensePresent
          ? 'The root MIT license is the project authorization; package manifests mirror it.'
          : 'Package manifest license fields alone are not owner authorization.',
      },
    ],
  };

  const failures = [];
  if (report.releaseBoundary.representedPackages !== releaseNames.length) failures.push('release-boundary');
  if (runtime.missing.length) failures.push('runtime-dependencies');
  if (lock.invalidSources.length || lock.missingVersion.length || lock.missingResolved.length || lock.missingIntegrity.length) failures.push('lockfile');
  if (!sourceAudit || report.sourceAudit.secretFindings || report.sourceAudit.activeInternalReferences || report.sourceAudit.unreviewedReferenceFiles || report.sourceAudit.unexpectedCandidates) failures.push('source-audit');
  if (sourceArtifacts.executableArtifacts.length || sourceArtifacts.unexpectedBinaryArtifacts.length || sourceArtifacts.suspiciousCredentialFiles.length || sourceArtifacts.activeAbsolutePaths.length || sourceArtifacts.sourceLifecycleScripts.length) failures.push('source-artifacts');
  report.status = failures.length ? 'failed' : 'passed';
  report.failures = failures;

  fs.writeFileSync(sbomPath, `${JSON.stringify(sbom, null, 2)}\n`);
  fs.writeFileSync(licensePath, `${JSON.stringify(licenseReport, null, 2)}\n`);
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`R-08 security and supply chain audit: ${report.status}`);
  console.log(`Release packages: ${report.releaseBoundary.representedPackages}/${releaseNames.length}`);
  console.log(`SBOM components: ${report.sbom.components}`);
  console.log(`Installed license records: ${licenseSummary.packages}`);
  console.log(`Lock entries: ${lock.entries}; invalid sources: ${lock.invalidSources.length}`);
  console.log(`Report: ${reportPath}`);
  if (failures.length) process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
}
