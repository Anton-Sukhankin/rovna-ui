const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const lockPath = path.join(appRoot, 'yarn.lock');
const reportPath = path.join(repoRoot, 'docs', 'dependency-audit.json');
const registry = 'https://registry.npmjs.org';
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

function runAudit(groups) {
  const args = ['yarn', 'audit', '--level', 'low', '--json', '--registry', registry];
  if (groups) args.push('--groups', groups);
  const executable = process.platform === 'win32' ? process.env.ComSpec || 'cmd.exe' : 'corepack';
  const executableArgs = process.platform === 'win32'
    ? ['/d', '/s', '/c', ['corepack', ...args].join(' ')]
    : args;
  const result = spawnSync(executable, executableArgs, {
    cwd: appRoot,
    encoding: 'utf8',
    maxBuffer: 100 * 1024 * 1024,
  });
  if (result.error) throw result.error;

  const advisories = new Map();
  let summary = null;
  for (const line of `${result.stdout || ''}\n${result.stderr || ''}`.split(/\r?\n/)) {
    if (!line.trim().startsWith('{')) continue;
    let event;
    try {
      event = JSON.parse(line);
    } catch {
      continue;
    }
    if (event.type === 'auditSummary') summary = event.data;
    if (event.type !== 'auditAdvisory') continue;
    const advisory = event.data.advisory;
    if (!advisories.has(advisory.id)) {
      advisories.set(advisory.id, {
        id: advisory.id,
        severity: advisory.severity,
        module: advisory.module_name,
        title: advisory.title,
        vulnerableVersions: advisory.vulnerable_versions,
        patchedVersions: advisory.patched_versions,
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
  if (!summary && result.status !== 0 && rows.length === 0) {
    throw new Error(`Public npm audit failed without a parseable result (exit ${result.status})`);
  }
  return {
    status: rows.length === 0 ? 'passed' : 'failed',
    groups: groups || 'all',
    auditExitCode: result.status,
    uniqueAdvisories: rows.length,
    severities,
    dependencies: summary?.totalDependencies ?? null,
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

function refresh() {
  const report = {
    schemaVersion: 1,
    status: 'passed',
    checkedAt: new Date().toISOString(),
    registry,
    sourcePolicy: 'public-npm-only',
    lockSha256: sha256(lockPath),
    lifecycleScriptsExecuted: false,
    production: runAudit('dependencies'),
    full: runAudit(null),
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

try {
  if (verifyOnly) verify();
  else refresh();
} catch (error) {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
}
