const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const reportPath = path.join(repoRoot, 'tmp', 'g11-ds-only-release-rehearsal.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function runStep(id, script, args = []) {
  const startedAt = Date.now();
  const result = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: appRoot,
    encoding: 'utf8',
    env: {
      ...process.env,
      CI: '1',
      COREPACK_ENABLE_NETWORK: '0',
      STORYBOOK_DISABLE_TELEMETRY: '1',
      npm_config_offline: 'true',
    },
    stdio: 'inherit',
    timeout: 1200000,
  });

  return {
    id,
    script,
    args,
    status: result.status === 0 ? 'passed' : 'failed',
    exitCode: result.status,
    signal: result.signal || null,
    error: result.error ? result.error.message : null,
    durationMs: Date.now() - startedAt,
  };
}

function main() {
  const startedAt = Date.now();
  const steps = [];
  const reuseSupportedBuild = process.argv.includes('--reuse-supported-build');
  const reuseTarballRehearsal = process.argv.includes('--reuse-tarball');
  const reuseBundle = process.argv.includes('--reuse-bundle');
  const execute = (id, script, args) => {
    const result = runStep(id, script, args);
    steps.push(result);
    if (result.status !== 'passed') {
      throw new Error(`${id} failed: ${result.error || `exit code ${result.exitCode}`}`);
    }
  };

  try {
    if (reuseSupportedBuild) {
      const packageReportPath = path.join(repoRoot, 'tmp', 'g07-supported-package-gate.json');
      const packageReport = readJson(packageReportPath);
      if (packageReport.status !== 'passed' || packageReport.passedPackages !== 21) {
        throw new Error('The reusable supported-package report is absent or incomplete');
      }
      steps.push({
        id: 'supported-package-build',
        script: 'run-supported-package-gate.js',
        status: 'passed',
        execution: 'reused-fresh-report',
        report: packageReportPath,
      });
    } else {
      execute('supported-package-build', 'run-supported-package-gate.js');
    }
    execute('public-metadata-prepare', 'prepare-public-release.js');
    if (reuseTarballRehearsal) {
      const rehearsalReportPath = path.join(
        repoRoot,
        'tmp',
        'f13-local-tarball-rehearsal',
        'result.json',
      );
      const rehearsalReport = readJson(rehearsalReportPath);
      const reusableRehearsalPassed =
        rehearsalReport.status === 'passed' &&
        rehearsalReport.packedTarballs?.length === 21 &&
        rehearsalReport.consumer?.install?.includes('passed') &&
        rehearsalReport.consumer?.build?.includes('passed') &&
        rehearsalReport.consumer?.domSmoke === 'passed';
      if (!reusableRehearsalPassed) {
        throw new Error('The reusable tarball rehearsal report is absent or incomplete');
      }
      steps.push({
        id: 'tarball-consumer-rehearsal',
        script: 'rehearse-local-tarball-install.js',
        status: 'passed',
        execution: 'reused-fresh-report',
        report: rehearsalReportPath,
      });
    } else {
      execute('tarball-consumer-rehearsal', 'rehearse-local-tarball-install.js');
    }
    if (reuseBundle) {
      const bundleReportPath = path.join(repoRoot, 'release', 'f15-result.json');
      const bundleReport = readJson(bundleReportPath);
      const archivePath = path.join(repoRoot, 'release', bundleReport.archive);
      if (
        bundleReport.status !== 'passed' ||
        !fs.existsSync(archivePath) ||
        sha256(archivePath) !== bundleReport.archiveSha256
      ) {
        throw new Error('The reusable release bundle is absent or has an invalid checksum');
      }
      steps.push({
        id: 'release-bundle',
        script: 'create-release-bundle.js',
        status: 'passed',
        execution: 'reused-verified-bundle',
        report: bundleReportPath,
      });
    } else {
      execute('release-bundle', 'create-release-bundle.js');
    }

    const packageReport = readJson(path.join(repoRoot, 'tmp', 'g07-supported-package-gate.json'));
    const rehearsal = readJson(
      path.join(repoRoot, 'tmp', 'f13-local-tarball-rehearsal', 'result.json'),
    );
    const bundle = readJson(path.join(repoRoot, 'release', 'f15-result.json'));
    const archivePath = path.join(repoRoot, 'release', bundle.archive);
    const releaseBoundary = readJson(path.join(appRoot, 'release-boundary.json'));

    const verification = {
      supportedPackages: packageReport.selectedPackages,
      supportedPackagesPassed: packageReport.passedPackages,
      releasePackages: rehearsal.packedTarballs.length,
      compensationTarballs: rehearsal.compensationTarballs.length,
      offlineMirrorTarballs: rehearsal.offlineMirrorTarballs,
      consumerInstall: rehearsal.consumer.install,
      consumerBuild: rehearsal.consumer.build,
      consumerDomSmoke: rehearsal.consumer.domSmoke,
      actionableWarnings: rehearsal.consumer.actionableWarnings,
      bundlePackages: bundle.packageCount,
      releaseLevels: bundle.releaseLevelCount,
      archive: bundle.archive,
      archiveSha256: bundle.archiveSha256,
      archiveChecksumMatches:
        fs.existsSync(archivePath) && sha256(archivePath) === bundle.archiveSha256,
      publicationPerformed: bundle.publicationPerformed,
      registryContacted: bundle.registryContacted,
      releaseBoundaryMatches:
        rehearsal.packedTarballs.length === releaseBoundary.publicReleasePackages.length &&
        bundle.packageCount === releaseBoundary.publicReleasePackages.length,
    };
    const passed =
      packageReport.status === 'passed' &&
      verification.supportedPackages === 21 &&
      verification.supportedPackagesPassed === 21 &&
      rehearsal.status === 'passed' &&
      verification.releaseBoundaryMatches &&
      verification.consumerInstall.includes('passed') &&
      verification.consumerBuild.includes('passed') &&
      verification.consumerDomSmoke === 'passed' &&
      verification.actionableWarnings.length === 0 &&
      bundle.status === 'passed' &&
      verification.archiveChecksumMatches &&
      verification.publicationPerformed === false &&
      verification.registryContacted === false;

    const report = {
      status: passed ? 'passed' : 'failed-verification',
      mode: 'ds-only-registry-free',
      checkedAt: new Date().toISOString(),
      networkInstallAllowed: false,
      closedCorporateSourceUsed: false,
      steps,
      verification,
      durationMs: Date.now() - startedAt,
    };
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
    console.log(`G-11 DS-only release rehearsal: ${report.status}`);
    console.log(
      `Supported artifacts: ${verification.supportedPackagesPassed}/${verification.supportedPackages}; release tarballs: ${verification.releasePackages}; bundle: ${verification.bundlePackages}`,
    );
    console.log(`Archive SHA-256: ${verification.archiveSha256}`);
    console.log(`Report: ${reportPath}`);
    process.exitCode = passed ? 0 : 1;
  } catch (error) {
    const report = {
      status: 'failed',
      mode: 'ds-only-registry-free',
      checkedAt: new Date().toISOString(),
      networkInstallAllowed: false,
      closedCorporateSourceUsed: false,
      steps,
      error: error instanceof Error ? error.stack || error.message : String(error),
      durationMs: Date.now() - startedAt,
    };
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
    console.error(error instanceof Error ? error.stack || error.message : error);
    console.error(`Report: ${reportPath}`);
    process.exitCode = 1;
  }
}

main();
