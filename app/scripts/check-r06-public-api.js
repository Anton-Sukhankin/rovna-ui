const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const outputPath = path.join(repoRoot, 'docs', 'r06-public-api-gate.json');

function readJson(relativePath) {
  const filePath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(filePath)) throw new Error(`Missing R-06 artifact: ${relativePath}`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function check(assertions, id, condition, actual, expected) {
  assertions.push({ id, status: condition ? 'passed' : 'failed', actual, expected });
}

function rowPassed(row) {
  return row?.install === 'passed' && row?.build === 'passed' && row?.domSmoke === 'passed';
}

function main() {
  const scope = readJson('tmp/g07-supported-package-gate.json');
  const api = readJson('docs/r06-public-api-audit.json');
  const types = readJson('docs/r06-types-consumer.json');
  const release = readJson('tmp/g11-ds-only-release-rehearsal.json');
  const bundlers = readJson('docs/r06-bundler-compatibility.json');
  const react = readJson('docs/react-compatibility.json');
  const unitTests = readJson('tmp/g10-ds-only-tests/report.json');
  const policyPath = path.join(repoRoot, 'docs', 'public-api-versioning-policy.md');
  const policy = fs.existsSync(policyPath) ? fs.readFileSync(policyPath, 'utf8') : '';
  const assertions = [];
  const releaseHash = release.verification?.archiveSha256;

  check(assertions, 'supported-package-gate', scope.status === 'passed', scope.status, 'passed');
  check(assertions, 'supported-package-count', scope.selectedPackages === 21 && scope.passedPackages === 21 && scope.failedPackages === 0, `${scope.passedPackages}/${scope.selectedPackages}; failed=${scope.failedPackages}`, '21/21; failed=0');
  check(assertions, 'api-audit-status', api.status === 'passed', api.status, 'passed');
  check(assertions, 'api-package-count', api.summary?.packages === 21, api.summary?.packages, 21);
  check(assertions, 'api-public-subpaths', api.summary?.publicSubpaths === 645, api.summary?.publicSubpaths, 645);
  check(assertions, 'api-target-validation', api.validationErrors?.length === 0, api.validationErrors?.length, 0);
  check(assertions, 'api-baseline-hash', api.currentSha256 === api.baselineSha256, api.currentSha256, api.baselineSha256);
  check(assertions, 'api-drift', Object.values(api.drift || {}).every(items => items.length === 0), api.drift, 'no added, removed or changed packages');
  check(assertions, 'typescript-consumer-status', types.status === 'passed', types.status, 'passed');
  check(assertions, 'typescript-positive-imports', types.positiveImports === 645 && types.results?.[0]?.status === 'passed', types.positiveImports, 645);
  check(assertions, 'typescript-negative-boundaries', types.negativeAssertions === 4 && types.results?.[1]?.status === 'passed', types.negativeAssertions, 4);
  check(assertions, 'release-rehearsal', release.status === 'passed', release.status, 'passed');
  check(assertions, 'release-package-count', release.verification?.releasePackages === 21 && release.verification?.bundlePackages === 21, `${release.verification?.releasePackages}/${release.verification?.bundlePackages}`, '21/21');
  check(assertions, 'release-consumer', release.verification?.consumerBuild === 'passed without source aliases' && release.verification?.consumerDomSmoke === 'passed', `${release.verification?.consumerBuild}; ${release.verification?.consumerDomSmoke}`, 'passed without source aliases; passed');
  check(assertions, 'release-boundary', release.verification?.releaseBoundaryMatches === true && release.verification?.archiveChecksumMatches === true, `${release.verification?.releaseBoundaryMatches}/${release.verification?.archiveChecksumMatches}`, 'true/true');
  check(assertions, 'closed-corporate-source', release.closedCorporateSourceUsed === false && release.verification?.registryContacted === false, `${release.closedCorporateSourceUsed}/${release.verification?.registryContacted}`, 'false/false');
  check(assertions, 'bundler-status', bundlers.status === 'passed', bundlers.status, 'passed');
  check(assertions, 'vite-consumer', bundlers.rows?.find(row => row.bundler === 'Vite 7')?.status === 'passed', bundlers.rows?.find(row => row.bundler === 'Vite 7')?.status, 'passed');
  check(assertions, 'webpack-consumer', bundlers.rows?.find(row => row.bundler === 'Webpack 5')?.status === 'passed', bundlers.rows?.find(row => row.bundler === 'Webpack 5')?.status, 'passed');
  check(assertions, 'bundler-release-hash', bundlers.releaseArchiveSha256 === releaseHash, bundlers.releaseArchiveSha256, releaseHash);
  check(assertions, 'react-runtime-status', react.status === 'runtime-passed', react.status, 'runtime-passed');
  check(assertions, 'react-17', rowPassed(react.rows?.find(row => row.react === '17.0.2')), react.rows?.find(row => row.react === '17.0.2'), 'install/build/dom passed');
  check(assertions, 'react-18', rowPassed(react.rows?.find(row => row.react === '18.3.1')), react.rows?.find(row => row.react === '18.3.1'), 'install/build/dom passed');
  check(assertions, 'react-19', rowPassed(react.rows?.find(row => row.react === '19.2.8')), react.rows?.find(row => row.react === '19.2.8'), 'install/build/dom passed');
  check(assertions, 'react-release-hash', react.releaseArchiveSha256 === releaseHash, react.releaseArchiveSha256, releaseHash);
  check(assertions, 'react-peer-decision', react.declaredPeerContract === 'React and ReactDOM ^17.0.2' && react.rows?.filter(row => !row.react.startsWith('17.')).every(row => row.peerContract === 'runtime-only-unverified-peer'), react.declaredPeerContract, 'React 17 declared; React 18/19 runtime-only');
  check(assertions, 'semver-policy', /SemVer/i.test(policy) && /deprecat/i.test(policy) && /breaking/i.test(policy), policyPath, 'SemVer, deprecation and breaking-change policy');
  check(assertions, 'unit-package-regression', unitTests.status === 'passed' && unitTests.summary?.passedPackages === 22 && unitTests.summary?.failedPackages === 0, `${unitTests.status}; ${unitTests.summary?.passedPackages}/${unitTests.summary?.packages}`, 'passed; 22/22');
  check(
    assertions,
    'unit-test-regression',
    unitTests.summary?.tests > 0
      && unitTests.summary?.passedTests === unitTests.summary?.tests
      && unitTests.summary?.failedTests === 0
      && unitTests.summary?.visualSnapshotDrift?.length === 0,
    `passed=${unitTests.summary?.passedTests}/${unitTests.summary?.tests}; failed=${unitTests.summary?.failedTests}; drift=${unitTests.summary?.visualSnapshotDrift?.length}`,
    'all discovered tests passed; failed=0; drift=0',
  );

  const failed = assertions.filter(assertion => assertion.status === 'failed');
  const report = {
    status: failed.length ? 'failed' : 'passed',
    generatedAt: new Date().toISOString(),
    checks: assertions.length,
    passed: assertions.length - failed.length,
    failed: failed.length,
    api: api.summary,
    releaseArchiveSha256: releaseHash,
    compatibility: {
      bundlers: bundlers.rows?.map(row => ({ bundler: row.bundler, status: row.status })),
      react: react.rows?.map(row => ({ react: row.react, status: rowPassed(row) ? 'passed' : 'failed', peerContract: row.peerContract, peerWarnings: row.peerWarnings?.length || 0 })),
      declaredPeerContract: react.declaredPeerContract,
    },
    unitTests: {
      packages: unitTests.summary?.packages,
      testFiles: unitTests.summary?.testFiles,
      passedTests: unitTests.summary?.passedTests,
      failedTests: unitTests.summary?.failedTests,
      visualSnapshotDrift: unitTests.summary?.visualSnapshotDrift?.length,
    },
    assertions,
  };
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`R-06 public API gate: ${report.status}`);
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
