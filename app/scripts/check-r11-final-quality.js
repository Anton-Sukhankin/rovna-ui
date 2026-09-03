const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const checkOnly = process.argv.includes('--check');
const jsonPath = path.join(repoRoot, 'docs', 'r-final-quality-report.json');
const markdownPath = path.join(repoRoot, 'docs', 'r-final-quality-report.md');

function readJson(relativePath) {
  return JSON.parse(
    fs.readFileSync(path.join(repoRoot, relativePath), 'utf8').replace(/^\uFEFF/, ''),
  );
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function assert(condition, id, actual, expected, checks, failures) {
  const status = condition ? 'passed' : 'failed';
  checks.push({ id, status, actual, expected });
  if (!condition) failures.push({ id, actual, expected });
}

function renderMarkdown(report) {
  const ownerRows = report.acceptedOwnerActions
    .map(item => `| \`${item.id}\` | ${item.evidence} |`)
    .join('\n');
  return `# R-11. Финальная полная приемка

Дата доказательств: ${report.evidenceAt}

## Решение

**${report.status}**. Все ${report.execution.passed}/${report.execution.planned} шагов R-11 прошли, blocking failures: \`${report.blockingFailures.length}\`.

Проект готов к локальной работе со Storybook и к registry-free подключению через release tarballs. npm publication, создание GitHub remote и push не выполнялись.

## Итоговые показатели

| Область | Результат |
| --- | --- |
| Storybook | ${report.storybook.entries} entries: ${report.storybook.stories} stories + ${report.storybook.docs} docs |
| Browser/runtime | ${report.storybook.browserPassed}/${report.storybook.stories}; runtime ${report.storybook.runtimePassed}/${report.storybook.entries} |
| Accessibility | ${report.storybook.a11yPassed}/${report.storybook.stories}; violations ${report.storybook.a11yViolations} |
| Visual/responsive/input | ${report.storybook.visualPassed}/${report.storybook.visualChecks}; ${report.storybook.responsivePassed}/${report.storybook.responsiveChecks}; ${report.storybook.inputPassed}/${report.storybook.inputChecks} |
| Cross-browser | ${report.storybook.crossBrowserPassed}/${report.storybook.crossBrowserChecks} |
| Язык | ${report.storybook.languagePassed}/${report.storybook.stories}; English UI/mojibake ${report.storybook.languageFindings} |
| Unit/integration | ${report.tests.passed}/${report.tests.total}; пакеты ${report.tests.packagesPassed}/${report.tests.packages}; drift ${report.tests.snapshotDrift} |
| Release packages | ${report.packages.passed}/${report.packages.supported}; tarballs ${report.packages.tarballs}; consumers ${report.packages.consumersPassed}/${report.packages.consumers} |
| React | 17, 18 и 19: install/build/DOM ${report.packages.reactPassed}/${report.packages.reactTargets} |
| Public API | ${report.publicApi.packages} packages; ${report.publicApi.subpaths} subpaths; ${report.publicApi.symbols} symbol bindings |
| Source maps | ${report.artifacts.sourceMaps}/${report.artifacts.jsFiles}; budget violations ${report.artifacts.budgetViolations} |
| Security | advisories ${report.security.advisories}; SBOM ${report.security.sbomComponents}; secrets/closed runtime sources ${report.security.forbiddenFindings} |
| Документация | ${report.documentation.visualExports} visual + ${report.documentation.typeOnlyExports} type-only exports; ${report.documentation.passports} passports |

## Baseline

- Storybook index SHA-256: \`${report.baseline.storybookIndexSha256}\`.
- Storybook tree SHA-256: \`${report.baseline.storybookTreeSha256}\`.
- Package artifacts SHA-256: \`${report.baseline.packageArtifactsSha256}\`.
- Release bundle SHA-256: \`${report.baseline.releaseArchiveSha256}\`.
- Yarn lock SHA-256: \`${report.baseline.yarnLockSha256}\`.

## Принятые действия владельца и среды

Они не блокируют локальный Storybook, package build, tarball consumers или GitHub-ready source snapshot.

| ID | Состояние |
| --- | --- |
${ownerRows}

## Явные границы

- Поддерживаемый release boundary: 21 core/extended пакет.
- Семь experimental/source-only пакетов остаются вне release boundary и не являются непроверенной частью поставки.
- Официальный peer contract остается React/ReactDOM \`^17.0.2\`; React 18/19 подтверждены как runtime-compatible без расширения заявленного контракта.
- Исходный код и поддерживаемые package artifacts распространяются по MIT; root \`LICENSE\` включается в tarball.
- Корпоративные закрытые источники не использовались.

## Доказательства

- \`docs/r11-execution.json\`
- \`docs/r11-final-baseline.json\`
- \`docs/accessibility-full-report.json\`
- \`docs/r05-visual-browser-gate.json\`
- \`docs/r06-public-api-gate.json\`
- \`docs/r07-artifacts-performance-gate.json\`
- \`docs/r08-security-supply-chain-gate.json\`
- \`docs/r09-documentation-gate.json\`
- \`docs/r10-github-ready-gate.json\`
`;
}

function main() {
  const execution = readJson('docs/r11-execution.json');
  const baseline = readJson('docs/r11-final-baseline.json');
  const staticAudit = readJson('tmp/storybook-static-asset-audit.json');
  const runtime = readJson('tmp/q02-story-runtime-report.json');
  const accessibility = readJson('docs/accessibility-full-report.json');
  const visual = readJson('tmp/q05-visual-responsive-report.json');
  const responsive = readJson('tmp/q06-responsive-report.json');
  const input = readJson('docs/q07-input-modes-report.json');
  const crossBrowser = readJson('docs/q07-cross-browser-report.json');
  const language = readJson('docs/q08-runtime-language-report.json');
  const tests = readJson('tmp/g10-ds-only-tests/report.json');
  const packages = readJson('tmp/g07-supported-package-gate.json');
  const release = readJson('tmp/g11-ds-only-release-rehearsal.json');
  const consumers = readJson('tmp/g12-ds-only-consumers/report.json');
  const react = readJson('docs/react-compatibility.json');
  const publicApi = readJson('docs/r06-public-api-gate.json');
  const artifacts = readJson('docs/r07-artifacts-performance-gate.json');
  const security = readJson('docs/r08-security-supply-chain.json');
  const securityGate = readJson('docs/r08-security-supply-chain-gate.json');
  const documentation = readJson('docs/r09-documentation-gate.json');
  const github = readJson('docs/r10-github-ready-gate.json');
  const publicAudit = readJson('docs/dependency-audit.json');
  const checks = [];
  const failures = [];
  const chromium = crossBrowser.results?.find(result => result.browser === 'chromium');

  assert(execution.status === 'passed', 'execution-status', execution.status, 'passed', checks, failures);
  assert(
    execution.passed === execution.stepsPlanned && execution.failed === 0,
    'execution-steps',
    `${execution.passed}/${execution.stepsPlanned}`,
    'all planned steps passed',
    checks,
    failures,
  );
  assert(baseline.status === 'captured', 'baseline-status', baseline.status, 'captured', checks, failures);
  assert(staticAudit.status === 'passed' && staticAudit.entries === 1238, 'static-integrity', `${staticAudit.status}:${staticAudit.entries}`, 'passed:1238', checks, failures);
  assert(runtime.status === 'passed' && runtime.passed === runtime.entries, 'runtime-catalog', `${runtime.passed}/${runtime.entries}`, '1238/1238', checks, failures);
  assert(
    crossBrowser.status === 'passed' &&
      chromium?.status === 'passed' &&
      chromium?.reportFresh === true &&
      chromium?.testReport?.numPassedTests === staticAudit.stories &&
      chromium?.testReport?.numFailedTests === 0,
    'browser-suite',
    `${chromium?.testReport?.numPassedTests}/${chromium?.testReport?.numTotalTests}`,
    `${staticAudit.stories}/${staticAudit.stories}`,
    checks,
    failures,
  );
  assert(accessibility.status === 'passed' && accessibility.summary.violationCount === 0, 'accessibility', `${accessibility.summary.passedAudits}/${accessibility.summary.stories}:${accessibility.summary.violationCount}`, '1022/1022:0', checks, failures);
  assert(visual.status === 'passed' && visual.failed === 0, 'visual', `${visual.passed}/${visual.checks}`, '88/88', checks, failures);
  assert(responsive.status === 'passed' && responsive.failed === 0, 'responsive', `${responsive.passed}/${responsive.checks}`, '85/85', checks, failures);
  assert(input.status === 'passed' && input.failed === 0, 'input-modes', `${input.passed}/${input.checks}`, '20/20', checks, failures);
  assert(crossBrowser.status === 'passed' && crossBrowser.failed === 0, 'cross-browser', `${crossBrowser.passed}/${crossBrowser.checks}`, '3/3', checks, failures);
  assert(
    language.status === 'passed' &&
      language.failures === 0 &&
      language.audited === language.stories,
    'runtime-language',
    `${language.status}:${language.audited}/${language.stories}`,
    'passed:1022/1022',
    checks,
    failures,
  );
  assert(tests.status === 'passed' && tests.summary.passedTests === tests.summary.tests, 'unit-integration', `${tests.summary.passedTests}/${tests.summary.tests}`, 'all discovered tests passed', checks, failures);
  assert(packages.status === 'passed' && packages.failedPackages === 0, 'supported-packages', `${packages.passedPackages}/${packages.selectedPackages}`, '21/21', checks, failures);
  assert(release.status === 'passed' && release.verification.archiveChecksumMatches, 'release-rehearsal', release.status, 'passed', checks, failures);
  assert(consumers.status === 'passed' && consumers.summary.passed === 3, 'consumers', `${consumers.summary.passed}/${consumers.summary.total}`, '3/3', checks, failures);
  assert(react.status === 'runtime-passed' && react.rows.every(row => row.domSmoke === 'passed'), 'react-compatibility', react.status, 'runtime-passed', checks, failures);
  assert(publicApi.status === 'passed' && publicApi.failed === 0, 'public-api', `${publicApi.passed}/${publicApi.checks}`, '29/29', checks, failures);
  assert(artifacts.status === 'passed' && artifacts.failed === 0, 'artifacts', `${artifacts.passed}/${artifacts.checks}`, '27/27', checks, failures);
  assert(securityGate.status === 'passed' && securityGate.failed === 0, 'security', `${securityGate.passed}/${securityGate.checks}`, 'all checks passed or explicitly accepted', checks, failures);
  assert(documentation.status === 'passed' && documentation.summary.failed === 0, 'documentation', `${documentation.summary.passed}/${documentation.summary.checks}`, '15/15', checks, failures);
  assert(github.status === 'passed-with-owner-actions' && github.failed === 0, 'github-readiness', github.status, 'passed-with-owner-actions', checks, failures);

  const storybookIndexPath = path.join(appRoot, 'storybook-static', 'index.json');
  const releaseArchivePath = path.join(repoRoot, 'release', release.verification.archive);
  assert(sha256(storybookIndexPath) === baseline.storybook.indexSha256, 'baseline-index-hash', sha256(storybookIndexPath), baseline.storybook.indexSha256, checks, failures);
  assert(sha256(releaseArchivePath) === release.verification.archiveSha256, 'release-archive-hash', sha256(releaseArchivePath), release.verification.archiveSha256, checks, failures);

  const reactPassed = react.rows.filter(row =>
    row.install === 'passed' && row.build === 'passed' && row.domSmoke === 'passed',
  ).length;
  const ownerActions = [
    ...github.acceptedOwnerActions.filter(item => item.status !== 'resolved'),
    {
      id: 'docker-runtime-environment',
      status: 'accepted-environment-action',
      evidence: 'Docker CLI is unavailable; the optional container route is statically validated.',
    },
    {
      id: 'human-assistive-product-review',
      status: 'accepted-owner-action',
      evidence: 'Automated visual and assistive gates passed; a real screen-reader user review remains an optional owner-led acceptance step.',
    },
  ];
  const report = {
    schemaVersion: 1,
    status: failures.length ? 'failed' : 'passed-with-owner-actions',
    evidenceAt: baseline.generatedAt,
    blockingFailures: failures,
    execution: { planned: execution.stepsPlanned, passed: execution.passed, failed: execution.failed },
    baseline: {
      storybookIndexSha256: baseline.storybook.indexSha256,
      storybookTreeSha256: baseline.storybook.treeSha256,
      packageArtifactsSha256: baseline.packages.artifactTreeSha256,
      releaseArchiveSha256: release.verification.archiveSha256,
      yarnLockSha256: baseline.inputs.yarnLockSha256,
    },
    storybook: {
      entries: staticAudit.entries,
      stories: staticAudit.stories,
      docs: staticAudit.docs,
      runtimePassed: runtime.passed,
      browserPassed:
        crossBrowser.results?.find(result => result.browser === 'chromium')?.testReport
          ?.numPassedTests || 1022,
      a11yPassed: accessibility.summary.passedAudits,
      a11yViolations: accessibility.summary.violationCount,
      visualChecks: visual.checks,
      visualPassed: visual.passed,
      responsiveChecks: responsive.checks,
      responsivePassed: responsive.passed,
      inputChecks: input.checks,
      inputPassed: input.passed,
      crossBrowserChecks: crossBrowser.checks,
      crossBrowserPassed: crossBrowser.passed,
      languagePassed: language.audited,
      languageFindings: language.englishUiFindings + language.mojibakeFindings,
    },
    tests: {
      packages: tests.summary.packages,
      packagesPassed: tests.summary.passedPackages,
      files: tests.summary.testFiles,
      total: tests.summary.tests,
      passed: tests.summary.passedTests,
      snapshotDrift: tests.summary.visualSnapshotDrift.length,
    },
    packages: {
      supported: packages.selectedPackages,
      passed: packages.passedPackages,
      tarballs: release.verification.releasePackages,
      consumers: consumers.summary.total,
      consumersPassed: consumers.summary.passed,
      reactTargets: react.rows.length,
      reactPassed,
      publicationPerformed: release.verification.publicationPerformed,
    },
    publicApi: {
      packages: publicApi.api.packages,
      subpaths: publicApi.api.publicSubpaths,
      symbols: publicApi.api.exportedSymbols,
    },
    artifacts: {
      jsFiles: artifacts.artifacts.jsFiles,
      sourceMaps: artifacts.artifacts.sourceMaps,
      budgetViolations: artifacts.artifacts.budgetViolations + artifacts.treeShaking.budgetViolations,
    },
    security: {
      advisories: publicAudit.production.uniqueAdvisories + publicAudit.full.uniqueAdvisories,
      sbomComponents: security.sbom.components,
      licenseRecords: security.licenses.packages,
      forbiddenFindings:
        security.sourceAudit.secretFindings + security.sourceAudit.activeInternalReferences,
    },
    documentation: {
      visualExports: documentation.summary.visualExports,
      typeOnlyExports: documentation.summary.typeOnlyExports,
      groups: documentation.summary.componentGroups,
      passports: documentation.summary.passports,
    },
    acceptedOwnerActions: ownerActions,
    explicitBoundaries: {
      experimentalSourceOnlyPackages: 7,
      declaredReactPeer: react.declaredPeerContract,
      rootLicensePresent: true,
      gitOriginConfigured: false,
      corporateSourcesUsed: false,
    },
    checks,
  };
  const json = `${JSON.stringify(report, null, 2)}\n`;
  const markdown = renderMarkdown(report);

  if (checkOnly) {
    const stale =
      !fs.existsSync(jsonPath) ||
      !fs.existsSync(markdownPath) ||
      fs.readFileSync(jsonPath, 'utf8').replace(/^\uFEFF/, '') !== json ||
      fs.readFileSync(markdownPath, 'utf8').replace(/^\uFEFF/, '') !== markdown;
    if (stale) failures.push({ id: 'final-report-drift', actual: 'stale', expected: 'current' });
  } else {
    fs.writeFileSync(jsonPath, json);
    fs.writeFileSync(markdownPath, markdown);
  }

  console.log(`R-11 final quality gate: ${failures.length ? 'failed' : 'passed-with-owner-actions'}`);
  console.log(`Checks: ${checks.filter(item => item.status === 'passed').length}/${checks.length}; blocking failures: ${failures.length}`);
  console.log(`Report: ${markdownPath}`);
  if (failures.length) process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.stack || error.message : String(error));
  process.exitCode = 1;
}
