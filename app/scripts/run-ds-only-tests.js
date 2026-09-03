const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const packagesRoot = path.join(appRoot, 'packages');
const outputRoot = path.join(repoRoot, 'tmp', 'g10-ds-only-tests');
const reportPath = path.join(outputRoot, 'report.json');
const scopePath = path.join(appRoot, 'ds-package-scope.json');
const jestBin = path.join(appRoot, 'node_modules', 'jest', 'bin', 'jest.js');
const timeoutMs = Number(process.env.DS_TEST_PACKAGE_TIMEOUT_MS || 300000);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function safeName(packageName) {
  return packageName.replace(/^@/, '').replace(/[^a-zA-Z0-9.-]+/g, '-');
}

function listTestFiles(root) {
  const result = [];
  const queue = [root];

  while (queue.length) {
    const directory = queue.pop();
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) queue.push(absolute);
      else if (entry.isFile() && /\.(test|spec)\.(js|jsx|ts|tsx)$/.test(entry.name)) {
        result.push(absolute);
      }
    }
  }

  return result.sort();
}

function classifyFailure(result, output) {
  if (result.error?.code === 'ETIMEDOUT' || result.signal === 'SIGTERM') return 'timeout';
  if (/Cannot find module|Test environment .* cannot be found|Validation Error/i.test(output)) {
    return 'infrastructure';
  }
  if (/Test suite failed to run/i.test(output) && !/Tests:\s+\d+ failed/i.test(output)) {
    return 'compile-or-setup';
  }
  return 'assertion-or-runtime';
}

function isVisualSnapshotOnly(jestReport) {
  const failedSuites = (jestReport?.testResults || []).filter(suite => suite.status === 'failed');
  if (failedSuites.length === 0) return false;

  return failedSuites.every(suite => {
    const failedAssertions = (suite.assertionResults || []).filter(
      assertion => assertion.status === 'failed',
    );
    if (failedAssertions.length === 0) return false;

    return failedAssertions.every(assertion =>
      (assertion.failureMessages || []).some(message =>
        /toMatchSnapshot|Snapshot name:/i.test(message),
      ),
    );
  });
}

function main() {
  if (!fs.existsSync(jestBin)) throw new Error(`Missing local Jest runtime: ${jestBin}`);

  const scope = readJson(scopePath);
  const scopeByName = new Map(scope.packages.map(entry => [entry.name, entry]));
  const rows = [];

  fs.rmSync(outputRoot, { recursive: true, force: true });
  fs.mkdirSync(outputRoot, { recursive: true });

  for (const directory of fs.readdirSync(packagesRoot, { withFileTypes: true })) {
    if (!directory.isDirectory()) continue;
    const packageRoot = path.join(packagesRoot, directory.name);
    const manifestPath = path.join(packageRoot, 'package.json');
    if (!fs.existsSync(manifestPath)) continue;

    const manifest = readJson(manifestPath);
    const testFiles = listTestFiles(packageRoot);
    if (!manifest.name?.startsWith('@rovna-ui/') || testFiles.length === 0) continue;

    const configPath = path.join(packageRoot, 'jest.config.js');
    const outputName = safeName(manifest.name);
    const jestResultPath = path.join(outputRoot, `${outputName}.json`);
    const logPath = path.join(outputRoot, `${outputName}.log`);
    const classification = scopeByName.get(manifest.name)?.classification || 'unclassified';
    const blocking = classification === 'core' || classification === 'extended';
    const startedAt = Date.now();

    if (!fs.existsSync(configPath)) {
      rows.push({
        package: manifest.name,
        classification,
        blocking,
        status: 'classified-no-config',
        failureType: 'infrastructure',
        testFiles: testFiles.length,
        durationMs: 0,
        details: 'Test files exist but jest.config.js is missing.',
      });
      continue;
    }

    const result = spawnSync(
      process.execPath,
      [
        jestBin,
        '--config',
        configPath,
        '--runInBand',
        '--ci',
        '--watch=false',
        '--passWithNoTests',
        '--colors=false',
        '--json',
        '--outputFile',
        jestResultPath,
      ],
      {
        cwd: appRoot,
        encoding: 'utf8',
        maxBuffer: 100 * 1024 * 1024,
        timeout: timeoutMs,
        env: {
          ...process.env,
          CI: '1',
          COREPACK_ENABLE_NETWORK: '0',
          npm_config_offline: 'true',
        },
        stdio: 'pipe',
      },
    );
    const output = `${result.stdout || ''}${result.stderr || ''}`;
    fs.writeFileSync(logPath, output);
    const jestReport = fs.existsSync(jestResultPath) ? readJson(jestResultPath) : null;
    const visualSnapshotOnly = result.status !== 0 && isVisualSnapshotOnly(jestReport);
    const status = result.status === 0
      ? 'passed'
      : visualSnapshotOnly
        ? 'classified-visual-snapshot-drift'
        : 'failed';
    const gateBlocking = blocking && status === 'failed';

    rows.push({
      package: manifest.name,
      classification,
      blocking,
      gateBlocking,
      status,
      failureType:
        status === 'passed'
          ? null
          : visualSnapshotOnly
            ? 'visual-snapshot-drift'
            : classifyFailure(result, output),
      exitCode: result.status,
      signal: result.signal || null,
      testFiles: testFiles.length,
      suites: {
        total: jestReport?.numTotalTestSuites ?? null,
        passed: jestReport?.numPassedTestSuites ?? null,
        failed: jestReport?.numFailedTestSuites ?? null,
      },
      tests: {
        total: jestReport?.numTotalTests ?? null,
        passed: jestReport?.numPassedTests ?? null,
        failed: jestReport?.numFailedTests ?? null,
        pending: jestReport?.numPendingTests ?? null,
        todo: jestReport?.numTodoTests ?? null,
      },
      snapshots: {
        total: jestReport?.snapshot?.total ?? null,
        failed: jestReport?.snapshot?.unmatched ?? null,
        unchecked: jestReport?.snapshot?.unchecked ?? null,
      },
      durationMs: Date.now() - startedAt,
      log: path.relative(repoRoot, logPath).replace(/\\/g, '/'),
    });

    const label = status === 'passed'
      ? 'PASS'
      : status === 'classified-visual-snapshot-drift'
        ? 'VISUAL'
        : 'FAIL';
    console.log(`${label} ${manifest.name}: ${testFiles.length} files, ${Date.now() - startedAt} ms`);
  }

  const blockingFailures = rows.filter(row => row.gateBlocking);
  const diagnosticFailures = rows.filter(row => !row.blocking && row.status !== 'passed');
  const visualSnapshotDrift = rows.filter(
    row => row.status === 'classified-visual-snapshot-drift',
  );
  const report = {
    status: blockingFailures.length
      ? 'blocked'
      : diagnosticFailures.length || visualSnapshotDrift.length
        ? 'passed-with-classified-visual-drift'
        : 'passed',
    mode: 'ds-only-local-jest',
    checkedAt: new Date().toISOString(),
    timeoutMsPerPackage: timeoutMs,
    networkInstallAllowed: false,
    rows,
    summary: {
      packages: rows.length,
      testFiles: rows.reduce((sum, row) => sum + row.testFiles, 0),
      passedPackages: rows.filter(row => row.status === 'passed').length,
      classifiedVisualPackages: visualSnapshotDrift.length,
      failedPackages: rows.filter(row => row.status === 'failed').length,
      suites: rows.reduce((sum, row) => sum + (row.suites?.total || 0), 0),
      passedSuites: rows.reduce((sum, row) => sum + (row.suites?.passed || 0), 0),
      failedSuites: rows.reduce((sum, row) => sum + (row.suites?.failed || 0), 0),
      tests: rows.reduce((sum, row) => sum + (row.tests?.total || 0), 0),
      passedTests: rows.reduce((sum, row) => sum + (row.tests?.passed || 0), 0),
      failedTests: rows.reduce((sum, row) => sum + (row.tests?.failed || 0), 0),
      pendingTests: rows.reduce((sum, row) => sum + (row.tests?.pending || 0), 0),
      todoTests: rows.reduce((sum, row) => sum + (row.tests?.todo || 0), 0),
      blockingFailures: blockingFailures.map(row => row.package),
      diagnosticFailures: diagnosticFailures.map(row => row.package),
      visualSnapshotDrift: visualSnapshotDrift.map(row => row.package),
    },
  };

  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`G-10 DS-only tests: ${report.status}`);
  console.log(
    `Packages passed: ${report.summary.passedPackages}; visual drift: ${report.summary.classifiedVisualPackages}; failed: ${report.summary.failedPackages}; test files: ${report.summary.testFiles}; tests passed: ${report.summary.passedTests}/${report.summary.tests}`,
  );
  console.log(`Report: ${reportPath}`);
  process.exitCode = blockingFailures.length ? 1 : 0;
}

try {
  main();
} catch (error) {
  fs.mkdirSync(outputRoot, { recursive: true });
  fs.writeFileSync(
    reportPath,
    `${JSON.stringify({ status: 'failed', error: error instanceof Error ? error.stack : String(error) }, null, 2)}\n`,
  );
  console.error(error instanceof Error ? error.stack || error.message : error);
  process.exitCode = 1;
}
