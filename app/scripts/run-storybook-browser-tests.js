const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const defaultReportPath = path.join(repoRoot, 'tmp', 'q03-storybook-browser-tests.json');
const runnerReportPath = path.join(repoRoot, 'tmp', 'q01-browser-runner.json');
const storybookIndexPath = path.join(appRoot, 'storybook-static', 'index.json');
const isWindows = process.platform === 'win32';

function parseArgs(argv) {
  const options = {
    browser: 'chromium',
    coverage: false,
    diagnostic: false,
    files: [],
    reportPath: defaultReportPath,
    watch: false,
  };

  for (const argument of argv) {
    if (argument === '--coverage') options.coverage = true;
    else if (argument === '--diagnostic') options.diagnostic = true;
    else if (argument === '--watch') options.watch = true;
    else if (argument.startsWith('--browser=')) options.browser = argument.slice(10);
    else if (argument.startsWith('--drive=')) options.drive = argument.slice(8).toUpperCase();
    else if (argument.startsWith('--file=')) options.files.push(argument.slice(7));
    else if (argument.startsWith('--report=')) {
      options.reportPath = path.resolve(repoRoot, argument.slice(9));
    } else if (argument.startsWith('--test-name=')) options.testName = argument.slice(12);
    else throw new Error(`Unknown browser-test argument: ${argument}`);
  }

  if (!['chromium', 'firefox', 'webkit'].includes(options.browser)) {
    throw new Error(`Unsupported browser: ${options.browser}`);
  }
  if (options.drive && !/^[A-Z]:$/.test(options.drive)) {
    throw new Error(`Invalid subst drive: ${options.drive}`);
  }

  return options;
}

function selectDrive(preferredDrive) {
  const candidates = preferredDrive
    ? [preferredDrive]
    : ['T:', 'U:', 'V:', 'W:', 'X:', 'Y:', 'Z:'];
  const drive = candidates.find(candidate => !fs.existsSync(`${candidate}\\`));
  if (!drive) throw new Error(`No free subst drive found in: ${candidates.join(', ')}`);
  return drive;
}

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    encoding: 'utf8',
    maxBuffer: 100 * 1024 * 1024,
    ...options,
  });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function getCatalog() {
  if (!fs.existsSync(storybookIndexPath)) {
    throw new Error('Static Storybook index is missing. Run storybook:local:build first.');
  }

  const entries = Object.values(readJson(storybookIndexPath).entries || {}).filter(
    entry => entry.type === 'story',
  );
  const files = [
    ...new Set(
      entries
        .map(entry => entry.importPath?.replace(/^\.\//, ''))
        .filter(filePath => filePath && /\.stories\.[cm]?[jt]sx?$/.test(filePath)),
    ),
  ].sort();

  return { entries, files };
}

function sumReports(reports, key) {
  return reports.reduce((total, report) => total + Number(report[key] || 0), 0);
}

function mergeVitestReports(reports, expectedEntries) {
  if (!reports.length) throw new Error('No Vitest batch reports were produced.');

  const countKeys = [
    'numTotalTestSuites',
    'numPassedTestSuites',
    'numFailedTestSuites',
    'numPendingTestSuites',
    'numTotalTests',
    'numPassedTests',
    'numFailedTests',
    'numPendingTests',
    'numTodoTests',
  ];
  const merged = {
    ...reports[0],
    testResults: reports.flatMap(report => report.testResults || []),
    startTime: Math.min(...reports.map(report => Number(report.startTime || Date.now()))),
  };
  countKeys.forEach(key => {
    merged[key] = sumReports(reports, key);
  });

  const expectedIds = expectedEntries.map(entry => entry.id).sort();
  const actualIds = merged.testResults
    .flatMap(result => result.assertionResults || [])
    .map(assertion => assertion.meta?.storyId)
    .filter(Boolean)
    .sort();
  const actualCounts = actualIds.reduce((counts, id) => {
    counts.set(id, (counts.get(id) || 0) + 1);
    return counts;
  }, new Map());
  const missingStoryIds = expectedIds.filter(id => !actualCounts.has(id));
  const duplicateStoryIds = [...actualCounts.entries()]
    .filter(([, count]) => count > 1)
    .map(([id]) => id);
  const unexpectedStoryIds = actualIds.filter(id => !expectedIds.includes(id));

  merged.catalogCoverage = {
    expectedStories: expectedIds.length,
    actualStories: actualIds.length,
    missingStoryIds,
    duplicateStoryIds,
    unexpectedStoryIds,
  };
  merged.success =
    reports.every(report => report.success !== false) &&
    merged.numFailedTestSuites === 0 &&
    merged.numFailedTests === 0 &&
    missingStoryIds.length === 0 &&
    duplicateStoryIds.length === 0 &&
    unexpectedStoryIds.length === 0;

  return merged;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  fs.mkdirSync(path.dirname(options.reportPath), { recursive: true });
  fs.mkdirSync(path.dirname(runnerReportPath), { recursive: true });

  let drive = null;
  let mapped = false;
  let runtimeRoot = appRoot;
  let runtimeReportPath = options.reportPath;
  let result = null;
  let batchSummary = null;
  const startedAt = Date.now();

  try {
    if (isWindows) {
      drive = selectDrive(options.drive);
      const subst = run('subst.exe', [drive, repoRoot]);
      if (subst.status !== 0) {
        throw new Error(`subst failed: ${subst.stderr || subst.stdout || subst.error?.message}`);
      }
      runtimeRoot = path.join(drive, 'app');
      mapped = true;
    }

    if (!options.watch && !options.diagnostic) {
      runtimeReportPath = path.join(runtimeRoot, '.q-reports', path.basename(options.reportPath));
      fs.mkdirSync(path.dirname(runtimeReportPath), { recursive: true });
    }

    const executable = isWindows
      ? path.join(runtimeRoot, 'node_modules', '.bin', 'vitest.cmd')
      : path.join(runtimeRoot, 'node_modules', '.bin', 'vitest');
    const environment = {
      ...process.env,
      COREPACK_ENABLE_NETWORK: '0',
      Q_STORYBOOK_BROWSER: options.browser,
      Q_STORYBOOK_RUNTIME_ROOT: runtimeRoot,
      STORYBOOK_DISABLE_TELEMETRY: '1',
      npm_config_offline: 'true',
    };
    const runOptions = {
      cwd: `${runtimeRoot}${path.sep}`,
      env: environment,
      shell: isWindows,
      stdio: options.watch ? 'inherit' : 'pipe',
    };
    const baseArgs = ['--project=storybook'];
    if (!options.watch) baseArgs.push('--run');
    if (options.coverage) baseArgs.push('--coverage');
    if (options.testName) baseArgs.push('-t', options.testName);

    const shouldBatch = !options.watch && !options.diagnostic && !options.files.length;
    if (shouldBatch) {
      const catalog = getCatalog();
      const batchSize = Math.max(1, Number(process.env.Q_STORYBOOK_BATCH_SIZE || 12));
      const batchRoot = path.join(path.dirname(runtimeReportPath), 'storybook-browser-batches');
      fs.mkdirSync(batchRoot, { recursive: true });
      const processResults = [];
      const reports = [];

      for (let offset = 0; offset < catalog.files.length; offset += batchSize) {
        const batchNumber = processResults.length + 1;
        const files = catalog.files.slice(offset, offset + batchSize);
        const batchReportPath = path.join(batchRoot, `batch-${batchNumber}.json`);
        const batchResult = run(
          executable,
          [...baseArgs, ...files, '--reporter=json', `--outputFile=${batchReportPath}`],
          runOptions,
        );
        processResults.push(batchResult);
        if (fs.existsSync(batchReportPath)) reports.push(readJson(batchReportPath));
        if (batchResult.status !== 0) break;
      }

      const mergedReport = mergeVitestReports(reports, catalog.entries);
      fs.writeFileSync(runtimeReportPath, `${JSON.stringify(mergedReport, null, 2)}\n`);
      const allProcessesPassed =
        processResults.length === Math.ceil(catalog.files.length / batchSize) &&
        processResults.every(item => item.status === 0);
      result = {
        status: allProcessesPassed && mergedReport.success ? 0 : 1,
        signal: processResults.find(item => item.signal)?.signal || null,
        error: processResults.find(item => item.error)?.error || null,
        stdout: processResults.map(item => item.stdout || '').join('\n'),
        stderr: processResults.map(item => item.stderr || '').join('\n'),
      };
      batchSummary = {
        batchSize,
        batches: processResults.length,
        files: catalog.files.length,
        ...mergedReport.catalogCoverage,
      };
    } else {
      const args = [...baseArgs];
      if (options.files.length) args.push(...options.files);
      if (options.diagnostic) {
        args.push('--reporter=verbose');
      } else if (!options.watch) {
        args.push('--reporter=json', `--outputFile=${runtimeReportPath}`);
      }
      result = run(executable, args, runOptions);
    }

    if (!options.watch && !options.diagnostic && fs.existsSync(runtimeReportPath)) {
      fs.copyFileSync(runtimeReportPath, options.reportPath);
      fs.rmSync(path.dirname(runtimeReportPath), { force: true, recursive: true });
    }
  } finally {
    if (mapped) run('subst.exe', [drive, '/D']);
  }

  const report = {
    status: result?.status === 0 ? 'passed' : 'failed',
    browser: options.browser,
    coverage: options.coverage,
    diagnostic: options.diagnostic,
    files: options.files,
    testName: options.testName || null,
    sourceRoot: appRoot,
    runtimeRoot,
    pathStrategy: isWindows ? 'temporary-subst-drive' : 'direct-local-path',
    drive,
    driveReleased: drive ? !fs.existsSync(`${drive}\\`) : true,
    durationMs: Date.now() - startedAt,
    batchSummary,
    exitCode: result?.status ?? null,
    signal: result?.signal || null,
    error: result?.error?.message || null,
    outputTail: `${result?.stdout || ''}${result?.stderr || ''}`.trim().slice(-12000),
    testReport: options.watch || options.diagnostic ? null : options.reportPath,
  };
  fs.writeFileSync(runnerReportPath, `${JSON.stringify(report, null, 2)}\n`);

  if (!options.watch) {
    if (result?.stdout) process.stdout.write(result.stdout);
    if (result?.stderr) process.stderr.write(result.stderr);
  }
  console.log(`Q Storybook browser runner: ${report.status}`);
  console.log(`Browser: ${report.browser}`);
  console.log(`Drive released: ${report.driveReleased ? 'yes' : 'no'}`);
  console.log(`Runner report: ${runnerReportPath}`);
  if (!options.watch && !options.diagnostic) console.log(`Test report: ${options.reportPath}`);

  process.exitCode = result?.status ?? 1;
}

try {
  main();
} catch (error) {
  fs.mkdirSync(path.dirname(runnerReportPath), { recursive: true });
  fs.writeFileSync(
    runnerReportPath,
    `${JSON.stringify(
      {
        status: 'failed',
        error: error instanceof Error ? error.message : String(error),
      },
      null,
      2,
    )}\n`,
  );
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
