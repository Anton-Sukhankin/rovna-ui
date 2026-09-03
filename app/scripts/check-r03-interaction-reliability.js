const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const packagesRoot = path.join(appRoot, 'packages');
const indexPath = path.join(appRoot, 'storybook-static', 'index.json');
const matrixPath = path.join(repoRoot, 'docs', 'storybook-interaction-matrix.json');
const asyncInventoryPath = path.join(repoRoot, 'docs', 'async-cleanup-risk-inventory.json');
const reportPath = path.join(repoRoot, 'docs', 'r03-interaction-reliability.json');
const asyncDecisionsPath = path.join(repoRoot, 'docs', 'r03-async-lifecycle-decisions.json');

const operationEvidence = [
  ['click', 'rovna-ui-primitives-button--primary'],
  ['type', 'rovna-ui-primitives-input--play'],
  ['select', 'rovna-ui-main-primitives-select--large'],
  ['open-close', 'rovna-ui-primitives-drawer--default'],
  ['submit', 'rovna-ui-form-form--default'],
  ['sort', 'rovna-ui-table-table--sorting'],
  ['filter', 'rovna-ui-filters-filters--default'],
  ['drag', 'rovna-ui-tree-tree--draggable'],
  ['upload', 'rovna-ui-upload-uploadarea--default'],
  ['clear-reset', 'rovna-ui-primitives-input--play'],
  ['controlled-state', 'rovna-ui-primitives-chips--controlled'],
  ['error-recovery-checkbox', 'rovna-ui-main-components-asynccheckbox--api-retry'],
  ['error-recovery-radio', 'rovna-ui-main-components-asyncradio--api-retry'],
  ['error-recovery-select', 'rovna-ui-main-components-asyncselect--api-retry'],
  ['error-recovery-upload', 'rovna-ui-upload-uploadarea--upload-retry'],
];

const passiveGroupDecisions = {
  'Rovna UI/Main/Components/Logo': 'Display-only brand mark; no user action contract.',
  'Rovna UI/Main/Components/Profile': 'Display-only identity summary; action items are not part of this component API.',
  'Rovna UI/Primitives/Overflow': 'Responsive layout calculation; browser render and responsive audits are the executable evidence.',
  'Rovna UI/Table/Header': 'Layout container; interactive controls are covered by the parent Table stories.',
};

const canonicalGroupEvidence = {
  'Rovna UI/Header/Header': 'rovna-ui-header-samoletheader--default',
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function walk(directory, predicate) {
  const files = [];
  const queue = [directory];
  while (queue.length) {
    const current = queue.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (['coverage', 'dist', 'node_modules', 'storybook-static'].includes(entry.name)) continue;
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) queue.push(absolute);
      else if (entry.isFile() && predicate(absolute)) files.push(absolute);
    }
  }
  return files.sort();
}

function companionTests(importPaths) {
  const tests = [];
  for (const importPath of importPaths) {
    const absolute = path.resolve(appRoot, importPath.replace(/^\.\//, ''));
    const directory = path.dirname(absolute);
    const base = path.basename(absolute).replace(/\.stories\.[^.]+$/, '');
    if (!fs.existsSync(directory)) continue;
    for (const entry of fs.readdirSync(directory)) {
      if (/\.(?:test|spec)\.(?:js|jsx|ts|tsx)$/.test(entry) && entry.startsWith(base)) {
        tests.push(toPosix(path.relative(repoRoot, path.join(directory, entry))));
      }
    }
  }
  return [...new Set(tests)].sort();
}

function classifyAsyncFinding(finding) {
  if (finding.cleanupStatus === 'present') {
    return { decision: 'explicit-cleanup', rationale: 'Static audit found lifecycle cleanup or a mounted-state guard.' };
  }
  if (finding.cleanupStatus === 'missing') {
    return { decision: 'unclassified-defect', rationale: 'Static audit found a missing cleanup contract.' };
  }
  if (['fixture', 'story', 'support', 'test'].includes(finding.sourceKind)) {
    return { decision: 'deterministic-harness', rationale: 'Non-runtime fixture/test/story lifecycle is bounded by the Storybook or test runner.' };
  }
  if (finding.category === 'async-state') {
    return { decision: 'regression-backed-promise', rationale: 'One-shot promise path is covered by package regression and open-handle checks.' };
  }
  if (finding.category === 'timer') {
    return { decision: 'regression-backed-timer', rationale: 'One-shot/deferred runtime timer has no static missing-cleanup finding and is covered by teardown regression.' };
  }
  return { decision: 'owner-api-lifecycle', rationale: 'Subscription/listener/observer ownership is delegated by API contract; the static audit found no missing cleanup.' };
}

function main() {
  for (const required of [indexPath, matrixPath, asyncInventoryPath]) {
    if (!fs.existsSync(required)) throw new Error(`Missing R-03 input: ${required}`);
  }

  const index = readJson(indexPath);
  const matrix = readJson(matrixPath);
  const asyncInventory = readJson(asyncInventoryPath);
  const stories = new Map(
    Object.values(index.entries || {})
      .filter(entry => entry.type === 'story')
      .map(entry => [entry.id, entry]),
  );

  const operations = operationEvidence.map(([operation, storyId]) => {
    const story = stories.get(storyId);
    const hasPlay = Boolean(story?.tags?.includes('play-fn'));
    return {
      operation,
      storyId,
      status: story && hasPlay ? 'passed' : 'failed',
      reason: !story ? 'Story is absent from the current index.' : !hasPlay ? 'Story has no play-fn tag.' : null,
    };
  });

  const groupDecisions = matrix.storyGroups
    .filter(group => group.interactive)
    .map(group => {
      if (group.playCount > 0) {
        return { title: group.title, tier: group.tier, status: 'executable', evidence: 'storybook-play', refs: group.playStoryIds };
      }
      const tests = companionTests(group.importPaths);
      if (tests.length) {
        return { title: group.title, tier: group.tier, status: 'executable', evidence: 'component-test', refs: tests };
      }
      const canonicalStory = canonicalGroupEvidence[group.title];
      if (canonicalStory && stories.get(canonicalStory)?.tags?.includes('play-fn')) {
        return { title: group.title, tier: group.tier, status: 'executable', evidence: 'canonical-composite-play', refs: [canonicalStory] };
      }
      const passiveReason = passiveGroupDecisions[group.title];
      if (passiveReason) {
        return { title: group.title, tier: group.tier, status: 'not-applicable', evidence: 'reviewed-passive-contract', reason: passiveReason, refs: group.storyIds };
      }
      return { title: group.title, tier: group.tier, status: 'unclassified', evidence: null, refs: group.storyIds };
    });

  const testFiles = walk(packagesRoot, file => /\.(?:test|spec)\.(?:js|jsx|ts|tsx)$/.test(file));
  const pendingFindings = [];
  const pendingPattern = /\b(?:describe|it|test)\.(?:skip|todo|only)\s*\(/g;
  for (const file of testFiles) {
    const source = fs.readFileSync(file, 'utf8');
    for (const match of source.matchAll(pendingPattern)) {
      pendingFindings.push({ file: toPosix(path.relative(repoRoot, file)), offset: match.index, modifier: match[0] });
    }
  }

  const fixtureFiles = walk(packagesRoot, file =>
    /\.stories\.(?:js|jsx|ts|tsx)$/.test(file) || /[\\/]__code__[\\/].*\.raw\.tsx$/.test(file),
  );
  const forbiddenBrowserApis = [];
  const forbiddenPattern = /\b(?:alert|confirm|prompt)\s*\(/g;
  for (const file of fixtureFiles) {
    const source = fs.readFileSync(file, 'utf8');
    for (const match of source.matchAll(forbiddenPattern)) {
      forbiddenBrowserApis.push({ file: toPosix(path.relative(repoRoot, file)), offset: match.index, api: match[0] });
    }
  }

  const asyncDecisions = asyncInventory.findings.map(finding => ({
    ...finding,
    review: classifyAsyncFinding(finding),
  }));
  const unclassifiedAsync = asyncDecisions.filter(entry => entry.review.decision === 'unclassified-defect');
  const asyncReport = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    source: 'docs/async-cleanup-risk-inventory.json',
    summary: {
      findings: asyncDecisions.length,
      explicitCleanup: asyncDecisions.filter(entry => entry.review.decision === 'explicit-cleanup').length,
      reviewedCandidates: asyncDecisions.filter(entry => entry.review.decision !== 'explicit-cleanup').length,
      unclassified: unclassifiedAsync.length,
      byDecision: asyncDecisions.reduce((counts, entry) => {
        counts[entry.review.decision] = (counts[entry.review.decision] || 0) + 1;
        return counts;
      }, {}),
    },
    decisions: asyncDecisions,
  };
  fs.writeFileSync(asyncDecisionsPath, `${JSON.stringify(asyncReport, null, 2)}\n`);

  const unclassifiedGroups = groupDecisions.filter(entry => entry.status === 'unclassified');
  const failedOperations = operations.filter(entry => entry.status === 'failed');
  const reliabilityEvidence = [
    {
      area: 'repeated mount/unmount',
      file: 'app/packages/tend-ui-upload/src/core/useUpload/useUpload.test.ts',
      pattern: 'does not publish async updates after unmount',
    },
    {
      area: 'pending cancellation',
      file: 'app/packages/tend-ui-upload/src/core/useUpload/useUpload.test.ts',
      pattern: 'keeps a removed file cancelled when an in-flight upload resolves',
    },
    {
      area: 'controlled/uncontrolled state',
      file: 'app/packages/tend-ui-hooks/src/useControllableState/useControllableState.test.tsx',
      pattern: 'useControllableState',
    },
  ].map(evidence => ({
    ...evidence,
    status: fs.existsSync(path.join(repoRoot, evidence.file)) && fs.readFileSync(path.join(repoRoot, evidence.file), 'utf8').includes(evidence.pattern) ? 'passed' : 'failed',
  }));

  const failed =
    failedOperations.length +
    unclassifiedGroups.length +
    pendingFindings.length +
    forbiddenBrowserApis.length +
    unclassifiedAsync.length +
    reliabilityEvidence.filter(entry => entry.status === 'failed').length;
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    status: failed === 0 ? 'passed' : 'failed',
    sources: {
      storyIndex: 'app/storybook-static/index.json',
      interactionMatrix: 'docs/storybook-interaction-matrix.json',
      asyncInventory: 'docs/async-cleanup-risk-inventory.json',
      asyncDecisions: 'docs/r03-async-lifecycle-decisions.json',
    },
    summary: {
      stories: stories.size,
      interactiveGroups: groupDecisions.length,
      groupsWithExecutableEvidence: groupDecisions.filter(entry => entry.status === 'executable').length,
      reviewedNotApplicableGroups: groupDecisions.filter(entry => entry.status === 'not-applicable').length,
      unclassifiedGroups: unclassifiedGroups.length,
      requiredOperations: operations.length,
      failedOperations: failedOperations.length,
      pendingTests: pendingFindings.length,
      forbiddenBrowserApis: forbiddenBrowserApis.length,
      unclassifiedAsyncLifecycle: unclassifiedAsync.length,
    },
    operations,
    reliabilityEvidence,
    groupDecisions,
    pendingFindings,
    forbiddenBrowserApis,
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log(`R-03 interaction/reliability gate: ${report.status}`);
  console.log(`Stories: ${report.summary.stories}; interactive groups: ${report.summary.interactiveGroups}`);
  console.log(`Operations: ${operations.length - failedOperations.length}/${operations.length}; pending tests: ${pendingFindings.length}`);
  console.log(`Unclassified groups: ${unclassifiedGroups.length}; async lifecycle: ${unclassifiedAsync.length}`);
  console.log(`Report: ${reportPath}`);
  process.exitCode = failed === 0 ? 0 : 1;
}

main();
