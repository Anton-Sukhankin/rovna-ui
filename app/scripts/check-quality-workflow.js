const fs = require('fs');
const path = require('path');
const { parse } = require('yaml');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const workflowPath = path.join(repoRoot, '.github', 'workflows', 'quality.yml');
const packagePath = path.join(appRoot, 'package.json');
const nodeVersionPath = path.join(repoRoot, '.nvmrc');
const appNodeVersionPath = path.join(appRoot, '.nvmrc');
const reportPath = path.join(repoRoot, 'docs', 'q13-ci-quality-report.json');

function main() {
  const source = fs.readFileSync(workflowPath, 'utf8').replace(/^\uFEFF/, '');
  const workflow = parse(source);
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const nodeVersion = fs.readFileSync(nodeVersionPath, 'utf8').trim();
  const appNodeVersion = fs.readFileSync(appNodeVersionPath, 'utf8').trim();
  const jobs = workflow.jobs || {};
  const checks = [];

  const check = (id, condition, evidence) => {
    checks.push({ id, status: condition ? 'passed' : 'failed', evidence });
  };
  const jobSteps = job => jobs[job]?.steps || [];
  const runCommands = Object.entries(jobs).flatMap(([job, value]) =>
    (value.steps || [])
      .filter(step => typeof step.run === 'string')
      .map(step => ({ job, name: step.name, run: step.run })),
  );
  const allRuns = runCommands.map(command => command.run).join('\n');
  const qualityRuns = jobSteps('quality')
    .map(step => step.run || '')
    .join('\n');
  const browserRuns = jobSteps('browser-quality')
    .map(step => step.run || '')
    .join('\n');
  const browserArtifacts = jobSteps('browser-quality')
    .filter(step => String(step.uses || '').startsWith('actions/upload-artifact@'))
    .map(step => step.with?.path || '')
    .join('\n');
  const releaseRuns = jobSteps('release-rehearsal')
    .map(step => step.run || '')
    .join('\n');

  check(
    'jobs',
    ['quality', 'browser-quality', 'release-rehearsal'].every(job => jobs[job]),
    Object.keys(jobs),
  );
  check(
    'concurrency',
    Boolean(workflow.concurrency?.group) && workflow.concurrency?.['cancel-in-progress'] === true,
    workflow.concurrency,
  );
  check(
    'job-timeouts',
    ['quality', 'browser-quality', 'release-rehearsal'].every(
      job => Number.isFinite(jobs[job]?.['timeout-minutes']),
    ),
    Object.fromEntries(
      Object.entries(jobs).map(([job, value]) => [job, value['timeout-minutes']]),
    ),
  );
  check(
    'browser-dependency-order',
    JSON.stringify(jobs['browser-quality']?.needs) === JSON.stringify('quality') &&
      Array.isArray(jobs['release-rehearsal']?.needs) &&
      jobs['release-rehearsal'].needs.includes('browser-quality'),
    {
      browserNeeds: jobs['browser-quality']?.needs,
      releaseNeeds: jobs['release-rehearsal']?.needs,
    },
  );
  check(
    'explicit-browser-limits',
    ['Q_RUNTIME_CONCURRENCY', 'Q_RUNTIME_ENTRY_TIMEOUT', 'Q_A11Y_CONCURRENCY', 'Q_LANGUAGE_CONCURRENCY'].every(
      key => jobs['browser-quality']?.env?.[key] !== undefined,
    ),
    jobs['browser-quality']?.env,
  );
  check(
    'pinned-runtime',
    nodeVersion === appNodeVersion &&
      packageJson.packageManager === 'yarn@1.22.15' &&
      Object.values(jobs).every(job =>
        (job.steps || []).some(
          step => step.uses === 'actions/setup-node@v4' && step.with?.['node-version-file'] === '.nvmrc',
        ),
      ) &&
      Object.values(jobs).every(job =>
        (job.steps || []).some(step =>
          String(step.run || '').includes('corepack prepare yarn@1.22.15 --activate'),
        ),
      ),
    { node: nodeVersion, packageManager: packageJson.packageManager },
  );
  check(
    'browser-gates',
    [
      'npm run test:storybook:ci',
      'npm run storybook:runtime:audit',
      'npm run storybook:cross-browser',
      'npm run storybook:a11y:audit',
      'npm run storybook:a11y:baseline',
      'npm run storybook:visual:audit',
      'npm run storybook:language:runtime',
      'npm run storybook:performance:audit',
      'npm run storybook:flakiness:check',
    ].every(command => browserRuns.includes(command)),
    browserRuns.split('\n').filter(Boolean),
  );
  check(
    'browser-storybook-build-wrapper',
    jobSteps('browser-quality').some(
      step =>
        step.name === 'Build static Storybook' &&
        step.run === 'npm run storybook:local:build',
    ),
    jobSteps('browser-quality')
      .filter(step => step.name === 'Build static Storybook')
      .map(step => step.run),
  );
  check(
    'browser-artifacts',
    [
      'q01-browser-runner.json',
      'q02-story-render-report.json',
      'q03-storybook-browser-tests.json',
      'q05-visual-responsive-report.json',
      'q13-story-flakiness.json',
      'q02-story-render-failures',
      'q05-visual-actual',
      'q05-visual-failures',
    ].every(item => browserArtifacts.includes(item)),
    browserArtifacts.split('\n').filter(Boolean),
  );
  check(
    'a11y-warning-baseline',
    fs.existsSync(path.join(repoRoot, 'docs', 'accessibility-warning-baseline.json')) &&
      fs.existsSync(path.join(repoRoot, 'docs', 'storybook-flakiness-baseline.json')),
    ['docs/accessibility-warning-baseline.json', 'docs/storybook-flakiness-baseline.json'],
  );
  check(
    'release-rehearsal-scope',
    ['npm run release:ds-only', 'npm run consumers:ds-only', 'npm run compatibility:react'].every(
      command => releaseRuns.includes(command),
    ),
    releaseRuns.split('\n').filter(Boolean),
  );
  check(
    'documentation-and-github-readiness',
    [
      'npm run docs:r09:generate',
      'npm run quality:r09',
      'npm run quality:r10',
    ].every(command => allRuns.includes(command)),
    runCommands.filter(command => /r09|r10/.test(command.run)),
  );
  check(
    'quality-gate-order',
    qualityRuns.indexOf('audit-component-story-coverage.js') < qualityRuns.indexOf('npm run docs:r09:generate') &&
      qualityRuns.indexOf('npm run docs:r09:generate') < qualityRuns.indexOf('npm run quality:r09') &&
      qualityRuns.indexOf('npm run quality:r09') < qualityRuns.indexOf('npm run quality:r10'),
    'coverage -> documentation generation -> documentation gate -> GitHub readiness',
  );
  check(
    'supply-chain-gates',
    ['npm run security:r08:audit', 'npm run quality:r08'].every(command => allRuns.includes(command)),
    runCommands.filter(command => /r08/.test(command.run)),
  );
  check(
    'no-continue-on-error',
    !source.includes('continue-on-error'),
    'No continue-on-error key is present.',
  );
  check(
    'no-publication',
    !/(?:npm(?:\.cmd)?|yarn)\s+publish\b|release:ci\b|npm\s+run\s+release:(?!ds-only)/.test(
      allRuns,
    ),
    'Quality workflow contains rehearsals only; no package publication command.',
  );

  const unresolvedScripts = [];
  for (const command of runCommands) {
    for (const match of command.run.matchAll(/npm(?:\.cmd)?\s+run\s+([\w:-]+)/g)) {
      if (!packageJson.scripts?.[match[1]]) unresolvedScripts.push(`${command.job}:${match[1]}`);
    }
  }
  check('local-command-contract', unresolvedScripts.length === 0, unresolvedScripts);

  const failed = checks.filter(item => item.status === 'failed');
  const report = {
    status: failed.length ? 'failed' : 'passed',
    generatedAt: new Date().toISOString(),
    workflow: '.github/workflows/quality.yml',
    node: nodeVersion,
    packageManager: packageJson.packageManager,
    checks,
    failedChecks: failed.map(item => item.id),
    remoteExecution: 'pending-first-GitHub-run',
    publicationPerformed: false,
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`CI quality contract: ${report.status}`);
  console.log(`Checks: ${checks.length - failed.length}/${checks.length}`);
  console.log(`Report: ${reportPath}`);
  if (failed.length) process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
}
