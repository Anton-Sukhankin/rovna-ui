const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const outputPath = path.join(repoRoot, 'docs', 'r05-visual-browser-gate.json');

function readJson(relativePath) {
  const filePath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(filePath)) throw new Error(`Missing R-05 artifact: ${relativePath}`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function check(assertions, id, condition, actual, expected) {
  assertions.push({ id, status: condition ? 'passed' : 'failed', actual, expected });
}

function main() {
  const indexPath = path.join(appRoot, 'storybook-static', 'index.json');
  if (!fs.existsSync(indexPath)) throw new Error('Static Storybook index is missing.');

  const currentIndexHash = crypto
    .createHash('sha256')
    .update(fs.readFileSync(indexPath))
    .digest('hex');
  const manifest = readJson('docs/q05-visual-baseline-manifest.json');
  const visual = readJson('tmp/q05-visual-responsive-report.json');
  const responsive = readJson('tmp/q06-responsive-report.json');
  const crossBrowser = readJson('docs/q07-cross-browser-report.json');
  const inputModes = readJson('docs/q07-input-modes-report.json');
  const staticBuild = readJson('tmp/g05-storybook-static-build.json');
  const unitTests = readJson('tmp/g10-ds-only-tests/report.json');
  const assertions = [];

  check(assertions, 'static-build-passed', staticBuild.status === 'passed', staticBuild.status, 'passed');
  check(assertions, 'static-story-count', staticBuild.index?.storyCount === 1022, staticBuild.index?.storyCount, 1022);
  check(assertions, 'baseline-current-index-hash', manifest.storybookIndexSha256 === currentIndexHash, manifest.storybookIndexSha256, currentIndexHash);
  check(assertions, 'visual-current-index-hash', visual.storybookIndexSha256 === currentIndexHash, visual.storybookIndexSha256, currentIndexHash);
  check(assertions, 'baseline-count', manifest.targetCount === 88 && manifest.baselineCount === 88, `${manifest.targetCount}/${manifest.baselineCount}`, '88/88');
  check(assertions, 'baseline-no-stale-files', manifest.staleBaselines?.length === 0, manifest.staleBaselines?.length, 0);
  check(assertions, 'visual-status', visual.status === 'passed', visual.status, 'passed');
  check(assertions, 'visual-checks', visual.checks === 88 && visual.passed === 88 && visual.failed === 0, `${visual.passed}/${visual.checks}; failed=${visual.failed}`, '88/88; failed=0');
  check(assertions, 'visual-diffs', visual.visualDiffs === 0, visual.visualDiffs, 0);
  check(assertions, 'visual-missing-baselines', visual.missingBaselines === 0, visual.missingBaselines, 0);
  check(assertions, 'visual-overflow', visual.overflowFindings === 0, visual.overflowFindings, 0);
  check(assertions, 'visual-stale-baselines', visual.staleBaselines?.length === 0, visual.staleBaselines?.length, 0);
  check(assertions, 'responsive-status', responsive.status === 'passed', responsive.status, 'passed');
  check(assertions, 'responsive-checks', responsive.checks === 85 && responsive.passed === 85 && responsive.failed === 0, `${responsive.passed}/${responsive.checks}; failed=${responsive.failed}`, '85/85; failed=0');
  check(assertions, 'responsive-viewports', responsive.viewportChecks === 50, responsive.viewportChecks, 50);
  check(assertions, 'responsive-zoom', responsive.zoomChecks === 10, responsive.zoomChecks, 10);
  check(assertions, 'responsive-stress', responsive.stressChecks === 25, responsive.stressChecks, 25);
  check(assertions, 'responsive-portals', responsive.portalChecks === 6, responsive.portalChecks, 6);
  check(assertions, 'responsive-overlap', responsive.overlapFindings === 0, responsive.overlapFindings, 0);
  check(assertions, 'responsive-clipped-portals', responsive.clippedPortalFindings === 0, responsive.clippedPortalFindings, 0);
  check(assertions, 'cross-browser-status', crossBrowser.status === 'passed' && crossBrowser.passed === 3 && crossBrowser.failed === 0, `${crossBrowser.status}; ${crossBrowser.passed}/${crossBrowser.checks}`, 'passed; 3/3');
  check(assertions, 'cross-browser-fresh-reports', crossBrowser.results?.every(result => result.reportFresh), crossBrowser.results?.map(result => result.reportFresh), [true, true, true]);
  check(assertions, 'chromium-full-catalog', crossBrowser.browserStatus?.chromium === 'verified-full-catalog' && crossBrowser.results?.find(result => result.browser === 'chromium')?.testReport?.numPassedTests === 1022, crossBrowser.results?.find(result => result.browser === 'chromium')?.testReport?.numPassedTests, 1022);
  check(assertions, 'webkit-risk-suite', crossBrowser.browserStatus?.webkit === 'verified-risk-suite' && crossBrowser.results?.find(result => result.browser === 'webkit')?.testReport?.numFailedTests === 0, crossBrowser.browserStatus?.webkit, 'verified-risk-suite');
  check(assertions, 'firefox-risk-suite', crossBrowser.browserStatus?.firefox === 'verified-risk-suite' && crossBrowser.results?.find(result => result.browser === 'firefox')?.testReport?.numFailedTests === 0, crossBrowser.browserStatus?.firefox, 'verified-risk-suite');
  check(assertions, 'input-modes', inputModes.status === 'passed' && inputModes.passed === 20 && inputModes.failed === 0 && inputModes.blocked === 0, `${inputModes.status}; passed=${inputModes.passed}; failed=${inputModes.failed}; blocked=${inputModes.blocked}`, 'passed; passed=20; failed=0; blocked=0');
  check(assertions, 'ds-only-packages', unitTests.status === 'passed' && unitTests.summary?.passedPackages === 22 && unitTests.summary?.failedPackages === 0, `${unitTests.status}; passed=${unitTests.summary?.passedPackages}; failed=${unitTests.summary?.failedPackages}`, 'passed; passed=22; failed=0');
  check(
    assertions,
    'ds-only-tests',
    unitTests.summary?.tests > 0
      && unitTests.summary?.passedTests === unitTests.summary?.tests
      && unitTests.summary?.failedTests === 0
      && unitTests.summary?.visualSnapshotDrift?.length === 0,
    `passed=${unitTests.summary?.passedTests}/${unitTests.summary?.tests}; failed=${unitTests.summary?.failedTests}; drift=${unitTests.summary?.visualSnapshotDrift?.length}`,
    'all discovered tests passed; failed=0; drift=0',
  );

  const failed = assertions.filter(assertion => assertion.status === 'failed');
  const report = {
    status: failed.length ? 'failed' : 'passed',
    generatedAt: new Date().toISOString(),
    storybookIndexSha256: currentIndexHash,
    checks: assertions.length,
    passed: assertions.length - failed.length,
    failed: failed.length,
    evidence: {
      visual: { checks: visual.checks, passed: visual.passed },
      responsive: { checks: responsive.checks, passed: responsive.passed },
      browsers: crossBrowser.results?.map(result => ({
        browser: result.browser,
        tests: result.testReport?.numTotalTests,
        passed: result.testReport?.numPassedTests,
        failed: result.testReport?.numFailedTests,
      })),
      inputModes: { checks: inputModes.checks, passed: inputModes.passed },
      unitTests: {
        packages: unitTests.summary?.packages,
        testFiles: unitTests.summary?.testFiles,
        tests: unitTests.summary?.tests,
        passed: unitTests.summary?.passedTests,
      },
    },
    assertions,
  };
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`R-05 visual/browser gate: ${report.status}`);
  console.log(`Checks: ${report.passed}/${report.checks}`);
  console.log(`Report: ${outputPath}`);
  if (failed.length) process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
}
