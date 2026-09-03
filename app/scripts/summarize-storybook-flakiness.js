const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const runtimePath = path.join(repoRoot, 'tmp', 'q02-story-render-report.json');
const browserPath = path.join(repoRoot, 'tmp', 'q03-storybook-browser-tests.json');
const baselinePath = path.join(repoRoot, 'docs', 'storybook-flakiness-baseline.json');
const reportPath = path.join(repoRoot, 'tmp', 'q13-story-flakiness.json');

function readJson(filePath) {
  if (!fs.existsSync(filePath)) throw new Error(`Required report is missing: ${filePath}`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function main() {
  const runtime = readJson(runtimePath);
  const browser = readJson(browserPath);
  const baseline = readJson(baselinePath);
  if (!Array.isArray(runtime.results) || !Array.isArray(runtime.initialFailures)) {
    throw new Error('Q-02 report has an unexpected schema. Runtime and Vitest reports may overlap.');
  }

  const finalById = new Map(runtime.results.map(result => [result.id, result]));
  const allowedById = new Map(
    (baseline.entries || []).map(entry => [entry.storyId, entry.maxInitialFailures]),
  );
  const counters = runtime.initialFailures.map(initial => {
    const final = finalById.get(initial.id);
    return {
      storyId: initial.id,
      count: 1,
      allowed: allowedById.get(initial.id) || 0,
      recovered: final?.status === 'passed',
      finalStatus: final?.status || 'missing',
      consoleErrors: initial.consoleErrors || [],
      pageErrors: initial.pageErrors || [],
      failedRequests: initial.failedRequests || [],
      screenshot: initial.screenshot || null,
    };
  });
  const newFlakes = counters.filter(item => item.count > item.allowed);
  const unresolved = counters.filter(item => item.finalStatus !== 'passed');
  const browserFailures = browser.numFailedTests || browser.numFailedTestSuites || 0;
  const status =
    runtime.status === 'passed' &&
    browser.success !== false &&
    browserFailures === 0 &&
    newFlakes.length === 0 &&
    unresolved.length === 0
      ? 'passed'
      : 'failed';
  const report = {
    status,
    generatedAt: new Date().toISOString(),
    policy: {
      browserRetries: 0,
      runtimeRetry:
        'One clean-context retry is diagnostic only. A new recovered failure still fails this gate.',
      baseline:
        'Only story IDs with a reviewed, proven infrastructure flake may have a non-zero allowance.',
    },
    runtime: {
      entries: runtime.entries,
      finalFailures: runtime.failed,
      initialFailures: runtime.initialFailures.length,
      retried: runtime.retried,
    },
    browser: {
      suites: browser.numTotalTestSuites ?? null,
      tests: browser.numTotalTests ?? null,
      failedSuites: browser.numFailedTestSuites ?? null,
      failedTests: browser.numFailedTests ?? null,
    },
    counters,
    newFlakes,
    unresolved,
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Storybook flakiness gate: ${status}`);
  console.log(
    `Initial failures: ${counters.length}; new flakes: ${newFlakes.length}; unresolved: ${unresolved.length}`,
  );
  console.log(`Report: ${reportPath}`);
  if (status !== 'passed') process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
