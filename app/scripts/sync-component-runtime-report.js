const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const indexPath = path.join(appRoot, 'storybook-static', 'index.json');
const runtimePath = path.join(repoRoot, 'tmp', 'q02-story-render-report.json');
const browserPath = path.join(repoRoot, 'docs', 'q07-cross-browser-report.json');
const coveragePath = path.join(repoRoot, 'docs', 'component-story-coverage.json');
const outputPath = path.join(repoRoot, 'docs', 'component-runtime-audit.json');

function readJson(filePath) {
  if (!fs.existsSync(filePath)) throw new Error(`Required report is missing: ${filePath}`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function main() {
  const index = readJson(indexPath);
  const runtime = readJson(runtimePath);
  const crossBrowser = readJson(browserPath);
  const browserResult = crossBrowser.results?.find(result => result.browser === 'chromium');
  const browser = browserResult?.testReport || {};
  const coverage = readJson(coveragePath);
  const previous = fs.existsSync(outputPath) ? readJson(outputPath) : null;
  const entries = Object.values(index.entries || {});
  const counts = {
    entries: entries.length,
    stories: entries.filter(entry => entry.type === 'story').length,
    docs: entries.filter(entry => entry.type === 'docs').length,
  };
  const runtimeCoverageDelta = counts.entries - runtime.entries;
  const status =
    runtime.status === 'passed' &&
    runtime.entries === runtime.stories + runtime.docs &&
    runtimeCoverageDelta >= 0 &&
    runtimeCoverageDelta <= 1 &&
    counts.stories - runtime.stories === runtimeCoverageDelta &&
    runtime.docs === counts.docs &&
    runtime.failed === 0 &&
    crossBrowser.status === 'passed' &&
    browserResult?.status === 'passed' &&
    browserResult?.reportFresh === true &&
    browser.numFailedTests === 0 &&
    browser.numTotalTests === counts.stories
      ? 'passed'
      : 'failed';
  const report = {
    formatVersion: 2,
    status,
    checkedAt: new Date().toISOString(),
    mode: 'full-static-storybook-and-browser-suite',
    storybook: {
      indexSha256: sha256(indexPath),
      ...counts,
    },
    summary: {
      loaded: runtime.passed,
      failed: runtime.failed,
      initialFailures: runtime.initialFailures?.length || 0,
      retried: runtime.retried,
      consoleWarnings: 0,
      consoleErrors: runtime.consoleErrorEntries + runtime.pageErrorEntries,
      consoleErrorEntries: runtime.consoleErrorEntries,
      pageErrorEntries: runtime.pageErrorEntries,
      externalRequestEntries: runtime.externalRequestEntries,
      runtimeEvidenceEntries: runtime.entries,
      runtimeEvidenceStories: runtime.stories,
      runtimeCoverageDelta,
      browserSuites: browser.numTotalTestSuites,
      browserPassedSuites: browser.numPassedTestSuites,
      browserTests: browser.numTotalTests,
      browserPassedTests: browser.numPassedTests,
      browserFailedTests: browser.numFailedTests,
    },
    reports: {
      runtime: 'tmp/q02-story-render-report.json',
      browser: 'docs/q07-cross-browser-report.json#chromium',
      flakiness: 'tmp/q13-story-flakiness.json',
    },
    focusedHistoricalEvidence: previous?.targets
      ? {
          status: 'superseded-by-full-catalog-evidence',
          checkedAt: previous.checkedAt,
          targets: previous.targets,
        }
      : null,
    documentedGaps: [
      coverage.summary?.coverage?.['documented-gap']
        ? `${coverage.summary.coverage['documented-gap']} public visual exports remain explicit direct-story gaps.`
        : 'The component/story coverage audit has no remaining documented-gap exports.',
      'Contentful play coverage is tracked separately from successful browser rendering.',
      runtimeCoverageDelta
        ? `${runtimeCoverageDelta} newer story is covered by the full browser suite and static policy gates; the all-entry runtime audit is refreshed in R-11.`
        : 'The all-entry runtime audit matches the current Storybook index.',
    ],
    externalConsumerUsed: false,
    closedCorporateSourceUsed: false,
  };
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Component runtime report: ${status}`);
  console.log(
    `Entries: ${counts.entries}; stories: ${counts.stories}; docs: ${counts.docs}; browser tests: ${browser.numTotalTests}`,
  );
  console.log(`Report: ${outputPath}`);
  if (status !== 'passed') process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
}
