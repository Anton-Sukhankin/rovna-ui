const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const runner = path.join(appRoot, 'scripts', 'run-storybook-browser-tests.js');
const reportPath = path.join(repoRoot, 'docs', 'q07-cross-browser-report.json');
const riskTargets = [
  'packages/tend-ui-primitives/src/Button/Button.stories.tsx',
  'packages/tend-ui-primitives/src/Drawer/Drawer.stories.tsx',
  'packages/tend-ui/src/primitives/Select/Select.stories.tsx',
  'packages/tend-ui/src/primitives/Modal/Modal.stories.tsx',
  'packages/tend-ui-filters/src/Filters.stories.tsx',
  'packages/tend-ui-table/src/Table/Table.stories.tsx',
  'packages/tend-ui-table/src/Table/components/ContextMenu/ContextMenu.stories.tsx',
  'packages/tend-ui-columns-settings/src/components/DrawerColumnsSettings/DrawerColumnsSettings.stories.tsx',
  'packages/tend-ui-tree/src/Tree.stories.tsx',
  'packages/tend-ui-upload/src/UploadArea.stories.tsx',
  'packages/tend-ui-header/src/SamoletHeader/SamoletHeader.stories.tsx',
  'packages/tend-ui-grid/src/Row/Row.stories.tsx',
  'packages/tend-ui-grid/src/Col/Col.stories.tsx',
  'packages/tend-ui/src/typography/Typography.stories.tsx',
  'packages/tend-ui/src/ui/ErrorOverlay/ErrorOverlay.stories.tsx',
  'packages/tend-ui/src/ui/EmptyOverlay/EmptyOverlay.stories.tsx',
  'packages/tend-ui/src/components/ComponentPicker/ComponentPicker.stories.tsx',
  'packages/tend-ui/src/components/AsyncSelect/AsyncSelect.stories.tsx',
];
const matrix = [
  { browser: 'chromium', files: [], scope: 'full catalog' },
  { browser: 'webkit', files: riskTargets, scope: 'Tier 1, R-01/R-03 and mobile-sensitive interactions' },
  { browser: 'firefox', files: riskTargets, scope: 'Tier 1, R-01/R-03 and mobile-sensitive interactions' },
];

function main() {
  const startedAt = Date.now();
  const results = [];
  for (const target of matrix) {
    const { browser, files, scope } = target;
    const output = path.join(repoRoot, 'tmp', `q07-${browser}.json`);
    fs.rmSync(output, { force: true });
    const targetStartedAt = Date.now();
    const result = spawnSync(
      process.execPath,
      [
        runner,
        `--browser=${browser}`,
        ...files.map(file => `--file=${file}`),
        `--report=${output}`,
      ],
      {
        cwd: appRoot,
        encoding: 'utf8',
        env: {
          ...process.env,
          COREPACK_ENABLE_NETWORK: '0',
          Q_USE_PLAYWRIGHT_BUNDLED_BROWSER: browser === 'chromium' ? '0' : '1',
          MOZ_DISABLE_CONTENT_SANDBOX: browser === 'firefox' ? '1' : process.env.MOZ_DISABLE_CONTENT_SANDBOX,
          MOZ_DISABLE_GMP_SANDBOX: browser === 'firefox' ? '1' : process.env.MOZ_DISABLE_GMP_SANDBOX,
          MOZ_DISABLE_RDD_SANDBOX: browser === 'firefox' ? '1' : process.env.MOZ_DISABLE_RDD_SANDBOX,
          STORYBOOK_DISABLE_TELEMETRY: '1',
          npm_config_offline: 'true',
        },
        maxBuffer: 100 * 1024 * 1024,
      },
    );
    let testReport = null;
    const reportFresh =
      fs.existsSync(output) && fs.statSync(output).mtimeMs >= targetStartedAt - 1_000;
    if (reportFresh) {
      try {
        const parsed = JSON.parse(fs.readFileSync(output, 'utf8'));
        testReport = {
          numTotalTestSuites: parsed.numTotalTestSuites,
          numPassedTestSuites: parsed.numPassedTestSuites,
          numFailedTestSuites: parsed.numFailedTestSuites,
          numTotalTests: parsed.numTotalTests,
          numPassedTests: parsed.numPassedTests,
          numFailedTests: parsed.numFailedTests,
        };
      } catch (error) {
        testReport = {
          parseError: error instanceof Error ? error.message : String(error),
        };
      }
    }
    results.push({
      browser,
      scope,
      files,
      status: result.status === 0 && reportFresh ? 'passed' : 'failed',
      exitCode: result.status,
      reportFresh,
      testReport,
      outputTail: `${result.stdout || ''}${result.stderr || ''}`.trim().slice(-4000),
    });
    console.log(
      `${browser}: ${result.status === 0 && reportFresh ? 'passed' : 'failed'}`,
    );
  }
  const failed = results.filter(result => result.status === 'failed');
  const passedBrowsers = new Set(
    results.filter(result => result.status === 'passed').map(result => result.browser),
  );
  const report = {
    status: failed.length ? 'failed' : 'passed',
    generatedAt: new Date().toISOString(),
    durationMs: Date.now() - startedAt,
    browsers: ['chromium', 'webkit', 'firefox'],
    browserStatus: {
      chromium: passedBrowsers.has('chromium') ? 'verified-full-catalog' : 'failed',
      webkit: passedBrowsers.has('webkit') ? 'verified-risk-suite' : 'failed',
      firefox: passedBrowsers.has('firefox') ? 'verified-risk-suite' : 'failed',
    },
    inputModes: [
      'keyboard through play functions',
      'pointer through play functions',
      'keyboard drag-and-drop',
      'file input through userEvent',
    ],
    scope: 'Chromium full catalog plus WebKit and Firefox risk suites',
    riskFiles: riskTargets.length,
    environmentMitigations: [
      {
        browser: 'firefox',
        scope: 'local headless test process only',
        reason: 'Managed Windows environment blocked the Firefox tab subprocess before Storybook loaded.',
        settings: ['MOZ_DISABLE_CONTENT_SANDBOX=1', 'MOZ_DISABLE_GMP_SANDBOX=1', 'MOZ_DISABLE_RDD_SANDBOX=1'],
        externalNetwork: 'disabled by the Storybook test harness',
      },
    ],
    providerLimitations: [],
    checks: results.length,
    passed: results.length - failed.length,
    failed: failed.length,
    results,
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Cross-browser suite: ${report.status}`);
  console.log(`Checks: ${report.passed}/${report.checks}`);
  console.log(`Report: ${reportPath}`);
  if (failed.length) process.exitCode = 1;
}

main();
