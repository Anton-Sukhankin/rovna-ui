const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const inventoryPath = path.join(repoRoot, 'docs', 'storybook-network-inventory.json');
const runtimeReportPath = path.join(repoRoot, 'tmp', 'q02-story-render-report.json');

function run(script, args = []) {
  const result = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: appRoot,
    encoding: 'utf8',
    env: {
      ...process.env,
      COREPACK_ENABLE_NETWORK: '0',
      STORYBOOK_DISABLE_TELEMETRY: '1',
      npm_config_offline: 'true',
    },
    maxBuffer: 100 * 1024 * 1024,
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  return result;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function main() {
  const runtimeArgs = process.argv.slice(2);
  const reportOnly = runtimeArgs.includes('--report-only');
  const sourceAudit = run('audit-storybook-network-dependencies.js');
  if (sourceAudit.status !== 0 || !fs.existsSync(inventoryPath)) {
    throw new Error('Static Storybook network inventory could not be generated.');
  }

  const inventory = readJson(inventoryPath);
  if (inventory.summary.closedUrlFindings > 0) {
    throw new Error(
      `Network policy rejected ${inventory.summary.closedUrlFindings} likely closed URL finding(s).`,
    );
  }

  if (runtimeArgs.includes('--static-only')) {
    console.log('Storybook network policy: passed (static-only).');
    return;
  }

  const runtimeResult = reportOnly
    ? null
    : run(
        'audit-storybook-runtime.js',
        runtimeArgs.filter(
          argument => argument !== '--static-only' && argument !== '--report-only',
        ),
      );
  if (!fs.existsSync(runtimeReportPath)) {
    throw new Error('Runtime Storybook audit did not create its report.');
  }

  const runtimeReport = readJson(runtimeReportPath);
  const externalResults = (runtimeReport.results || [])
    .map(result => ({ ...result, externalRequests: result.externalRequests || [] }))
    .filter(result => result.externalRequests.length);
  if (externalResults.length > 0) {
    const examples = externalResults
      .slice(0, 10)
      .map(result => `${result.id}: ${result.externalRequests.join(', ')}`)
      .join('\n');
    throw new Error(
      `Network policy blocked external requests in ${externalResults.length} Storybook entries.\n${examples}`,
    );
  }
  if ((runtimeResult && runtimeResult.status !== 0) || runtimeReport.status !== 'passed') {
    throw new Error('Storybook runtime audit failed; see tmp/q02-story-render-report.json.');
  }

  console.log(
    `Storybook network policy: passed (${runtimeReport.entries} entries, zero external runtime requests).`,
  );
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
