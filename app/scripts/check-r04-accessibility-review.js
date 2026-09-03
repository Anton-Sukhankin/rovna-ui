const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const auditPath = path.join(repoRoot, 'docs', 'accessibility-full-report.json');
const indexPath = path.join(appRoot, 'storybook-static', 'index.json');
const reportPath = path.join(repoRoot, 'docs', 'r04-accessibility-manual-review.json');

const policies = {
  'color-contrast': {
    decision: 'manual-visual-review',
    accepted: finding =>
      finding.nodes.every(node =>
        /background color could not be determined|contrast.*could not be determined|content is too short to determine/i.test(
          node.failureSummary || '',
        ),
      ),
    rationale:
      'Axe could not determine the effective background for layered elements or whether extremely short content is text. Actual contrast ratios below the threshold remain blocking; accepted incomplete nodes are covered by visual and forced-colors checks.',
    evidence: [
      'docs/r04-assistive-modes-report.json',
      'tmp/q06-responsive-report.json',
    ],
  },
  'th-has-data-cells': {
    decision: 'accepted-virtual-table-limitation',
    accepted: (_finding, story) =>
      story.id === 'rovna-ui-main-primitives-table--virtual',
    rationale:
      'The virtualized example intentionally renders its header and data body in separate table trees. Header roles and data rendering are checked in browser scenarios; changing this architecture belongs to a dedicated table refactor.',
    evidence: [
      'docs/r04-assistive-modes-report.json',
      'docs/screen-reader-verification-protocol.md',
    ],
  },
  'aria-prohibited-attr': {
    decision: 'remediation-required',
    accepted: () => false,
    rationale:
      'ARIA attributes on a role that prohibits them are a semantic defect and are not accepted as baseline debt.',
    evidence: [],
  },
  'aria-valid-attr-value': {
    decision: 'remediation-required',
    accepted: () => false,
    rationale:
      'Dangling or otherwise invalid ARIA references can break navigation for assistive technologies and are not accepted.',
    evidence: [],
  },
  'duplicate-id-aria': {
    decision: 'remediation-required',
    accepted: () => false,
    rationale:
      'Duplicate identifiers make accessible relationships ambiguous and are not accepted.',
    evidence: [],
  },
  'form-field-multiple-labels': {
    decision: 'remediation-required',
    accepted: () => false,
    rationale:
      'Multiple competing labels can produce inconsistent announcements and are not accepted.',
    evidence: [],
  },
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function normalizeTarget(target) {
  return (Array.isArray(target) ? target.join(' > ') : String(target || ''))
    .replace(/rc-menu-uuid-\d+/g, 'rc-menu-uuid-*')
    .replace(/\.sc-[a-z0-9]+/gi, '.sc-*');
}

function main() {
  if (!fs.existsSync(auditPath)) {
    throw new Error('Run storybook:a11y:audit before the R-04 review gate.');
  }
  if (!fs.existsSync(indexPath)) {
    throw new Error('Storybook static index is missing. Build Storybook first.');
  }

  const audit = readJson(auditPath);
  const index = readJson(indexPath);
  const expectedStories = Object.values(index.entries || {}).filter(
    entry => entry.type === 'story',
  ).length;
  const entries = [];

  for (const story of audit.results || []) {
    for (const finding of story.incomplete || []) {
      const policy = policies[finding.id];
      const accepted = Boolean(policy?.accepted(finding, story));
      entries.push({
        storyId: story.id,
        ruleId: finding.id,
        impact: finding.impact || null,
        nodeCount: finding.nodes?.length || 0,
        targets: (finding.nodes || []).map(node => normalizeTarget(node.target)),
        failureSummaries: [
          ...new Set(
            (finding.nodes || [])
              .map(node => node.failureSummary)
              .filter(Boolean),
          ),
        ],
        decision: policy?.decision || 'unclassified',
        status: accepted ? 'reviewed' : 'blocked',
        rationale: policy?.rationale || 'No R-04 review policy exists for this rule.',
        evidence: policy?.evidence || [],
      });
    }
  }

  const byRule = Object.values(
    entries.reduce((summary, entry) => {
      summary[entry.ruleId] ||= {
        ruleId: entry.ruleId,
        entries: 0,
        nodes: 0,
        reviewed: 0,
        blocked: 0,
      };
      summary[entry.ruleId].entries += 1;
      summary[entry.ruleId].nodes += entry.nodeCount;
      summary[entry.ruleId][entry.status] += 1;
      return summary;
    }, {}),
  ).sort((first, second) => first.ruleId.localeCompare(second.ruleId));

  const violations = audit.summary?.violationNodeCount || 0;
  const failedAudits = audit.summary?.failedAudits || 0;
  const auditedStories = audit.summary?.stories || 0;
  const blocked = entries.filter(entry => entry.status === 'blocked');
  const unclassified = entries.filter(entry => entry.decision === 'unclassified');
  const completeCatalog = auditedStories === expectedStories;
  const status =
    audit.status === 'passed' &&
    violations === 0 &&
    failedAudits === 0 &&
    completeCatalog &&
    blocked.length === 0 &&
    unclassified.length === 0
      ? 'passed'
      : 'failed';
  const report = {
    status,
    generatedAt: new Date().toISOString(),
    source: 'docs/accessibility-full-report.json',
    policy:
      'Violations, failed audits, partial catalog runs, unknown rules, and unresolved semantic incomplete findings fail. Only explicitly reviewed manual boundaries pass.',
    summary: {
      expectedStories,
      auditedStories,
      completeCatalog,
      violations,
      failedAudits,
      incompleteEntries: entries.length,
      incompleteNodes: entries.reduce((total, entry) => total + entry.nodeCount, 0),
      reviewedEntries: entries.length - blocked.length,
      blockedEntries: blocked.length,
      unclassifiedEntries: unclassified.length,
    },
    byRule,
    blocked,
    entries,
  };

  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`R-04 accessibility review: ${status}`);
  console.log(
    `Stories ${auditedStories}/${expectedStories}; incomplete ${entries.length}; blocked ${blocked.length}; unclassified ${unclassified.length}`,
  );
  console.log(`Report: ${reportPath}`);
  if (status !== 'passed') process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
}
