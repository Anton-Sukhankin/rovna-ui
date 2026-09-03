const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repositoryRoot = path.resolve(appRoot, '..');
const policyPath = path.join(repositoryRoot, 'docs', 'governance', 'artifact-policy.json');
const reportPath = path.join(repositoryRoot, 'docs', 'governance', 'artifact-inventory.json');

function git(args) {
  return execFileSync('git', ['-c', `safe.directory=${repositoryRoot}`, ...args], {
    cwd: repositoryRoot,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  }).replace(/\r\n/g, '\n');
}

function lines(value) {
  return value.split('\n').map(item => item.trim()).filter(Boolean);
}

const policy = JSON.parse(fs.readFileSync(policyPath, 'utf8'));
const classNames = new Set(Object.keys(policy.classes || {}));
const rules = (policy.rules || []).map(rule => {
  if (!rule.id || !rule.pattern || !classNames.has(rule.class)) {
    throw new Error(`Invalid artifact rule: ${JSON.stringify(rule)}`);
  }
  return { ...rule, regex: new RegExp(rule.pattern) };
});

function classify(file) {
  const normalized = file.replace(/\\/g, '/');
  const rule = rules.find(item => item.regex.test(normalized));
  if (!rule) return null;
  return {
    rule: rule.id,
    class: rule.class,
    trackedPolicy: policy.classes[rule.class].tracked,
    agentRead: policy.classes[rule.class].agentRead,
    owner: rule.owner,
  };
}

const tracked = lines(git(['ls-files']));
const untracked = lines(git(['ls-files', '--others', '--exclude-standard']));
const ignored = lines(git([
  'ls-files',
  '--others',
  '--ignored',
  '--exclude-standard',
  '--directory',
  '--no-empty-directory',
]));

const entries = [];
for (const [gitState, files] of [
  ['tracked', tracked],
  ['untracked', untracked],
  ['ignored', ignored],
]) {
  for (const file of files) {
    entries.push({ file, gitState, classification: classify(file) });
  }
}

const unmatched = entries.filter(entry => !entry.classification);
const trackedLocalOnly = entries.filter(entry =>
  entry.gitState === 'tracked' && entry.classification && !entry.classification.trackedPolicy,
);
const visibleLocalOnly = entries.filter(entry =>
  entry.gitState === 'untracked' && entry.classification && !entry.classification.trackedPolicy,
);
const ignoredVersioned = entries.filter(entry =>
  entry.gitState === 'ignored' && entry.classification?.trackedPolicy,
);

const classCounts = {};
for (const entry of entries) {
  const name = entry.classification?.class || 'unmatched';
  classCounts[name] = (classCounts[name] || 0) + 1;
}

const visualBaselines = tracked.filter(file => /^app\/\.q-visual-baseline\/.*\.png$/.test(file));
const required = [
  'app/packages/tend-ui-assets/src/media/demo-avatar.svg',
  'app/packages/tend-ui-assets/src/stats.html',
  'docs/agent-context/ds-catalog.json',
  'docs/agent-context/component-passports/README.md',
];
const missingRequired = required.filter(file => !fs.existsSync(path.join(repositoryRoot, file)));

const failures = [];
if (unmatched.length) failures.push(`Unmatched artifact paths: ${unmatched.length}`);
if (trackedLocalOnly.length) failures.push(`Tracked local-only paths: ${trackedLocalOnly.length}`);
if (visibleLocalOnly.length) failures.push(`Visible unignored local-only paths: ${visibleLocalOnly.length}`);
if (ignoredVersioned.length) failures.push(`Ignored versioned paths: ${ignoredVersioned.length}`);
if (missingRequired.length) failures.push(`Missing required artifacts: ${missingRequired.join(', ')}`);
if (visualBaselines.length !== 88) failures.push(`Expected 88 visual baselines, got ${visualBaselines.length}.`);

const stableEntries = entries.map(entry => ({
  file: entry.file,
  gitState: entry.gitState,
  rule: entry.classification?.rule || null,
  class: entry.classification?.class || null,
  trackedPolicy: entry.classification?.trackedPolicy ?? null,
  agentRead: entry.classification?.agentRead || null,
}));
const classifiedSha256 = crypto
  .createHash('sha256')
  .update(JSON.stringify(stableEntries))
  .digest('hex');

const report = {
  status: failures.length ? 'failed' : 'passed',
  generatedAt: new Date().toISOString(),
  policyVersion: policy.version,
  summary: {
    paths: entries.length,
    tracked: tracked.length,
    untracked: untracked.length,
    ignored: ignored.length,
    unmatched: unmatched.length,
    trackedLocalOnly: trackedLocalOnly.length,
    visibleLocalOnly: visibleLocalOnly.length,
    ignoredVersioned: ignoredVersioned.length,
    visualBaselines: visualBaselines.length,
    classes: classCounts,
    classifiedSha256,
  },
  anomalies: {
    unmatched,
    trackedLocalOnly,
    visibleLocalOnly,
    ignoredVersioned,
    missingRequired,
  },
  failures,
  entries: stableEntries,
};

fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

console.log(`Artifact inventory: ${report.status}`);
console.log(`Paths: ${report.summary.paths}; unmatched: ${report.summary.unmatched}`);
console.log(`Tracked/untracked/ignored: ${tracked.length}/${untracked.length}/${ignored.length}`);
console.log(`Visual baselines: ${report.summary.visualBaselines}`);
console.log(`Report: ${reportPath}`);
for (const failure of failures) console.error(`- ${failure}`);
if (failures.length) process.exit(1);
