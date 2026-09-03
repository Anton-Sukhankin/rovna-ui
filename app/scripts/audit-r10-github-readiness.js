const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { parse } = require('yaml');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const docsRoot = path.join(repoRoot, 'docs');
const reportPath = path.join(docsRoot, 'r10-github-readiness.json');
const boundaryPath = path.join(docsRoot, 'r10-commit-boundary.json');
const workflowPath = path.join(repoRoot, '.github', 'workflows', 'quality.yml');
const snapshotReportPath = path.join(repoRoot, 'tmp', 'f17-github-snapshot-audit.json');

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || repoRoot,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  if (!options.allowFailure && result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed:\n${result.stderr || result.stdout}`);
  }
  return result;
}

function git(args, allowFailure = false) {
  return run('git', ['-c', `safe.directory=${repoRoot}`, ...args], { allowFailure });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function parseStatus(source) {
  const records = source.split('\0').filter(Boolean);
  const entries = [];
  for (let index = 0; index < records.length; index += 1) {
    const record = records[index];
    const code = record.slice(0, 2);
    const file = record.slice(3).replace(/\\/g, '/');
    const entry = { code, file };
    if ((code.includes('R') || code.includes('C')) && records[index + 1]) {
      entry.originalFile = records[index + 1].replace(/\\/g, '/');
      index += 1;
    }
    entries.push(entry);
  }
  return entries;
}

function main() {
  fs.mkdirSync(docsRoot, { recursive: true });

  const snapshotRun = run(process.execPath, [path.join(__dirname, 'audit-github-source-snapshot.js')], {
    cwd: appRoot,
    allowFailure: true,
  });
  const snapshot = fs.existsSync(snapshotReportPath) ? readJson(snapshotReportPath) : null;
  const tracked = git(['ls-files', '-z']).stdout.split('\0').filter(Boolean).map(file => file.replace(/\\/g, '/'));
  const statusEntries = parseStatus(git(['status', '--porcelain=v1', '-z', '--untracked-files=all']).stdout);
  const staged = git(['diff', '--cached', '--name-only', '-z']).stdout.split('\0').filter(Boolean);
  const remoteResult = git(['remote', 'get-url', 'origin'], true);
  const origin = remoteResult.status === 0 ? remoteResult.stdout.trim() : '';
  const branch = git(['branch', '--show-current']).stdout.trim();

  const trackedFiles = tracked
    .filter(file => fs.existsSync(path.join(repoRoot, file)) && fs.statSync(path.join(repoRoot, file)).isFile())
    .map(file => ({ file, bytes: fs.statSync(path.join(repoRoot, file)).size }));
  const totalTrackedBytes = trackedFiles.reduce((total, item) => total + item.bytes, 0);
  const largestTrackedFiles = [...trackedFiles].sort((left, right) => right.bytes - left.bytes).slice(0, 20);
  const warningSizeFiles = trackedFiles.filter(item => item.bytes > 10 * 1024 * 1024);
  const blockingSizeFiles = trackedFiles.filter(item => item.bytes >= 95 * 1024 * 1024);
  const forbiddenTracked = tracked.filter(file =>
    /(^|\/)(?:node_modules|storybook-static(?:-next|-previous)?|tmp|release|\.cache)(?:\/|$)/i.test(file) ||
    /(^|\/)\.env(?:\.|$)/i.test(file) ||
    /\.(?:pem|key|p12|pfx|jks)$/i.test(file),
  );

  const requiredFiles = [
    'README.md',
    'CONTRIBUTING.md',
    'SECURITY.md',
    '.gitignore',
    '.gitattributes',
    '.github/PULL_REQUEST_TEMPLATE.md',
    '.github/ISSUE_TEMPLATE/config.yml',
    '.github/ISSUE_TEMPLATE/bug_report.yml',
    '.github/ISSUE_TEMPLATE/component_request.yml',
    '.github/dependabot.yml',
    '.github/workflows/quality.yml',
    'docs/github-repository-settings.md',
  ];
  const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(repoRoot, file)));
  const ignoreSource = fs.readFileSync(path.join(repoRoot, '.gitignore'), 'utf8');
  const requiredIgnorePatterns = [
    'node_modules/',
    'storybook-static/',
    'tmp/',
    'release/',
    '.env',
    '*.pem',
    '*.key',
    '.cache/',
  ];
  const missingIgnorePatterns = requiredIgnorePatterns.filter(item => !ignoreSource.includes(item));

  const workflowSource = fs.readFileSync(workflowPath, 'utf8').replace(/^\uFEFF/, '');
  const workflow = parse(workflowSource);
  const jobs = workflow.jobs || {};
  const jobNames = ['quality', 'browser-quality', 'release-rehearsal'];
  const allSteps = Object.values(jobs).flatMap(job => job.steps || []);
  const allRuns = allSteps.map(step => step.run || '').join('\n');
  const allArtifactPaths = allSteps
    .filter(step => String(step.uses || '').startsWith('actions/upload-artifact@'))
    .map(step => String(step.with?.path || ''))
    .join('\n');
  const closedHostPattern = /(?:gitlab|registry(?:-dev)?|packages|nexus)\.[\w.-]*(?:samolet|corp)|samoletgroup\.ru|samolet10d\.ru/i;
  const publishPattern = /(?:npm(?:\.cmd)?|yarn)\s+publish\b|release:ci\b/;
  const requiredCommands = [
    'security:r08:audit',
    'quality:r08',
    'docs:r09:generate',
    'quality:r09',
    'quality:r10',
    'run-eslint.js --quiet',
    'run-supported-package-gate.js',
    'run-ds-only-tests.js',
    'build-storybook-local.js',
    'test:storybook:ci',
    'storybook:a11y:audit',
    'storybook:visual:audit',
    'release:ds-only',
    'consumers:ds-only',
    'compatibility:react',
  ];
  const missingCommands = requiredCommands.filter(command => !allRuns.includes(command));
  const requiredArtifacts = [
    'r08-security-supply-chain-gate.json',
    'r09-documentation-gate.json',
    'r10-github-readiness.json',
    'r10-commit-boundary.json',
    'r10-github-ready-gate.json',
    'q02-story-render-failures',
    'q05-visual-failures',
  ];
  const missingArtifacts = requiredArtifacts.filter(item => !allArtifactPaths.includes(item));

  const checks = [];
  const check = (id, condition, evidence) => {
    checks.push({ id, status: condition ? 'passed' : 'failed', evidence });
  };
  check('community-files', missingFiles.length === 0, { required: requiredFiles, missing: missingFiles });
  check('ignore-contract', missingIgnorePatterns.length === 0, { missing: missingIgnorePatterns });
  check('forbidden-tracked-paths', forbiddenTracked.length === 0, forbiddenTracked);
  check('github-file-size-limit', blockingSizeFiles.length === 0, { warningSizeFiles, blockingSizeFiles });
  check('git-index-empty', staged.length === 0, staged);
  check('workflow-jobs', jobNames.every(job => jobs[job]), Object.keys(jobs));
  check(
    'workflow-timeouts',
    jobNames.every(job => Number.isFinite(jobs[job]?.['timeout-minutes'])),
    Object.fromEntries(jobNames.map(job => [job, jobs[job]?.['timeout-minutes']])),
  );
  check(
    'workflow-concurrency',
    Boolean(workflow.concurrency?.group) && workflow.concurrency?.['cancel-in-progress'] === true,
    workflow.concurrency,
  );
  check(
    'workflow-read-only-permissions',
    workflow.permissions?.contents === 'read',
    workflow.permissions,
  );
  check(
    'workflow-cache',
    jobNames.every(job => (jobs[job]?.steps || []).some(step => step.with?.cache === 'yarn')),
    jobNames,
  );
  check(
    'workflow-artifact-upload',
    jobNames.every(job =>
      (jobs[job]?.steps || []).some(step => String(step.uses || '').startsWith('actions/upload-artifact@')),
    ),
    jobNames,
  );
  check('workflow-command-coverage', missingCommands.length === 0, { missing: missingCommands });
  check('workflow-failure-artifacts', missingArtifacts.length === 0, { missing: missingArtifacts });
  check('workflow-no-publication', !publishPattern.test(allRuns), 'No publish or release:ci command.');
  check('workflow-no-secrets', !workflowSource.includes('secrets.'), 'No GitHub secret reference.');
  check('workflow-no-pull-request-target', !workflowSource.includes('pull_request_target'), 'Safe PR trigger.');
  check('workflow-public-sources-only', !closedHostPattern.test(workflowSource), 'No closed host in workflow.');
  check(
    'source-snapshot-executable',
    snapshotRun.status === 0 && Boolean(snapshot),
    { status: snapshotRun.status, stderr: snapshotRun.stderr.trim() },
  );
  check('source-snapshot-no-secrets', snapshot?.secretFindings?.length === 0, snapshot?.secretFindings || []);
  check('source-snapshot-size', snapshot?.oversizedFiles?.length === 0, snapshot?.oversizedFiles || []);
  check(
    'source-snapshot-no-active-internal-references',
    snapshot?.internalReferences?.activeSourceFiles?.length === 0 &&
      snapshot?.internalReferences?.unreviewedReferenceOnlyFiles?.length === 0,
    snapshot?.internalReferences || null,
  );

  const acceptedOwnerActions = [
    {
      id: 'root-license-decision',
      status: fs.existsSync(path.join(repoRoot, 'LICENSE')) ? 'resolved' : 'accepted-owner-action',
      evidence: fs.existsSync(path.join(repoRoot, 'LICENSE'))
        ? 'Root LICENSE exists.'
        : 'Root LICENSE is intentionally absent until the owner chooses a license.',
    },
    {
      id: 'github-visibility-and-rights',
      status: 'accepted-owner-action',
      evidence: 'Repository visibility and the right to publish source must be confirmed by the owner.',
    },
    {
      id: 'github-remote-handoff',
      status: origin ? 'resolved' : 'accepted-owner-action',
      evidence: origin || 'No origin is configured; remote creation and push were not performed.',
    },
  ];

  const failedChecks = checks.filter(item => item.status === 'failed').map(item => item.id);
  const boundary = {
    status: forbiddenTracked.length || blockingSizeFiles.length || staged.length ? 'failed' : 'prepared',
    generatedAt: new Date().toISOString(),
    branch,
    origin: origin || null,
    stagedFiles: staged,
    workingTree: {
      totalChanges: statusEntries.length,
      trackedChanges: statusEntries.filter(item => item.code !== '??').length,
      untrackedChanges: statusEntries.filter(item => item.code === '??').length,
      entries: statusEntries,
    },
    tracked: {
      files: trackedFiles.length,
      bytes: totalTrackedBytes,
      largestFiles: largestTrackedFiles,
      warningSizeFiles,
      blockingSizeFiles,
      forbiddenPaths: forbiddenTracked,
    },
    statement:
      'No files were staged, committed or pushed by R-10. Review the full working-tree list before intentional first-commit staging.',
  };
  fs.writeFileSync(boundaryPath, `${JSON.stringify(boundary, null, 2)}\n`);

  const report = {
    status: failedChecks.length ? 'failed' : 'passed-with-owner-actions',
    generatedAt: new Date().toISOString(),
    checks,
    failedChecks,
    acceptedOwnerActions,
    repository: {
      branch,
      origin: origin || null,
      trackedFiles: trackedFiles.length,
      trackedBytes: totalTrackedBytes,
      workingTreeChanges: statusEntries.length,
      stagedFiles: staged.length,
    },
    workflow: {
      file: '.github/workflows/quality.yml',
      jobs: Object.keys(jobs),
      remoteExecution: 'pending-first-GitHub-run',
      publicationPerformed: false,
    },
    sourceSnapshot: snapshot
      ? {
          status: snapshot.status,
          blockers: snapshot.blockers,
          candidateFiles: snapshot.candidateFiles,
          totalBytes: snapshot.totalBytes,
        }
      : null,
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log(`R-10 GitHub readiness audit: ${report.status}`);
  console.log(`Checks: ${checks.length - failedChecks.length}/${checks.length}`);
  console.log(`Working tree entries: ${statusEntries.length}; staged: ${staged.length}`);
  console.log(`Report: ${reportPath}`);
  console.log(`Commit boundary: ${boundaryPath}`);
  if (failedChecks.length) process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
}
