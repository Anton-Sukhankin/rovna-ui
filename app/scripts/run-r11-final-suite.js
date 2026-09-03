const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const reportPath = path.join(repoRoot, 'docs', 'r11-execution.json');
const supportedPackageReportPath = path.join(repoRoot, 'tmp', 'g07-supported-package-gate.json');

const evidenceDefinitions = {
  'storybook-build': {
    path: path.join(repoRoot, 'tmp', 'g05-storybook-static-build.json'),
    passed: report => report.status === 'passed' && report.buildExitCode === 0,
  },
  'final-baseline': {
    path: path.join(repoRoot, 'docs', 'r11-final-baseline.json'),
    passed: report =>
      report.status === 'captured' &&
      report.storybook?.entries > 0 &&
      report.packages?.supported === report.packages?.passed,
  },
  'storybook-static-integrity': {
    path: path.join(repoRoot, 'tmp', 'storybook-static-asset-audit.json'),
    passed: report => report.status === 'passed' && report.missing?.length === 0,
  },
  'storybook-runtime-full': {
    path: path.join(repoRoot, 'tmp', 'q02-story-runtime-report.json'),
    passed: report =>
      report.status === 'passed' && report.failed === 0 && report.passed === report.entries,
  },
  'storybook-browser-chromium': {
    path: path.join(repoRoot, 'tmp', 'q01-browser-runner.json'),
    passed: report => report.status === 'passed' && report.exitCode === 0,
  },
  'component-runtime-sync': {
    path: path.join(repoRoot, 'docs', 'component-runtime-audit.json'),
    passed: report => report.status === 'passed' && report.summary?.failed === 0,
  },
  'storybook-network-policy': {
    path: path.join(repoRoot, 'docs', 'storybook-network-inventory.json'),
    passed: report =>
      report.summary?.closedUrlFindings === 0 && report.summary?.externalRuntimeUrlFindings === 0,
  },
  'storybook-flakiness': {
    path: path.join(repoRoot, 'tmp', 'q13-story-flakiness.json'),
    passed: report => report.status === 'passed' && report.unresolved?.length === 0,
  },
  'interaction-matrix': {
    path: path.join(repoRoot, 'docs', 'storybook-interaction-matrix.json'),
    passed: report => report.summary?.storyCount > 0 && report.stories?.length === report.summary.storyCount,
  },
  'r03-interaction-reliability': {
    path: path.join(repoRoot, 'docs', 'r03-interaction-reliability.json'),
    passed: report =>
      report.status === 'passed' &&
      report.summary?.failedOperations === 0 &&
      report.summary?.pendingTests === 0,
  },
  'storybook-a11y-full': {
    path: path.join(repoRoot, 'docs', 'accessibility-full-report.json'),
    passed: report =>
      report.status === 'passed' &&
      report.summary?.failedAudits === 0 &&
      report.summary?.storiesWithViolations === 0,
  },
  'react-compatibility': {
    path: path.join(repoRoot, 'docs', 'react-compatibility.json'),
    passed: report =>
      report.status === 'runtime-passed' &&
      report.rows?.length === 3 &&
      report.rows.every(row =>
        row.install === 'passed' && row.build === 'passed' && row.domSmoke === 'passed'
      ),
  },
};

const steps = [
  ['ci-contract', 'check-quality-workflow.js'],
  ['branding-contract', 'check-branding.js'],
  ['lint', 'run-eslint.js', '--quiet'],
  ['storybook-interaction-config', 'check-storybook-interactions.js'],
  ['storybook-language-static', 'check-storybook-language.js'],
  ['storybook-quality-config', 'check-storybook-quality-config.js'],
  ['supported-package-build', 'run-supported-package-gate.js'],
  ['storybook-build', 'build-storybook-local.js'],
  ['final-baseline', 'capture-r11-final-baseline.js'],
  ['storybook-static-integrity', 'check-storybook-static-assets.js'],
  ['storybook-runtime-full', 'audit-storybook-runtime.js'],
  ['storybook-browser-chromium', 'run-storybook-browser-tests.js'],
  ['component-runtime-sync', 'sync-component-runtime-report.js'],
  ['storybook-network-policy', 'check-storybook-network-policy.js', '--report-only'],
  ['storybook-flakiness', 'summarize-storybook-flakiness.js'],
  ['interaction-matrix', 'generate-q-interaction-matrix.js'],
  ['r03-interaction-reliability', 'check-r03-interaction-reliability.js'],
  ['storybook-a11y-full', 'audit-storybook-accessibility.js'],
  ['storybook-a11y-baseline', 'check-accessibility-warning-baseline.js'],
  ['r04-accessibility-review', 'check-r04-accessibility-review.js'],
  ['r04-assistive-modes', 'audit-r04-assistive-modes.js'],
  ['storybook-visual', 'audit-storybook-visual-responsive.js'],
  ['storybook-responsive', 'audit-storybook-responsive-layout.js'],
  ['storybook-input-modes', 'audit-storybook-input-modes.js'],
  ['storybook-cross-browser', 'run-storybook-cross-browser-suite.js'],
  ['storybook-language-runtime', 'audit-storybook-runtime-language.js'],
  ['storybook-performance', 'audit-storybook-performance.js'],
  ['unit-integration', 'run-ds-only-tests.js'],
  ['r05-visual-browser', 'check-r05-visual-browser.js'],
  ['release-rehearsal', 'run-ds-only-release-rehearsal.js', '--reuse-supported-build'],
  ['consumer-matrix', 'run-ds-only-consumer-gate.js', '--reuse-tarball'],
  ['react-compatibility', 'check-react-compatibility.js'],
  ['public-api-audit', 'audit-public-api.js'],
  ['types-consumer', 'check-r06-types-consumer.js'],
  ['bundler-consumers', 'run-r06-bundler-consumers.js'],
  ['r06-public-api', 'check-r06-public-api.js'],
  ['artifact-audit', 'audit-r07-package-artifacts.js'],
  ['tree-shaking', 'check-r07-tree-shaking.js'],
  ['r07-artifacts-performance', 'check-r07-artifacts-performance.js'],
  ['public-dependency-audit', 'audit-r08-public-dependencies.js', '--verify'],
  ['source-snapshot', 'audit-github-source-snapshot.js'],
  ['security-supply-chain-inventory', 'audit-r08-security-supply-chain.js'],
  ['local-compensation-security', 'check-r08-local-compensations.js'],
  ['r08-security-supply-chain', 'check-r08-security-supply-chain.js'],
  ['ds-only-aggregate', 'run-ds-only-quality-gate.js'],
  ['component-story-coverage', 'audit-component-story-coverage.js'],
  ['documentation-generation', 'generate-r09-documentation.js'],
  ['documentation-drift', 'generate-r09-documentation.js', '--check'],
  ['r09-documentation', 'check-r09-documentation.js'],
  ['agent-governance', 'check-agent-governance.js'],
  ['r10-github-readiness', 'check-r10-github-ready.js'],
];

function loadExternalEvidence(id, order) {
  const definition = id === 'supported-package-build'
    ? {
        path: supportedPackageReportPath,
        passed: report =>
          report.status === 'passed' &&
          report.selectedPackages > 0 &&
          report.passedPackages === report.selectedPackages &&
          report.failedPackages === 0,
      }
    : evidenceDefinitions[id];
  if (!definition || !fs.existsSync(definition.path)) return null;

  const report = JSON.parse(fs.readFileSync(definition.path, 'utf8').replace(/^\uFEFF/, ''));
  if (!definition.passed(report)) return null;

  return {
    order,
    id,
    command: 'node scripts/run-supported-package-gate.js (fresh external evidence)',
    status: 'passed',
    exitCode: 0,
    signal: null,
    error: null,
    durationMs: report.durationMs || 0,
    reusedFromExternalEvidence: true,
    evidencePath: path.relative(repoRoot, definition.path).replace(/\\/g, '/'),
  };
}

function writeCheckpoint(results, startedAt, fromId, failure = null) {
  const report = {
    schemaVersion: 2,
    status: failure ? 'failed' : results.length === steps.length ? 'passed' : 'incomplete',
    generatedAt: new Date().toISOString(),
    stepsPlanned: steps.length,
    stepsCompleted: results.length,
    passed: results.filter(item => item.status === 'passed').length,
    failed: results.filter(item => item.status === 'failed').length,
    failedStep: failure?.id || null,
    durationMs: Date.now() - startedAt,
    resumedFrom: fromId !== steps[0][0] ? fromId : null,
    reusedSteps: results.filter(
      item => item.reusedFromPreviousRun || item.reusedFromExternalEvidence,
    ).length,
    results,
    publicationPerformed: false,
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  return report;
}

function main() {
  const startedAt = Date.now();
  const fromArgument = process.argv.slice(2).find(argument => argument.startsWith('--from='));
  const toArgument = process.argv.slice(2).find(argument => argument.startsWith('--to='));
  const fromId = fromArgument?.slice('--from='.length) || steps[0][0];
  const toId = toArgument?.slice('--to='.length) || steps.at(-1)[0];
  const fromIndex = steps.findIndex(([id]) => id === fromId);
  const toIndex = steps.findIndex(([id]) => id === toId);
  if (fromIndex < 0) throw new Error(`Unknown R-11 resume step: ${fromId}`);
  if (toIndex < 0) throw new Error(`Unknown R-11 final step: ${toId}`);
  if (toIndex < fromIndex) throw new Error(`R-11 final step precedes resume step: ${toId}`);

  let results = [];
  if (fromIndex > 0) {
    if (!fs.existsSync(reportPath)) {
      throw new Error(`Cannot resume R-11 without an existing report: ${reportPath}`);
    }
    const previous = JSON.parse(fs.readFileSync(reportPath, 'utf8').replace(/^\uFEFF/, ''));
    results = steps.slice(0, fromIndex).map(([id], index) => {
      const previousRow = previous.results?.find(item => item.id === id);
      if (previousRow?.status === 'passed') {
        return {
          ...previousRow,
          order: index + 1,
          reusedFromPreviousRun: true,
        };
      }
      const externalEvidence = loadExternalEvidence(id, index + 1);
      if (externalEvidence) return externalEvidence;
      throw new Error(`Cannot resume R-11: prior step is not passed: ${id}`);
    });
    console.log(`Resuming R-11 from ${fromId}; reused passed steps: ${results.length}`);
  }
  let failure = null;

  for (let index = fromIndex; index <= toIndex; index += 1) {
    const [id, script, ...args] = steps[index];
    const stepStartedAt = Date.now();
    console.log(`\n[R-11 ${index + 1}/${steps.length}] ${id}`);
    const result = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
      cwd: appRoot,
      env: {
        ...process.env,
        CI: '1',
        HUSKY: '0',
        STORYBOOK_DISABLE_TELEMETRY: '1',
      },
      encoding: 'utf8',
      stdio: 'inherit',
      maxBuffer: 128 * 1024 * 1024,
      timeout: 45 * 60 * 1000,
    });
    const row = {
      order: index + 1,
      id,
      command: `node scripts/${script}${args.length ? ` ${args.join(' ')}` : ''}`,
      status: result.status === 0 ? 'passed' : 'failed',
      exitCode: result.status,
      signal: result.signal || null,
      error: result.error?.message || null,
      durationMs: Date.now() - stepStartedAt,
    };
    results.push(row);
    writeCheckpoint(results, startedAt, fromId, row.status === 'passed' ? null : row);
    if (row.status !== 'passed') {
      failure = row;
      break;
    }
  }

  const report = writeCheckpoint(results, startedAt, fromId, failure);
  const requestedBlockPassed = !failure && results.length === toIndex + 1;
  console.log(`\nR-11 execution suite: ${report.status}`);
  console.log(`Steps: ${report.passed}/${steps.length}; failed: ${report.failed}`);
  console.log(`Report: ${reportPath}`);
  if (!requestedBlockPassed) process.exitCode = 1;
}

try {
  main();
} catch (error) {
  fs.writeFileSync(
    reportPath,
    `${JSON.stringify({ status: 'failed', error: error instanceof Error ? error.stack : String(error) }, null, 2)}\n`,
  );
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
}
