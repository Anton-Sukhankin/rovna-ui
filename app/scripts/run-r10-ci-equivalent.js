const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const reportPath = path.join(repoRoot, 'docs', 'r10-local-ci-equivalent.json');
const commands = [
  ['ci-contract', ['scripts/check-quality-workflow.js']],
  ['branding-contract', ['scripts/check-branding.js']],
  ['lint', ['scripts/run-eslint.js', '--quiet']],
  ['storybook-config', ['scripts/check-storybook-quality-config.js']],
  ['storybook-language', ['scripts/check-storybook-language.js']],
  ['storybook-static', ['scripts/check-storybook-static-assets.js']],
  ['ds-only-gate', ['scripts/run-ds-only-quality-gate.js']],
  ['component-story-coverage', ['scripts/audit-component-story-coverage.js']],
  ['documentation-generation', ['scripts/generate-r09-documentation.js']],
  ['documentation', ['scripts/check-r09-documentation.js']],
  ['agent-governance', ['scripts/check-agent-governance.js']],
  ['security-supply-chain', ['scripts/check-r08-security-supply-chain.js']],
  ['public-api', ['scripts/check-r06-public-api.js']],
  ['artifacts-performance', ['scripts/check-r07-artifacts-performance.js']],
  ['github-readiness', ['scripts/check-r10-github-ready.js']],
];

function main() {
  const results = [];
  for (const [id, args] of commands) {
    const startedAt = Date.now();
    console.log(`\n[R-10 local CI] ${id}`);
    const result = spawnSync(process.execPath, args, {
      cwd: appRoot,
      encoding: 'utf8',
      stdio: 'inherit',
      maxBuffer: 64 * 1024 * 1024,
    });
    results.push({
      id,
      command: `node ${args.join(' ')}`,
      status: result.status === 0 ? 'passed' : 'failed',
      exitCode: result.status,
      durationMs: Date.now() - startedAt,
    });
    if (result.status !== 0) break;
  }

  const failed = results.filter(item => item.status === 'failed');
  const report = {
    status: failed.length === 0 && results.length === commands.length ? 'passed' : 'failed',
    generatedAt: new Date().toISOString(),
    commandsPlanned: commands.length,
    commandsCompleted: results.length,
    passed: results.filter(item => item.status === 'passed').length,
    failed: failed.length,
    results,
    scope:
      'Local structural/static CI equivalent. Full browser, release rehearsal and consumer matrices remain explicit remote jobs and R-11 final acceptance commands.',
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`\nR-10 local CI equivalent: ${report.status}`);
  console.log(`Commands: ${report.passed}/${commands.length}`);
  console.log(`Report: ${reportPath}`);
  if (report.status !== 'passed') process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
}
