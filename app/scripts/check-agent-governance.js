const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repositoryRoot = path.resolve(appRoot, '..');
const docsRoot = path.join(repositoryRoot, 'docs');
const reportPath = path.join(docsRoot, 'agent-governance-report.json');
const failures = [];
const checks = [];
const probeFailure = process.argv.includes('--probe-failure');

function relative(file) {
  return path.relative(repositoryRoot, file).replace(/\\/g, '/');
}

function read(file) {
  return fs.readFileSync(path.join(repositoryRoot, file), 'utf8');
}

function exists(file) {
  return fs.existsSync(path.join(repositoryRoot, file));
}

function check(id, condition, actual, expected) {
  const status = condition ? 'passed' : 'failed';
  checks.push({ id, status, actual, expected });
  if (!condition) failures.push(`${id}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

function walk(directory, predicate) {
  const result = [];
  if (!fs.existsSync(directory)) return result;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...walk(absolute, predicate));
    else if (!predicate || predicate(absolute)) result.push(absolute);
  }
  return result;
}

const requiredRoutes = [
  'AGENTS.md',
  'app/AGENTS.md',
  'docs/AGENTS.md',
  'docs/documentation-index.md',
  'docs/current-project-status.md',
  'docs/agent-context/README.md',
  'docs/agent-context/import-rules.md',
  'docs/agent-context/subagent-task-template.md',
  'docs/agent-context/subagent-task-example-button-story.md',
  'docs/governance/README.md',
  'docs/governance/agent-readiness.md',
  'docs/governance/fact-ownership.md',
  'docs/governance/artifact-policy.md',
  'docs/governance/artifact-policy.json',
  'docs/history/README.md',
  'docs/history/workflows/README.md',
  'docs/history/external-projects/README.md',
  'docs/history/external-projects/s-tracker/README.md',
  'docs/evidence/README.md',
  'app/scripts/get-agent-context.js',
  'app/scripts/inventory-repository-artifacts.js',
  'app/scripts/check-agent-governance.js',
];
const missingRoutes = requiredRoutes.filter(file => !exists(file));
check('required-routes', missingRoutes.length === 0, missingRoutes, []);

const sizeLimits = {
  'README.md': 12288,
  'AGENTS.md': 12288,
  'app/AGENTS.md': 12288,
  'docs/AGENTS.md': 12288,
};
const oversizedRoutes = Object.entries(sizeLimits)
  .filter(([file]) => exists(file))
  .map(([file, limit]) => ({ file, bytes: fs.statSync(path.join(repositoryRoot, file)).size, limit }))
  .filter(item => item.bytes > item.limit);
check('entrypoint-size', oversizedRoutes.length === 0, oversizedRoutes, []);

const rootAgents = read('AGENTS.md');
const requiredRootMarkers = [
  '## Boundary',
  '## Authority Order',
  '## Minimal Context Protocol',
  '## Task Routing',
  '## Generated And Evidence Files',
  '## Subagents',
  'S-Tracker',
  'fact-ownership.md',
];
const missingRootMarkers = requiredRootMarkers.filter(marker => !rootAgents.includes(marker));
check('root-agent-contract', missingRootMarkers.length === 0, missingRootMarkers, []);

const scopedContracts = {
  'app/AGENTS.md': ['Focused Source Route', 'Storybook Route', 'Test And Build Rules', 'Release Route'],
  'docs/AGENTS.md': ['Documentation Classes', 'Fact Ownership', 'Generated Documentation', 'Evidence And History'],
};
const invalidScoped = [];
for (const [file, markers] of Object.entries(scopedContracts)) {
  const content = read(file);
  const missing = markers.filter(marker => !content.includes(marker));
  if (missing.length) invalidScoped.push({ file, missing });
}
check('scoped-agent-contracts', invalidScoped.length === 0, invalidScoped, []);

const ignoredAgents = [];
for (const file of ['AGENTS.md', 'app/AGENTS.md', 'docs/AGENTS.md']) {
  const result = spawnSync(
    'git',
    ['-c', `safe.directory=${repositoryRoot}`, 'check-ignore', '-q', file],
    { cwd: repositoryRoot },
  );
  if (result.status === 0) ignoredAgents.push(file);
}
check('agent-files-not-ignored', ignoredAgents.length === 0, ignoredAgents, []);

const ownership = read('docs/governance/fact-ownership.md');
const ownershipRows = ownership
  .split(/\r?\n/)
  .filter(line => /^\| [^|-]/.test(line) && !line.startsWith('| Fact domain'))
  .map(line => line.split('|')[1].trim());
const duplicateDomains = ownershipRows.filter((domain, index) => ownershipRows.indexOf(domain) !== index);
const requiredDomains = [
  'Workspace commands and dependencies',
  'Component, story, docs and passport totals',
  'Final accepted quality',
  'Supported package artifact scope',
  'Public API surface',
  'DS-only boundary and prohibited areas',
  'Documentation class and artifact tracking',
];
const missingDomains = requiredDomains.filter(domain => !ownershipRows.includes(domain));
check('fact-ownership-domains', missingDomains.length === 0 && duplicateDomains.length === 0, { missingDomains, duplicateDomains }, { missingDomains: [], duplicateDomains: [] });

const ownerPaths = [...ownership.matchAll(/`((?:app|docs)\/[^`]+\.(?:json|md))`/g)].map(match => match[1]);
const missingOwnerPaths = [...new Set(ownerPaths)].filter(file => !exists(file));
check('fact-owner-paths', missingOwnerPaths.length === 0, missingOwnerPaths, []);

const activeFiles = [
  'README.md',
  'AGENTS.md',
  'app/AGENTS.md',
  'docs/AGENTS.md',
  'docs/documentation-index.md',
  'docs/current-project-status.md',
  'docs/agent-context/README.md',
  'docs/agent-context/import-rules.md',
  'docs/agent-context/subagent-task-template.md',
  'docs/agent-context/subagent-task-example-button-story.md',
  'docs/governance/README.md',
  'docs/governance/fact-ownership.md',
  'docs/governance/artifact-policy.md',
  'docs/evidence/README.md',
];
const stalePatterns = [
  { id: 'old-storybook-entries', regex: /\b1223\b/ },
  { id: 'old-story-count', regex: /\b1008\b/ },
  { id: 'old-doc-count', regex: /\b215\b/ },
  { id: 'old-visual-count', regex: /\b951\b/ },
  { id: 'old-type-count', regex: /\b410\b/ },
  { id: 'old-group-count', regex: /\b118\b/ },
  { id: 'old-passport-count', regex: /\b125\b/ },
  { id: 'old-f-chronology', regex: /F-13 Tarball Status|F-22 S-Tracker Integration Status/ },
  { id: 'historical-g-baseline', regex: /Исторический G-baseline/ },
];
const staleActive = [];
for (const file of activeFiles) {
  const content = read(file);
  for (const pattern of stalePatterns) {
    if (pattern.regex.test(content)) staleActive.push({ file, marker: pattern.id });
  }
}
check('active-document-staleness', staleActive.length === 0, staleActive, []);

const markdownFiles = [
  path.join(repositoryRoot, 'README.md'),
  path.join(repositoryRoot, 'AGENTS.md'),
  path.join(appRoot, 'AGENTS.md'),
  ...walk(docsRoot, file => file.endsWith('.md')),
];
const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
const brokenLinks = [];
for (const file of markdownFiles) {
  const content = fs.readFileSync(file, 'utf8');
  for (const match of content.matchAll(linkPattern)) {
    let target = match[1].trim();
    if (!target || /^(?:https?:|mailto:|data:|#)/i.test(target)) continue;
    target = target.replace(/^<|>$/g, '').split('#')[0];
    if (!target) continue;
    let decoded;
    try {
      decoded = decodeURIComponent(target);
    } catch {
      brokenLinks.push({ file: relative(file), target, reason: 'invalid encoding' });
      continue;
    }
    const resolved = path.resolve(path.dirname(file), decoded);
    if (!fs.existsSync(resolved)) brokenLinks.push({ file: relative(file), target });
  }
}
check('markdown-links', brokenLinks.length === 0, brokenLinks, []);

const mixedHistoryLinks = [];
for (const file of activeFiles) {
  const content = read(file);
  for (const match of content.matchAll(linkPattern)) {
    if (/history\/|s-tracker/i.test(match[1])) mixedHistoryLinks.push({ file, target: match[1] });
  }
}
check('active-history-route-isolation', mixedHistoryLinks.length === 0, mixedHistoryLinks, []);

const operationalSTracker = [];
for (const file of activeFiles) {
  const lines = read(file).split(/\r?\n/);
  lines.forEach((line, index) => {
    if (!/S-Tracker/i.test(line)) return;
    if (!/(?:outside|do not|excluded|not required|не |запрещ|исключ|outside the active)/i.test(line)) {
      operationalSTracker.push({ file, line: index + 1, text: line.trim() });
    }
  });
}
check('s-tracker-boundary', operationalSTracker.length === 0, operationalSTracker, []);

const template = read('docs/agent-context/subagent-task-template.md');
const requiredTemplateHeadings = [
  '## Objective',
  '## Current State',
  '## Target State',
  '## Fact Owner',
  '## Read Scope',
  '## Write Scope',
  '## Prohibited Paths And Actions',
  '## Generated-File Rule',
  '## Acceptance Commands',
  '## Expected Report',
  '## Escalation Condition',
];
const missingTemplateHeadings = requiredTemplateHeadings.filter(heading => !template.includes(heading));
const example = read('docs/agent-context/subagent-task-example-button-story.md');
const broadScopeMarkers = ['- `app/packages/`', '- `docs/`', '- `app/`'];
const broadExampleScopes = broadScopeMarkers.filter(marker => example.includes(marker));
check('subagent-task-contract', missingTemplateHeadings.length === 0 && broadExampleScopes.length === 0, { missingTemplateHeadings, broadExampleScopes }, { missingTemplateHeadings: [], broadExampleScopes: [] });

const generation = spawnSync(process.execPath, [path.join(__dirname, 'generate-r09-documentation.js'), '--check'], {
  cwd: appRoot,
  encoding: 'utf8',
  maxBuffer: 16 * 1024 * 1024,
});
check('generated-documentation-drift', generation.status === 0, generation.status, 0);

const inventory = spawnSync(process.execPath, [path.join(__dirname, 'inventory-repository-artifacts.js')], {
  cwd: appRoot,
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
});
const inventoryReportPath = path.join(docsRoot, 'governance', 'artifact-inventory.json');
const inventoryReport = fs.existsSync(inventoryReportPath)
  ? JSON.parse(fs.readFileSync(inventoryReportPath, 'utf8'))
  : null;
const artifactSummary = inventoryReport?.summary || {};
const artifactFailures = {
  status: inventory.status,
  unmatched: artifactSummary.unmatched,
  trackedLocalOnly: artifactSummary.trackedLocalOnly,
  visibleLocalOnly: artifactSummary.visibleLocalOnly,
  ignoredVersioned: artifactSummary.ignoredVersioned,
};
check(
  'artifact-policy-coverage',
  inventory.status === 0 &&
    artifactSummary.unmatched === 0 &&
    artifactSummary.trackedLocalOnly === 0 &&
    artifactSummary.visibleLocalOnly === 0 &&
    artifactSummary.ignoredVersioned === 0,
  artifactFailures,
  { status: 0, unmatched: 0, trackedLocalOnly: 0, visibleLocalOnly: 0, ignoredVersioned: 0 },
);

const context = spawnSync(process.execPath, [path.join(__dirname, 'get-agent-context.js'), '--check'], {
  cwd: appRoot,
  encoding: 'utf8',
  maxBuffer: 16 * 1024 * 1024,
});
let contextReport = null;
try {
  contextReport = JSON.parse(context.stdout || 'null');
} catch {
  contextReport = { parseError: true, stdout: context.stdout };
}
check('minimal-context-contract', context.status === 0 && contextReport?.status === 'passed', { status: context.status, report: contextReport }, { status: 0, reportStatus: 'passed' });

const temporaryExecutionArtifacts = (inventoryReport?.entries || [])
  .filter(entry => entry.class === 'temporary-execution-versioned')
  .map(entry => entry.file);
check(
  'temporary-execution-artifacts-retired',
  temporaryExecutionArtifacts.length === 0,
  temporaryExecutionArtifacts,
  [],
);

const packageManifest = JSON.parse(read('app/package.json'));
const requiredScripts = ['artifacts:inventory', 'agent:context', 'agent:context:check', 'quality:agent-governance'];
const missingScripts = requiredScripts.filter(script => !packageManifest.scripts?.[script]);
check('governance-package-scripts', missingScripts.length === 0, missingScripts, []);

if (probeFailure) check('controlled-failure-probe', false, 'probe requested', 'no probe');

const zeroState = {
  missingRoutes: missingRoutes.length,
  staleActiveFacts: staleActive.length,
  ownerlessOrDuplicateDomains: missingDomains.length + duplicateDomains.length + missingOwnerPaths.length,
  mixedActiveHistoryRoutes: mixedHistoryLinks.length,
  unclassifiedArtifacts: artifactSummary.unmatched ?? -1,
  brokenLinks: brokenLinks.length,
  generatedDrift: generation.status === 0 ? 0 : 1,
  operationalSTrackerRoutes: operationalSTracker.length,
  invalidContextPackages: contextReport?.results?.filter(item => item.failures.length).length ?? -1,
  invalidSubagentScopes: missingTemplateHeadings.length + broadExampleScopes.length,
  ignoredAgentRoutes: ignoredAgents.length,
  temporaryExecutionArtifacts: temporaryExecutionArtifacts.length,
  failedChecks: failures.length,
};

const report = {
  status: failures.length ? 'failed' : 'passed',
  generatedAt: new Date().toISOString(),
  summary: {
    checks: checks.length,
    passed: checks.filter(item => item.status === 'passed').length,
    failed: failures.length,
    markdownFiles: markdownFiles.length,
    markdownLinks: markdownFiles.reduce((sum, file) => sum + [...fs.readFileSync(file, 'utf8').matchAll(linkPattern)].length, 0),
    historyWorkflowFiles: fs.readdirSync(path.join(docsRoot, 'history', 'workflows')).filter(file => file.endsWith('.md') && file !== 'README.md').length,
    externalHistoryFiles: fs.readdirSync(path.join(docsRoot, 'history', 'external-projects', 's-tracker')).filter(file => file.endsWith('.md') && file !== 'README.md').length,
  },
  zeroState,
  checks,
  failures,
};

fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(`Agent governance: ${report.status}`);
console.log(`Checks: ${report.summary.passed}/${report.summary.checks}`);
console.log(`Markdown links: ${report.summary.markdownLinks}; broken: ${zeroState.brokenLinks}`);
console.log(`Artifact unmatched: ${zeroState.unclassifiedArtifacts}`);
console.log(`Report: ${reportPath}`);
for (const failure of failures) console.error(`- ${failure}`);
if (failures.length) process.exit(1);
