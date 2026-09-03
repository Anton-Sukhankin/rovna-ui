const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const auditPath = path.join(repoRoot, 'docs', 'accessibility-full-report.json');
const baselinePath = path.join(repoRoot, 'docs', 'accessibility-warning-baseline.json');
const reportPath = path.join(repoRoot, 'docs', 'q13-accessibility-baseline-check.json');
const update = process.argv.slice(2).includes('--update');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function normalizeTarget(target) {
  const selector = Array.isArray(target) ? target.join(' > ') : String(target || '');
  return selector
    .replace(/rc-menu-uuid-\d+/g, 'rc-menu-uuid-*')
    .replace(/\.sc-[a-z0-9]+/gi, '.sc-*')
    .replace(
      /\.(?=[A-Za-z0-9_-]*[A-Z])(?=[A-Za-z0-9_-]*[a-z])[A-Za-z0-9_-]{5,12}(?=[\s.:[>#]|$)/g,
      '.sc-hash',
    );
}

function collectWarnings(audit) {
  return (audit.results || [])
    .flatMap(story =>
      (story.incomplete || []).map(finding => ({
        storyId: story.id,
        ruleId: finding.id,
        impact: finding.impact || null,
        nodeCount: (finding.nodes || []).length,
        targets: (finding.nodes || [])
          .map(node => normalizeTarget(node.target))
          .sort(),
      })),
    )
    .sort((first, second) =>
      `${first.storyId}|${first.ruleId}`.localeCompare(
        `${second.storyId}|${second.ruleId}`,
      ),
    );
}

function warningKey(warning) {
  return `${warning.storyId}|${warning.ruleId}`;
}

function sameNodes(first, second) {
  return (
    first.nodeCount === second.nodeCount &&
    JSON.stringify(first.targets) === JSON.stringify(second.targets)
  );
}

function main() {
  if (!fs.existsSync(auditPath)) {
    throw new Error('Accessibility audit report is missing. Run storybook:a11y:audit first.');
  }
  const audit = readJson(auditPath);
  const warnings = collectWarnings(audit);

  if (update) {
    const baseline = {
      formatVersion: 1,
      generatedAt: new Date().toISOString(),
      source: 'docs/accessibility-full-report.json',
      policy: {
        violationsAllowed: false,
        meaning:
          'Only axe incomplete/manual-review findings are recorded. Violations remain blocking.',
        update:
          'Run --update only after reviewing every added story/rule/target tuple.',
      },
      stories: audit.summary?.stories ?? null,
      warnings,
    };
    fs.writeFileSync(baselinePath, `${JSON.stringify(baseline, null, 2)}\n`);
    console.log(`Accessibility warning baseline updated: ${warnings.length} story/rule entries.`);
    return;
  }

  if (!fs.existsSync(baselinePath)) {
    throw new Error('Accessibility warning baseline is missing. Review and create it with --update.');
  }
  const baseline = readJson(baselinePath);
  const baselineByKey = new Map((baseline.warnings || []).map(item => [warningKey(item), item]));
  const currentByKey = new Map(warnings.map(item => [warningKey(item), item]));
  const added = warnings.filter(item => !baselineByKey.has(warningKey(item)));
  const changed = warnings.filter(item => {
    const previous = baselineByKey.get(warningKey(item));
    return previous && !sameNodes(previous, item);
  });
  const resolved = (baseline.warnings || []).filter(
    item => !currentByKey.has(warningKey(item)),
  );
  const violations = audit.summary?.violationNodeCount || 0;
  const failedAudits = audit.summary?.failedAudits || 0;
  const status = violations || failedAudits || added.length || changed.length
    ? 'failed'
    : 'passed';
  const report = {
    status,
    generatedAt: new Date().toISOString(),
    auditStatus: audit.status,
    violations,
    failedAudits,
    currentWarnings: warnings.length,
    baselineWarnings: (baseline.warnings || []).length,
    added,
    changed,
    resolved,
    policy:
      'Violations and new/changed incomplete findings fail; resolved incomplete findings pass.',
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Accessibility baseline check: ${status}`);
  console.log(
    `Warnings current/baseline: ${warnings.length}/${(baseline.warnings || []).length}; added: ${added.length}; changed: ${changed.length}; resolved: ${resolved.length}`,
  );
  console.log(`Report: ${reportPath}`);
  if (status !== 'passed') process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
