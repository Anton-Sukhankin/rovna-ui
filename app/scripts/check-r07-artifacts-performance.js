const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const outputPath = path.join(repoRoot, 'docs', 'r07-artifacts-performance-gate.json');

function readJson(relativePath) {
  const filePath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(filePath)) throw new Error(`Missing R-07 artifact: ${relativePath}`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function check(assertions, id, condition, actual, expected) {
  assertions.push({ id, status: condition ? 'passed' : 'failed', actual, expected });
}

function reactPassed(row) {
  return row?.install === 'passed' && row?.build === 'passed' && row?.domSmoke === 'passed';
}

function main() {
  const scope = readJson('tmp/g07-supported-package-gate.json');
  const artifacts = readJson('docs/r07-package-artifacts.json');
  const tree = readJson('docs/r07-tree-shaking.json');
  const release = readJson('tmp/g11-ds-only-release-rehearsal.json');
  const bundlers = readJson('docs/r06-bundler-compatibility.json');
  const react = readJson('docs/react-compatibility.json');
  const api = readJson('docs/r06-public-api-audit.json');
  const types = readJson('docs/r06-types-consumer.json');
  const unit = readJson('tmp/g10-ds-only-tests/report.json');
  const assertions = [];
  const releaseHash = release.verification?.archiveSha256;

  check(assertions, 'supported-package-status', scope.status === 'passed', scope.status, 'passed');
  check(assertions, 'supported-package-count', scope.selectedPackages === 21 && scope.passedPackages === 21 && scope.failedPackages === 0, `${scope.passedPackages}/${scope.selectedPackages}`, '21/21');
  check(assertions, 'supported-source-map-contract', scope.results?.every(row => row.artifact?.javaScript === row.artifact?.sourceMaps), scope.results?.map(row => ({ package: row.name, js: row.artifact?.javaScript, maps: row.artifact?.sourceMaps })), 'JS/maps equal for all packages');
  check(assertions, 'artifact-audit-status', artifacts.status === 'passed', artifacts.status, 'passed');
  check(assertions, 'artifact-package-count', artifacts.packages === 21 && artifacts.summary?.passedPackages === 21, artifacts.summary?.passedPackages, 21);
  check(assertions, 'artifact-source-map-coverage', artifacts.summary?.jsFiles === artifacts.summary?.sourceMaps && artifacts.summary?.jsFiles > 0, `${artifacts.summary?.jsFiles}/${artifacts.summary?.sourceMaps}`, 'equal and non-zero');
  check(assertions, 'artifact-path-safety', artifacts.summary?.artifactErrors === 0, artifacts.summary?.artifactErrors, 0);
  check(assertions, 'artifact-budget', artifacts.summary?.budgetViolations === 0, artifacts.summary?.budgetViolations, 0);
  check(assertions, 'artifact-tarball-coverage', artifacts.rows?.every(row => row.tarball?.jsFiles === row.jsFiles && row.tarball?.sourceMaps === row.sourceMaps), artifacts.rows?.map(row => ({ package: row.name, dist: `${row.jsFiles}/${row.sourceMaps}`, tarball: `${row.tarball?.jsFiles}/${row.tarball?.sourceMaps}` })), 'dist and tarball JS/maps equal');
  check(assertions, 'tree-shaking-status', tree.status === 'passed', tree.status, 'passed');
  check(
    assertions,
    'tree-shaking-scenarios',
    tree.summary?.scenarios > 0 && tree.summary?.passed === tree.summary?.scenarios,
    `${tree.summary?.passed}/${tree.summary?.scenarios}`,
    'all scenarios passed',
  );
  check(
    assertions,
    'tree-shaking-pairs',
    tree.summary?.pairChecks > 0 &&
      tree.summary?.pairChecks === tree.pairs?.length &&
      tree.pairs?.every(row => row.status === 'passed'),
    tree.pairs,
    'all root/subpath pairs passed',
  );
  check(assertions, 'side-effects-contract', tree.summary?.sideEffectsApplicable > 0 && tree.summary?.sideEffectsFailures === 0, `${tree.summary?.sideEffectsPackages}/${tree.summary?.sideEffectsApplicable}; failures=${tree.summary?.sideEffectsFailures}`, 'all installed packages; failures=0');
  check(assertions, 'dependency-deduplication', tree.summary?.duplicatePackageRoots === 0, tree.summary?.duplicatePackageRoots, 0);
  check(assertions, 'consumer-size-budget', tree.summary?.budgetViolations === 0, tree.summary?.budgetViolations, 0);
  check(assertions, 'release-status', release.status === 'passed', release.status, 'passed');
  check(assertions, 'release-count', release.verification?.releasePackages === 21 && release.verification?.bundlePackages === 21, `${release.verification?.releasePackages}/${release.verification?.bundlePackages}`, '21/21');
  check(assertions, 'release-consumer', release.verification?.consumerInstall?.includes('passed') && release.verification?.consumerBuild?.includes('passed') && release.verification?.consumerDomSmoke === 'passed', `${release.verification?.consumerInstall}; ${release.verification?.consumerBuild}; ${release.verification?.consumerDomSmoke}`, 'install/build/DOM passed');
  check(assertions, 'release-integrity', release.verification?.archiveChecksumMatches === true && release.verification?.releaseBoundaryMatches === true, `${release.verification?.archiveChecksumMatches}/${release.verification?.releaseBoundaryMatches}`, 'true/true');
  check(assertions, 'closed-source-policy', release.closedCorporateSourceUsed === false && release.verification?.registryContacted === false, `${release.closedCorporateSourceUsed}/${release.verification?.registryContacted}`, 'false/false');
  check(assertions, 'bundler-status', bundlers.status === 'passed' && bundlers.rows?.every(row => row.status === 'passed'), bundlers.status, 'passed');
  check(assertions, 'bundler-release-hash', bundlers.releaseArchiveSha256 === releaseHash, bundlers.releaseArchiveSha256, releaseHash);
  check(assertions, 'react-matrix', react.rows?.length === 3 && react.rows.every(reactPassed), react.rows?.map(row => ({ react: row.react, install: row.install, build: row.build, dom: row.domSmoke })), '3/3');
  check(assertions, 'react-release-hash', react.releaseArchiveSha256 === releaseHash, react.releaseArchiveSha256, releaseHash);
  check(assertions, 'api-drift', api.status === 'passed' && Object.values(api.drift || {}).every(items => items.length === 0), api.drift, 'none');
  const publicSubpaths = api.summary?.publicSubpaths;
  check(
    assertions,
    'typescript-consumer',
    types.status === 'passed' &&
      Number.isInteger(publicSubpaths) &&
      types.positiveImports === publicSubpaths &&
      types.negativeAssertions === 4,
    `${types.positiveImports}/${types.negativeAssertions}`,
    `${publicSubpaths}/4`,
  );
  check(
    assertions,
    'unit-regression',
    unit.status === 'passed' &&
      unit.summary?.passedTests > 0 &&
      unit.summary?.failedTests === 0 &&
      unit.summary?.visualSnapshotDrift?.length === 0,
    `passed=${unit.summary?.passedTests}; failed=${unit.summary?.failedTests}; drift=${unit.summary?.visualSnapshotDrift?.length}`,
    'passed>0; failed=0; drift=0',
  );

  const failed = assertions.filter(assertion => assertion.status === 'failed');
  const report = {
    status: failed.length ? 'failed' : 'passed',
    generatedAt: new Date().toISOString(),
    checks: assertions.length,
    passed: assertions.length - failed.length,
    failed: failed.length,
    releaseArchiveSha256: releaseHash,
    artifacts: artifacts.summary,
    treeShaking: tree.summary,
    assertions,
  };
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`R-07 artifacts and performance gate: ${report.status}`);
  console.log(`Checks: ${report.passed}/${report.checks}`);
  console.log(`Report: ${outputPath}`);
  if (failed.length) process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
}
