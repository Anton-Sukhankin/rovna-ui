const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const outputPath = path.join(repoRoot, 'docs', 'r08-security-supply-chain-gate.json');

function run(script, args = []) {
  const result = spawnSync(process.execPath, [path.join(appRoot, 'scripts', script), ...args], {
    cwd: appRoot,
    encoding: 'utf8',
    stdio: 'inherit',
  });
  if (result.status !== 0) throw new Error(`${script} failed with exit ${result.status}`);
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), 'utf8').replace(/^\uFEFF/, ''));
}

function check(assertions, id, condition, actual, expected, status = 'passed') {
  assertions.push({
    id,
    status: condition ? status : 'failed',
    actual,
    expected,
  });
}

function main() {
  run('audit-github-source-snapshot.js');
  run('audit-r08-security-supply-chain.js');
  run('audit-r08-public-dependencies.js', ['--verify']);
  run('check-r08-local-compensations.js');

  const source = readJson('tmp/f17-github-snapshot-audit.json');
  const security = readJson('docs/r08-security-supply-chain.json');
  const audit = readJson('docs/dependency-audit.json');
  const licenses = readJson('docs/dependency-license-inventory.json');
  const sbom = readJson('docs/sbom.cdx.json');
  const assertions = [];

  check(assertions, 'secret-scan', source.secretFindings.length === 0, source.secretFindings.length, 0);
  check(assertions, 'active-closed-host-scan', source.internalReferences.activeSourceFiles.length === 0, source.internalReferences.activeSourceFiles.length, 0);
  check(assertions, 'reviewed-reference-policy', source.internalReferences.unreviewedReferenceOnlyFiles.length === 0 && source.internalReferences.staleReviewedReferenceFiles.length === 0, `${source.internalReferences.unreviewedReferenceOnlyFiles.length}/${source.internalReferences.staleReviewedReferenceFiles.length}`, '0/0');
  check(assertions, 'candidate-root-policy', source.unexpectedCandidates.length === 0, source.unexpectedCandidates.length, 0);
  check(assertions, 'root-license-policy', source.rootLicense === 'LICENSE' && source.blockers.length === 0, { rootLicense: source.rootLicense, blockers: source.blockers }, { rootLicense: 'LICENSE', blockers: [] });
  check(assertions, 'production-audit', audit.production.status === 'passed' && audit.production.uniqueAdvisories === 0, audit.production.uniqueAdvisories, 0);
  check(assertions, 'full-dependency-audit', audit.full.status === 'passed' && audit.full.uniqueAdvisories === 0, audit.full.uniqueAdvisories, 0);
  check(assertions, 'audit-lock-freshness', audit.lockSha256 === security.lockSha256, audit.lockSha256, security.lockSha256);
  check(assertions, 'lock-source-policy', security.lockfile.invalidSources.length === 0 && Object.keys(security.lockfile.registryHosts).every(host => host === 'registry.npmjs.org'), security.lockfile.registryHosts, { 'registry.npmjs.org': security.lockfile.entries });
  check(assertions, 'lock-integrity', security.lockfile.missingVersion.length === 0 && security.lockfile.missingResolved.length === 0 && security.lockfile.missingIntegrity.length === 0, `${security.lockfile.missingVersion.length}/${security.lockfile.missingResolved.length}/${security.lockfile.missingIntegrity.length}`, '0/0/0');
  check(assertions, 'release-boundary-sbom', security.releaseBoundary.expectedPackages === 21 && security.releaseBoundary.representedPackages === 21, `${security.releaseBoundary.representedPackages}/${security.releaseBoundary.expectedPackages}`, '21/21');
  check(assertions, 'sbom-contract', sbom.bomFormat === 'CycloneDX' && sbom.specVersion === '1.5' && sbom.components.length === security.sbom.components && security.sbom.missingDependencies.length === 0, `${sbom.specVersion}; components=${sbom.components.length}; missing=${security.sbom.missingDependencies.length}`, '1.5; non-zero; missing=0');
  check(assertions, 'license-inventory', licenses.lockSha256 === security.lockSha256 && licenses.summary.packages > 0 && licenses.packages.length === licenses.summary.packages, licenses.summary, 'complete inventory tied to lock hash');
  check(assertions, 'project-license-policy', licenses.projectLicense.status === 'present' && licenses.projectLicense.rootLicensePresent === true && licenses.projectLicense.spdx === 'MIT' && licenses.projectLicense.manifestMetadataIsAuthorization === false, licenses.projectLicense, 'root MIT license present; manifest metadata mirrors the root grant');
  check(assertions, 'source-lifecycle-policy', security.sourceArtifacts.sourceLifecycleScripts.length === 0 && security.installPolicy.lifecycleScriptsExecutedDuringR08 === false, `${security.sourceArtifacts.sourceLifecycleScripts.length}/${security.installPolicy.lifecycleScriptsExecutedDuringR08}`, '0/false');
  check(assertions, 'source-binary-policy', security.sourceArtifacts.executableArtifacts.length === 0 && security.sourceArtifacts.unexpectedBinaryArtifacts.length === 0, `${security.sourceArtifacts.executableArtifacts.length}/${security.sourceArtifacts.unexpectedBinaryArtifacts.length}`, '0/0');
  check(assertions, 'credential-filename-policy', security.sourceArtifacts.suspiciousCredentialFiles.length === 0, security.sourceArtifacts.suspiciousCredentialFiles.length, 0);
  check(assertions, 'absolute-path-policy', security.sourceArtifacts.activeAbsolutePaths.length === 0, security.sourceArtifacts.activeAbsolutePaths.length, 0);
  check(assertions, 'closed-source-policy', security.installPolicy.publicRegistryOnly === true && security.installPolicy.closedCorporateSourcesUsed === false, security.installPolicy, 'public only; closed false');
  check(assertions, 'security-audit-status', security.status === 'passed' && security.failures.length === 0, security.failures, []);

  const failed = assertions.filter(assertion => assertion.status === 'failed');
  const accepted = assertions.filter(assertion => assertion.status === 'accepted-risk');
  const report = {
    status: failed.length ? 'failed' : 'passed',
    generatedAt: new Date().toISOString(),
    checks: assertions.length,
    passed: assertions.length - failed.length - accepted.length,
    acceptedRisks: accepted.length,
    failed: failed.length,
    lockSha256: security.lockSha256,
    assertions,
  };
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`R-08 security and supply-chain gate: ${report.status}`);
  console.log(`Checks: ${report.passed} passed, ${report.acceptedRisks} accepted, ${report.failed} failed`);
  console.log(`Report: ${outputPath}`);
  if (failed.length) process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
}
