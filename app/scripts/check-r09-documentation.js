const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repositoryRoot = path.resolve(appRoot, '..');
const docsRoot = path.join(repositoryRoot, 'docs');
const agentRoot = path.join(docsRoot, 'agent-context');
const generatedRoot = path.join(agentRoot, 'component-passports', 'generated');
const reportPath = path.join(docsRoot, 'r09-documentation-gate.json');
const failures = [];
const checks = [];

function check(id, condition, actual, expected) {
  const status = condition ? 'passed' : 'failed';
  checks.push({ id, status, actual, expected });
  if (!condition) failures.push(`${id}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

const generation = spawnSync(process.execPath, [path.join(__dirname, 'generate-r09-documentation.js'), '--check'], {
  cwd: appRoot,
  encoding: 'utf8',
});
check('generated-documentation-drift', generation.status === 0, generation.status, 0);

const governance = spawnSync(process.execPath, [path.join(__dirname, 'check-agent-governance.js')], {
  cwd: appRoot,
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
});
check('agent-governance', governance.status === 0, governance.status, 0);

const catalogPath = path.join(agentRoot, 'ds-catalog.json');
const coverage = readJson(path.join(docsRoot, 'component-story-coverage.json'));
const catalog = readJson(catalogPath);
const staticIndex = readJson(path.join(appRoot, 'storybook-static', 'index.json'));
const entries = Object.values(staticIndex.entries);
const generatedPassports = fs.readdirSync(generatedRoot).filter((file) => file.endsWith('.md'));

check('visual-export-count', catalog.summary.publicVisualExports === coverage.summary.publicVisualExports, catalog.summary.publicVisualExports, coverage.summary.publicVisualExports);
check('type-only-export-count', catalog.summary.reviewedTypeOnlyExports === coverage.summary.reviewedTypeOnlyExports, catalog.summary.reviewedTypeOnlyExports, coverage.summary.reviewedTypeOnlyExports);
check('storybook-group-count', catalog.summary.componentGroups === coverage.summary.storyGroups, catalog.summary.componentGroups, coverage.summary.storyGroups);
check('storybook-entry-count', catalog.summary.storybookEntries === entries.length, catalog.summary.storybookEntries, entries.length);
check('passport-count', generatedPassports.length === catalog.summary.passports, generatedPassports.length, catalog.summary.passports);
check('unclassified-groups', catalog.summary.unclassifiedStoryGroups === 0, catalog.summary.unclassifiedStoryGroups, 0);
check('uncovered-visual-exports', catalog.summary.uncoveredVisualExports === 0, catalog.summary.uncoveredVisualExports, 0);
check('a11y-violations', catalog.summary.a11yViolations === 0, catalog.summary.a11yViolations, 0);

const requiredPassportHeadings = [
  '## Package And Import',
  '## Storybook Evidence',
  '## States',
  '## Interactions',
  '## Accessibility',
  '## Dependencies',
  '## Risks',
  '## Evidence IDs',
  '## Migration Guidance',
  '## Verification Checklist',
];
const invalidPassports = [];
for (const file of generatedPassports) {
  const content = fs.readFileSync(path.join(generatedRoot, file), 'utf8');
  const missing = requiredPassportHeadings.filter((heading) => !content.includes(heading));
  if (missing.length) invalidPassports.push({ file, missing });
}
check('passport-schema', invalidPassports.length === 0, invalidPassports, []);

const requiredRoutes = [
  'documentation-index.md',
  'user-guide.md',
  'contributor-guide.md',
  'maintainer-guide.md',
  'storybook-runbook.md',
  'package-connection-guide.md',
  'agent-context/README.md',
  'agent-context/import-rules.md',
  'agent-context/ds-catalog.md',
  'agent-context/component-passports/README.md',
  'agent-context/migration-recipes/migrate-form.md',
  'agent-context/migration-recipes/migrate-drawer.md',
  'agent-context/migration-recipes/migrate-tree.md',
  'agent-context/migration-recipes/migrate-upload.md',
  'agent-context/migration-recipes/migrate-complex-table.md',
];
const missingRoutes = requiredRoutes.filter((file) => !fs.existsSync(path.join(docsRoot, file)));
check('documentation-routes', missingRoutes.length === 0, missingRoutes, []);

const linkFiles = [
  ...requiredRoutes.filter((file) => file.endsWith('.md')).map((file) => path.join(docsRoot, file)),
  path.join(repositoryRoot, 'README.md'),
  path.join(docsRoot, 'r-reports', 'r-09-documentation.md'),
];
const brokenLinks = [];
const linkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
for (const file of linkFiles.filter((item) => fs.existsSync(item))) {
  const content = fs.readFileSync(file, 'utf8');
  for (const match of content.matchAll(linkPattern)) {
    let target = match[1].trim();
    if (!target || /^(https?:|mailto:|#)/.test(target)) continue;
    target = target.replace(/^<|>$/g, '').split('#')[0];
    if (!target) continue;
    const resolved = path.resolve(path.dirname(file), decodeURIComponent(target));
    if (!fs.existsSync(resolved)) {
      brokenLinks.push({ file: path.relative(repositoryRoot, file).replace(/\\/g, '/'), target });
    }
  }
}
check('documentation-links', brokenLinks.length === 0, brokenLinks, []);

const authoritativeFiles = [
  path.join(repositoryRoot, 'README.md'),
  path.join(agentRoot, 'README.md'),
  path.join(agentRoot, 'ds-catalog.md'),
  path.join(docsRoot, 'documentation-index.md'),
  path.join(docsRoot, 'current-project-status.md'),
];
const staleMarkers = [];
for (const file of authoritativeFiles.filter((item) => fs.existsSync(item))) {
  const content = fs.readFileSync(file, 'utf8');
  for (const marker of ['949 stories', '969 public visual', 'R-00`-`R-08` завершены, следующий пакет - `R-09']) {
    if (content.includes(marker)) staleMarkers.push({ file: path.relative(repositoryRoot, file).replace(/\\/g, '/'), marker });
  }
}
check('authoritative-status-markers', staleMarkers.length === 0, staleMarkers, []);

const packageManifest = readJson(path.join(appRoot, 'package.json'));
const expectedScripts = [
  'docs:r09:generate',
  'docs:r09:check',
  'quality:r09',
  'quality:agent-governance',
  'agent:context',
  'agent:context:check',
  'artifacts:inventory',
];
const missingScripts = expectedScripts.filter((script) => !packageManifest.scripts?.[script]);
check('package-scripts', missingScripts.length === 0, missingScripts, []);

const report = {
  status: failures.length ? 'failed' : 'passed',
  generatedAt: new Date().toISOString(),
  summary: {
    checks: checks.length,
    passed: checks.filter((item) => item.status === 'passed').length,
    failed: failures.length,
    visualExports: catalog.summary.publicVisualExports,
    typeOnlyExports: catalog.summary.reviewedTypeOnlyExports,
    componentGroups: catalog.summary.componentGroups,
    passports: catalog.summary.passports,
    documentationRoutes: requiredRoutes.length,
  },
  checks,
  failures,
};
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

if (failures.length) {
  console.error('R-09 documentation gate: failed');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('R-09 documentation gate: passed');
console.log(`Checks: ${report.summary.passed}/${report.summary.checks}`);
console.log(`Exports: ${report.summary.visualExports} visual + ${report.summary.typeOnlyExports} type-only`);
console.log(`Groups/passports: ${report.summary.componentGroups}/${report.summary.passports}`);
console.log(`Report: ${reportPath}`);
