const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const semver = require('semver');
const yarnLockfile = require('@yarnpkg/lockfile');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const packagesRoot = path.join(appRoot, 'packages');
const lockPath = path.join(appRoot, 'yarn.lock');
const reportPath = path.join(repoRoot, 'docs', 'dependency-audit.json');
const registry = 'https://registry.npmjs.org';
const auditEndpoint = `${registry}/-/npm/v1/security/advisories/bulk`;
const verifyOnly = process.argv.includes('--verify');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function severityRank(severity) {
  return { critical: 4, high: 3, moderate: 2, low: 1, info: 0 }[severity] || 0;
}

function packageNameFromSelector(selector) {
  return selector.match(/^(@[^/]+\/[^@]+|[^@]+)@/)?.[1] || null;
}

function readWorkspaceManifests() {
  const manifests = new Map();
  for (const directory of fs.readdirSync(packagesRoot, { withFileTypes: true })) {
    if (!directory.isDirectory()) continue;
    const manifestPath = path.join(packagesRoot, directory.name, 'package.json');
    if (!fs.existsSync(manifestPath)) continue;
    const manifest = readJson(manifestPath);
    if (manifest.name) manifests.set(manifest.name, manifest);
  }
  return manifests;
}

function buildLockIndex() {
  const parsed = yarnLockfile.parse(fs.readFileSync(lockPath, 'utf8'));
  if (parsed.type !== 'success') throw new Error(`Cannot parse yarn.lock: ${parsed.type}`);
  const selectors = new Map();
  const recordsByName = new Map();

  for (const [combinedSelectors, entry] of Object.entries(parsed.object)) {
    const selectorList = combinedSelectors.split(/,\s+/);
    const name = packageNameFromSelector(selectorList[0]);
    if (!name || !entry.version) continue;
    const record = {
      name,
      version: entry.version,
      resolved: entry.resolved || null,
      dependencies: entry.dependencies || {},
      optionalDependencies: entry.optionalDependencies || {},
    };
    selectorList.forEach(selector => selectors.set(selector, record));
    const records = recordsByName.get(name) || [];
    if (!records.some(candidate => candidate.version === record.version)) records.push(record);
    recordsByName.set(name, records);
  }

  return { selectors, recordsByName };
}

function resolveLockRecord(index, name, range) {
  const exact = index.selectors.get(`${name}@${range}`);
  if (exact) return exact;
  const candidates = index.recordsByName.get(name) || [];
  const matching = candidates.filter(candidate => {
    try {
      return semver.satisfies(candidate.version, range, { includePrerelease: true });
    } catch {
      return false;
    }
  });
  if (matching.length === 1) return matching[0];
  throw new Error(`Cannot resolve audited lock entry: ${name}@${range}`);
}

function collectAuditPayload(includeDev) {
  const rootManifest = readJson(path.join(appRoot, 'package.json'));
  const workspaceManifests = readWorkspaceManifests();
  const lockIndex = buildLockIndex();
  const queue = [];
  const visitedWorkspaces = new Set();
  const visitedRecords = new Map();
  const addDependencies = manifest => {
    const fields = includeDev
      ? ['dependencies', 'optionalDependencies', 'devDependencies']
      : ['dependencies', 'optionalDependencies'];
    fields.forEach(field => {
      Object.entries(manifest[field] || {}).forEach(([name, range]) => queue.push({ name, range }));
    });
  };

  addDependencies(rootManifest);
  workspaceManifests.forEach((manifest, name) => queue.push({ name, range: manifest.version }));

  while (queue.length > 0) {
    const { name, range } = queue.shift();
    const workspace = workspaceManifests.get(name);
    if (workspace) {
      if (!visitedWorkspaces.has(name)) {
        visitedWorkspaces.add(name);
        addDependencies(workspace);
      }
      continue;
    }

    const record = resolveLockRecord(lockIndex, name, range);
    const identity = `${record.name}@${record.version}`;
    if (visitedRecords.has(identity)) continue;
    visitedRecords.set(identity, record);
    Object.entries(record.dependencies).forEach(([dependency, dependencyRange]) => {
      queue.push({ name: dependency, range: dependencyRange });
    });
    Object.entries(record.optionalDependencies).forEach(([dependency, dependencyRange]) => {
      queue.push({ name: dependency, range: dependencyRange });
    });
  }

  const payload = {};
  for (const record of visitedRecords.values()) {
    if (!record.resolved?.startsWith(`${registry}/`)) continue;
    payload[record.name] = payload[record.name] || [];
    if (!payload[record.name].includes(record.version)) payload[record.name].push(record.version);
  }
  Object.values(payload).forEach(versions => versions.sort(semver.compare));

  return {
    payload,
    dependencies: Object.values(payload).reduce((total, versions) => total + versions.length, 0),
  };
}

async function requestBulkAdvisories(payload) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(auditEndpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'user-agent': 'rovna-ui-security-audit/1',
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(240000),
      });
      if (!response.ok) {
        const body = (await response.text()).slice(0, 500);
        throw new Error(`npm bulk audit HTTP ${response.status}: ${body}`);
      }
      const result = await response.json();
      if (!result || typeof result !== 'object' || Array.isArray(result)) {
        throw new Error('npm bulk audit returned an invalid response');
      }
      return { result, attempts: attempt };
    } catch (error) {
      lastError = error;
      if (attempt < 3) {
        await new Promise(resolve => setTimeout(resolve, attempt * 2000));
      }
    }
  }
  throw new Error(`Public npm bulk audit failed after 3 attempts: ${lastError?.message || lastError}`);
}

async function runAudit(groups) {
  const { payload, dependencies } = collectAuditPayload(groups !== 'dependencies');
  const { result, attempts } = await requestBulkAdvisories(payload);

  const advisories = new Map();
  for (const [name, packageAdvisories] of Object.entries(result)) {
    const versions = payload[name] || [];
    for (const advisory of packageAdvisories) {
      const affectedVersions = versions.filter(version =>
        semver.satisfies(version, advisory.vulnerable_versions, { includePrerelease: true }),
      );
      if (affectedVersions.length === 0 || advisories.has(advisory.id)) continue;
      advisories.set(advisory.id, {
        id: advisory.id,
        severity: advisory.severity,
        module: name,
        title: advisory.title,
        vulnerableVersions: advisory.vulnerable_versions,
        affectedVersions,
        patchedVersions: null,
        url: advisory.url,
      });
    }
  }

  const rows = [...advisories.values()].sort(
    (left, right) =>
      severityRank(right.severity) - severityRank(left.severity) ||
      left.module.localeCompare(right.module) ||
      left.id - right.id,
  );
  const severities = { info: 0, low: 0, moderate: 0, high: 0, critical: 0 };
  for (const row of rows) severities[row.severity] += 1;
  return {
    status: rows.length === 0 ? 'passed' : 'failed',
    groups: groups || 'all',
    auditExitCode: rows.length === 0 ? 0 : 1,
    provider: 'npm-bulk-advisory-api',
    endpoint: auditEndpoint,
    requestAttempts: attempts,
    uniqueAdvisories: rows.length,
    severities,
    dependencies,
    advisories: rows,
  };
}

function verify() {
  if (!fs.existsSync(reportPath)) throw new Error('Missing docs/dependency-audit.json');
  const report = readJson(reportPath);
  const errors = [];
  if (report.lockSha256 !== sha256(lockPath)) errors.push('audit snapshot lock hash is stale');
  if (report.registry !== registry) errors.push('audit snapshot registry is not public npm');
  if (report.lifecycleScriptsExecuted !== false) errors.push('lifecycle execution policy is missing');
  for (const key of ['production', 'full']) {
    if (report[key]?.status !== 'passed' || report[key]?.uniqueAdvisories !== 0) {
      errors.push(`${key} dependency audit is not clean`);
    }
  }
  console.log(`R-08 public audit snapshot: ${errors.length ? 'failed' : 'passed'}`);
  console.log(`Lock SHA-256: ${report.lockSha256}`);
  if (errors.length) throw new Error(errors.join('; '));
}

async function refresh() {
  const report = {
    schemaVersion: 1,
    status: 'passed',
    checkedAt: new Date().toISOString(),
    registry,
    sourcePolicy: 'public-npm-only',
    lockSha256: sha256(lockPath),
    lifecycleScriptsExecuted: false,
    production: await runAudit('dependencies'),
    full: await runAudit(null),
  };
  report.status =
    report.production.status === 'passed' && report.full.status === 'passed'
      ? 'passed'
      : 'failed';
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`R-08 public dependency audit: ${report.status}`);
  console.log(`Production advisories: ${report.production.uniqueAdvisories}`);
  console.log(`Full graph advisories: ${report.full.uniqueAdvisories}`);
  console.log(`Report: ${reportPath}`);
  if (report.status !== 'passed') process.exitCode = 1;
}

async function main() {
  if (verifyOnly) verify();
  else await refresh();
}

main().catch(error => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
});
