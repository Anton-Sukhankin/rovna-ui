const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const docsRoot = path.join(repoRoot, 'docs');
const auditPath = path.join(docsRoot, 'r10-github-readiness.json');
const boundaryPath = path.join(docsRoot, 'r10-commit-boundary.json');
const reportPath = path.join(docsRoot, 'r10-github-ready-gate.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function main() {
  const auditRun = spawnSync(process.execPath, [path.join(__dirname, 'audit-r10-github-readiness.js')], {
    cwd: appRoot,
    encoding: 'utf8',
    stdio: 'inherit',
  });
  const audit = readJson(auditPath);
  const boundary = readJson(boundaryPath);
  const checks = [];
  const check = (id, condition, evidence) => {
    checks.push({ id, status: condition ? 'passed' : 'failed', evidence });
  };

  check('audit-exit', auditRun.status === 0, auditRun.status);
  check('audit-status', audit.status === 'passed-with-owner-actions', audit.status);
  check('audit-checks', audit.failedChecks.length === 0, audit.failedChecks);
  check('commit-boundary', boundary.status === 'prepared', boundary.status);
  check('git-index-empty', boundary.stagedFiles.length === 0, boundary.stagedFiles);
  check('forbidden-tracked-paths', boundary.tracked.forbiddenPaths.length === 0, boundary.tracked.forbiddenPaths);
  check('blocking-file-sizes', boundary.tracked.blockingSizeFiles.length === 0, boundary.tracked.blockingSizeFiles);
  check(
    'owner-actions-explicit',
    ['root-license-decision', 'github-visibility-and-rights', 'github-remote-handoff'].every(id =>
      audit.acceptedOwnerActions.some(item => item.id === id),
    ),
    audit.acceptedOwnerActions,
  );
  check('publication-not-performed', audit.workflow.publicationPerformed === false, audit.workflow);

  const failed = checks.filter(item => item.status === 'failed');
  const report = {
    status: failed.length ? 'failed' : 'passed-with-owner-actions',
    generatedAt: new Date().toISOString(),
    checks,
    passed: checks.length - failed.length,
    failed: failed.length,
    failedChecks: failed.map(item => item.id),
    acceptedOwnerActions: audit.acceptedOwnerActions,
    remoteExecution: audit.workflow.remoteExecution,
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`R-10 GitHub-ready gate: ${report.status}`);
  console.log(`Checks: ${report.passed}/${checks.length}`);
  console.log(`Report: ${reportPath}`);
  if (failed.length) process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
}
