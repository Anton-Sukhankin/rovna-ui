const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const packagesRoot = path.join(appRoot, 'packages');
const releaseRoot = path.join(repoRoot, 'release', 'rovna-ui-4.82.0');
const reportPath = path.join(repoRoot, 'tmp', 'g02-ds-only-quality-gate.json');
const qFinalReportPath = path.join(repoRoot, 'tmp', 'q14-final-gate.json');
const documentedQReportPath = path.join(repoRoot, 'docs', 'q-final-quality-report.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function walk(root, shouldInclude) {
  if (!fs.existsSync(root)) return [];
  const result = [];
  const queue = [root];

  while (queue.length) {
    const directory = queue.pop();
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) queue.push(absolute);
      else if (entry.isFile() && shouldInclude(absolute)) result.push(absolute);
    }
  }

  return result;
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function command(commandName, args, cwd = repoRoot) {
  return spawnSync(commandName, args, {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      COREPACK_ENABLE_NETWORK: '0',
      STORYBOOK_DISABLE_TELEMETRY: '1',
      npm_config_offline: 'true',
    },
    stdio: 'pipe',
  });
}

function main() {
  const startedAt = Date.now();
  const checks = [];
  const add = (id, status, blocking, details) => {
    checks.push({ id, status, blocking, details });
  };

  const requiredPaths = [
    'app/package.json',
    'app/yarn.lock',
    'app/packages',
    'app/.storybook',
    'app/storybook-f06/main.ts',
    'docs/current-project-status.md',
    'docs/governance/fact-ownership.md',
    'docs/component-story-coverage.json',
    'docs/component-runtime-audit.json',
    'examples/consumer-smoke',
    'examples/consumer-clean-package',
    'examples/consumer-tarball',
  ];
  const missingRequired = requiredPaths.filter(item => !fs.existsSync(path.join(repoRoot, item)));
  add(
    'project-structure',
    missingRequired.length === 0 ? 'passed' : 'failed',
    true,
    { required: requiredPaths.length, missing: missingRequired },
  );

  const storybookLauncher = path.join(appRoot, 'node_modules', '.bin', process.platform === 'win32' ? 'storybook.cmd' : 'storybook');
  const dependencyDetails = {
    nodeModules: fs.existsSync(path.join(appRoot, 'node_modules')),
    storybookLauncher: fs.existsSync(storybookLauncher),
    packageManager: readJson(path.join(appRoot, 'package.json')).packageManager,
  };
  add(
    'dependency-graph',
    dependencyDetails.nodeModules && dependencyDetails.storybookLauncher ? 'passed' : 'failed',
    true,
    dependencyDetails,
  );

  const packageDirectories = fs
    .readdirSync(packagesRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory());
  const packageRows = packageDirectories.map(entry => {
    const root = path.join(packagesRoot, entry.name);
    const manifestPath = path.join(root, 'package.json');
    const manifest = fs.existsSync(manifestPath) ? readJson(manifestPath) : {};
    return {
      directory: entry.name,
      name: manifest.name || null,
      private: manifest.private === true,
      dist: fs.existsSync(path.join(root, 'dist')),
    };
  });
  const storyFiles = walk(packagesRoot, file => /\.stories\.(js|jsx|mjs|ts|tsx)$/.test(file));
  const mdxFiles = walk(packagesRoot, file => file.endsWith('.mdx'));
  const testFiles = walk(packagesRoot, file => /\.(test|spec)\.(js|jsx|ts|tsx)$/.test(file));
  const inventory = {
    workspaces: packageRows.length,
    storyFiles: storyFiles.length,
    mdxFiles: mdxFiles.length,
    testFiles: testFiles.length,
  };
  add(
    'source-inventory',
    inventory.workspaces >= 46 &&
    inventory.storyFiles >= 112 &&
    inventory.mdxFiles >= 215 &&
    inventory.testFiles >= 210
      ? 'passed'
      : 'failed',
    true,
    inventory,
  );

  const lint = command(process.execPath, [path.join(__dirname, 'run-eslint.js'), '--quiet'], appRoot);
  add('lint', lint.status === 0 ? 'passed' : 'failed', true, {
    exitCode: lint.status,
    outputTail: `${lint.stdout || ''}${lint.stderr || ''}`.trim().slice(-2000),
  });

  const interactionCheck = command(
    process.execPath,
    [path.join(__dirname, 'check-storybook-interactions.js')],
    appRoot,
  );
  const storybookQualityCheck = command(
    process.execPath,
    [path.join(__dirname, 'check-storybook-quality-config.js')],
    appRoot,
  );
  const storybookLanguageCheck = command(
    process.execPath,
    [path.join(__dirname, 'check-storybook-language.js')],
    appRoot,
  );
  add(
    'storybook-interaction-accessibility-config',
    interactionCheck.status === 0 && storybookQualityCheck.status === 0 ? 'passed' : 'failed',
    true,
    {
      interactionExitCode: interactionCheck.status,
      qualityConfigExitCode: storybookQualityCheck.status,
      accessibilityBaseline: fs.existsSync(
        path.join(repoRoot, 'docs', 'accessibility-baseline.json'),
      ),
    },
  );
  add('storybook-primary-language', storybookLanguageCheck.status === 0 ? 'passed' : 'failed', true, {
    primaryLocale: 'ru',
    exitCode: storybookLanguageCheck.status,
    outputTail: `${storybookLanguageCheck.stdout || ''}${storybookLanguageCheck.stderr || ''}`
      .trim()
      .slice(-2000),
  });

  const staticAssetAudit = command(
    process.execPath,
    [path.join(__dirname, 'check-storybook-static-assets.js')],
    appRoot,
  );
  const staticAssetReportPath = path.join(repoRoot, 'tmp', 'storybook-static-asset-audit.json');
  const staticAssetReport = fs.existsSync(staticAssetReportPath)
    ? readJson(staticAssetReportPath)
    : null;
  const staticAssetPassed =
    staticAssetAudit.status === 0 &&
    staticAssetReport?.status === 'passed' &&
    staticAssetReport?.entries >= 1157 &&
    staticAssetReport?.missing?.length === 0;
  add('storybook-static-integrity', staticAssetPassed ? 'passed' : 'failed', true, {
    exitCode: staticAssetAudit.status,
    status: staticAssetReport?.status || null,
    entries: staticAssetReport?.entries ?? null,
    stories: staticAssetReport?.stories ?? null,
    docs: staticAssetReport?.docs ?? null,
    reachableFiles: staticAssetReport?.reachableFiles ?? null,
    localReferences: staticAssetReport?.localReferences ?? null,
    missing: staticAssetReport?.missing?.length ?? null,
  });

  const coverageAudit = command(
    process.execPath,
    [path.join(__dirname, 'audit-component-story-coverage.js')],
    appRoot,
  );
  const coverageReportPath = path.join(repoRoot, 'docs', 'component-story-coverage.json');
  const coverageReport = fs.existsSync(coverageReportPath) ? readJson(coverageReportPath) : null;
  const coveragePassed =
    coverageAudit.status === 0 &&
    coverageReport?.status === 'passed' &&
    !coverageReport?.summary?.coverage?.['documented-gap'] &&
    coverageReport?.summary?.unclassifiedStoryGroups === 0 &&
    coverageReport?.summary?.storyEntries >= 938;
  add('component-story-coverage', coveragePassed ? 'passed' : 'failed', true, {
    exitCode: coverageAudit.status,
    status: coverageReport?.status || null,
    storyGroups: coverageReport?.summary?.storyGroups ?? null,
    publicVisualExports: coverageReport?.summary?.publicVisualExports ?? null,
    coverage: coverageReport?.summary?.coverage || null,
    unclassifiedStoryGroups: coverageReport?.summary?.unclassifiedStoryGroups ?? null,
  });

  const runtimeSync = command(
    process.execPath,
    [path.join(__dirname, 'sync-component-runtime-report.js')],
    appRoot,
  );
  const runtimeAuditPath = path.join(repoRoot, 'docs', 'component-runtime-audit.json');
  const runtimeAudit = fs.existsSync(runtimeAuditPath) ? readJson(runtimeAuditPath) : null;
  const storybookIndexPath = path.join(appRoot, 'storybook-static', 'index.json');
  const storybookIndex = fs.existsSync(storybookIndexPath)
    ? readJson(storybookIndexPath)
    : { entries: {} };
  const storybookEntries = Object.values(storybookIndex.entries || {});
  const storybookCounts = {
    entries: storybookEntries.length,
    stories: storybookEntries.filter(entry => entry.type === 'story').length,
    docs: storybookEntries.filter(entry => entry.type === 'docs').length,
  };
  const runtimeAuditPassed =
    runtimeSync.status === 0 &&
    runtimeAudit?.status === 'passed' &&
    runtimeAudit?.storybook?.entries === storybookCounts.entries &&
    runtimeAudit?.storybook?.stories === storybookCounts.stories &&
    runtimeAudit?.storybook?.docs === storybookCounts.docs &&
    runtimeAudit?.summary?.loaded === runtimeAudit?.summary?.runtimeEvidenceEntries &&
    runtimeAudit?.summary?.runtimeCoverageDelta >= 0 &&
    runtimeAudit?.summary?.runtimeCoverageDelta <= 1 &&
    runtimeAudit?.summary?.loaded + runtimeAudit?.summary?.runtimeCoverageDelta === storybookCounts.entries &&
    runtimeAudit?.summary?.failed === 0 &&
    runtimeAudit?.summary?.consoleWarnings === 0 &&
    runtimeAudit?.summary?.consoleErrors === 0 &&
    fs.existsSync(storybookIndexPath) &&
    runtimeAudit?.storybook?.indexSha256 === sha256(storybookIndexPath);
  add('component-runtime-audit', runtimeAuditPassed ? 'passed' : 'failed', true, {
    status: runtimeAudit?.status || null,
    syncExitCode: runtimeSync.status,
    entries: runtimeAudit?.storybook?.entries ?? null,
    stories: runtimeAudit?.storybook?.stories ?? null,
    docs: runtimeAudit?.storybook?.docs ?? null,
    loaded: runtimeAudit?.summary?.loaded ?? null,
    runtimeCoverageDelta: runtimeAudit?.summary?.runtimeCoverageDelta ?? null,
    browserTests: runtimeAudit?.summary?.browserTests ?? null,
    browserFailedTests: runtimeAudit?.summary?.browserFailedTests ?? null,
    buildBindingCurrent:
      fs.existsSync(storybookIndexPath) &&
      runtimeAudit?.storybook?.indexSha256 === sha256(storybookIndexPath),
  });

  const runtimePackages = packageRows.filter(
    item => item.name?.startsWith('@rovna-ui/') && !item.private,
  );
  const packageScopeCheck = command(
    process.execPath,
    [path.join(__dirname, 'run-supported-package-gate.js'), '--check-only'],
    appRoot,
  );
  const packageScopeReportPath = path.join(repoRoot, 'tmp', 'g07-supported-package-gate.json');
  const packageScopeReport = fs.existsSync(packageScopeReportPath)
    ? readJson(packageScopeReportPath)
    : null;
  const packageScopePassed =
    packageScopeCheck.status === 0 &&
    packageScopeReport?.status === 'passed' &&
    packageScopeReport?.configuredPackages === runtimePackages.length;
  add('runtime-package-scope', packageScopePassed ? 'passed' : 'failed', true, {
    total: runtimePackages.length,
    selected: packageScopeReport?.selectedPackages || 0,
    passed: packageScopeReport?.passedPackages || 0,
    classifications: packageScopeReport?.classificationCounts || null,
    gateExitCode: packageScopeCheck.status,
  });

  const releaseBoundary = readJson(path.join(appRoot, 'release-boundary.json'));
  const coreRows = releaseBoundary.publicReleasePackages.map(packageName =>
    packageRows.find(item => item.name === packageName),
  );
  const coreFailures = releaseBoundary.publicReleasePackages.filter(
    (packageName, index) => !coreRows[index] || !coreRows[index].dist,
  );
  add('core-package-artifacts', coreFailures.length === 0 ? 'passed' : 'failed', true, {
    expected: releaseBoundary.publicReleasePackages.length,
    withDist: coreRows.filter(item => item?.dist).length,
    failures: coreFailures,
  });

  const tarballRoot = path.join(releaseRoot, 'packages');
  const tarballs = fs.existsSync(tarballRoot)
    ? fs.readdirSync(tarballRoot).filter(file => file.endsWith('.tgz')).sort()
    : [];
  const checksumFile = path.join(releaseRoot, 'SHA256SUMS');
  const checksumFailures = [];
  if (fs.existsSync(checksumFile)) {
    for (const line of fs.readFileSync(checksumFile, 'utf8').split(/\r?\n/)) {
      const match = line.match(/^([a-fA-F0-9]{64})\s+(.+)$/);
      if (!match) continue;
      const filePath = path.join(releaseRoot, match[2].replaceAll('/', path.sep));
      if (!fs.existsSync(filePath) || sha256(filePath) !== match[1].toLowerCase()) {
        checksumFailures.push(match[2]);
      }
    }
  }
  const releasePassed =
    tarballs.length === releaseBoundary.publicReleasePackages.length &&
    fs.existsSync(path.join(releaseRoot, 'publication-manifest.json')) &&
    fs.existsSync(checksumFile) &&
    checksumFailures.length === 0;
  add('release-integrity', releasePassed ? 'passed' : 'failed', true, {
    tarballs: tarballs.length,
    expected: releaseBoundary.publicReleasePackages.length,
    checksumFailures,
  });

  const storybookSmoke = command(
    process.execPath,
    [path.join(__dirname, 'run-storybook-local.js'), '--smoke-suite', '--port=3100'],
    appRoot,
  );
  let storybookReport = null;
  const storybookReportPath = path.join(repoRoot, 'tmp', 'g03-storybook-launcher.json');
  if (fs.existsSync(storybookReportPath)) storybookReport = readJson(storybookReportPath);
  const storybookSmokePassed =
    storybookSmoke.status === 0 &&
    storybookReport?.status === 'passed' &&
    storybookReport?.driveReleased === true;
  add('storybook-smoke-suite', storybookSmokePassed ? 'passed' : 'failed', true, {
    exitCode: storybookSmoke.status,
    report: storybookReport,
    outputTail: `${storybookSmoke.stdout || ''}${storybookSmoke.stderr || ''}`.trim().slice(-2000),
  });

  const sourceAudit = command(
    process.execPath,
    [path.join(appRoot, 'scripts', 'audit-github-source-snapshot.js')],
    repoRoot,
  );
  const sourceReportPath = path.join(repoRoot, 'tmp', 'f17-github-snapshot-audit.json');
  const sourceReport = fs.existsSync(sourceReportPath) ? readJson(sourceReportPath) : null;
  const sourcePolicyPassed =
    sourceAudit.status === 0 &&
    sourceReport?.secretFindings?.length === 0 &&
    sourceReport?.internalReferences?.activeSourceFiles?.length === 0 &&
    sourceReport?.internalReferences?.unreviewedReferenceOnlyFiles?.length === 0;
  add('source-policy', sourcePolicyPassed ? 'passed' : 'failed', true, {
    secrets: sourceReport?.secretFindings?.length ?? null,
    activeInternalReferences: sourceReport?.internalReferences?.activeSourceFiles?.length ?? null,
    unreviewedReferences:
      sourceReport?.internalReferences?.unreviewedReferenceOnlyFiles?.length ?? null,
  });

  const gitHead = command('git', ['rev-parse', '--verify', 'HEAD']);
  const gitOrigin = command('git', ['remote', 'get-url', 'origin']);
  add('git-baseline', gitHead.status === 0 ? 'passed' : 'warning', false, {
    initialCommit: gitHead.status === 0,
    originConfigured: gitOrigin.status === 0,
  });
  add('owner-publication-gates', 'accepted-risk', false, {
    rootLicense: fs.existsSync(path.join(repoRoot, 'LICENSE')),
    scopeOwnership: readJson(path.join(appRoot, 'publication-target.json')).scopeStrategy
      .ownershipStatus,
    publicationAllowed: false,
  });
  const testReportPath = path.join(repoRoot, 'tmp', 'g10-ds-only-tests', 'report.json');
  const testReport = fs.existsSync(testReportPath) ? readJson(testReportPath) : null;
  const testExecutionPassed =
    ['passed', 'passed-with-classified-visual-drift'].includes(testReport?.status) &&
    testReport?.summary?.testFiles === testFiles.length &&
    testReport?.summary?.failedPackages === 0 &&
    testReport?.summary?.blockingFailures?.length === 0;
  add('test-execution', testExecutionPassed ? 'passed' : 'failed', true, {
    status: testReport?.status || null,
    discovered: testFiles.length,
    executed: testReport?.summary?.testFiles ?? 0,
    packages: testReport?.summary?.packages ?? 0,
    passedTests: testReport?.summary?.passedTests ?? 0,
    tests: testReport?.summary?.tests ?? 0,
    blockingFailures: testReport?.summary?.blockingFailures || [],
    classifiedVisualPackages: testReport?.summary?.visualSnapshotDrift || [],
    classifiedSnapshotFailures: testReport?.summary?.failedTests ?? 0,
  });

  const releaseRehearsalPath = path.join(repoRoot, 'tmp', 'g11-ds-only-release-rehearsal.json');
  const releaseRehearsal = fs.existsSync(releaseRehearsalPath)
    ? readJson(releaseRehearsalPath)
    : null;
  const releaseRehearsalPassed =
    releaseRehearsal?.status === 'passed' &&
    releaseRehearsal?.verification?.supportedPackagesPassed === 21 &&
    releaseRehearsal?.verification?.releasePackages ===
      releaseBoundary.publicReleasePackages.length &&
    releaseRehearsal?.verification?.consumerInstall?.includes('passed') &&
    releaseRehearsal?.verification?.consumerBuild?.includes('passed') &&
    releaseRehearsal?.verification?.consumerDomSmoke === 'passed' &&
    releaseRehearsal?.verification?.archiveChecksumMatches === true &&
    releaseRehearsal?.verification?.registryContacted === false &&
    releaseRehearsal?.verification?.publicationPerformed === false;
  add('release-rehearsal', releaseRehearsalPassed ? 'passed' : 'failed', true, {
    status: releaseRehearsal?.status || null,
    supportedArtifacts: releaseRehearsal?.verification?.supportedPackagesPassed ?? 0,
    releasePackages: releaseRehearsal?.verification?.releasePackages ?? 0,
    consumerInstall: releaseRehearsal?.verification?.consumerInstall || null,
    consumerBuild: releaseRehearsal?.verification?.consumerBuild || null,
    consumerDomSmoke: releaseRehearsal?.verification?.consumerDomSmoke || null,
    archiveSha256: releaseRehearsal?.verification?.archiveSha256 || null,
    archiveChecksumMatches:
      releaseRehearsal?.verification?.archiveChecksumMatches === true,
  });
  const consumerReportPath = path.join(repoRoot, 'tmp', 'g12-ds-only-consumers', 'report.json');
  const consumerReport = fs.existsSync(consumerReportPath) ? readJson(consumerReportPath) : null;
  const isolatedConsumersPassed =
    consumerReport?.status === 'passed' &&
    consumerReport?.summary?.total === 3 &&
    consumerReport?.summary?.passed === 3 &&
    consumerReport?.summary?.failed?.length === 0;
  add('isolated-consumers', isolatedConsumersPassed ? 'passed' : 'failed', true, {
    examplesPresent: ['consumer-smoke', 'consumer-clean-package', 'consumer-tarball'],
    status: consumerReport?.status || null,
    passed: consumerReport?.summary?.passed ?? 0,
    total: consumerReport?.summary?.total ?? 3,
    failed: consumerReport?.summary?.failed || [],
    releaseTarballConsumerVerified: releaseRehearsalPassed,
  });

  const qRuntime = readJson(path.join(repoRoot, 'tmp', 'q02-story-render-report.json'));
  const qCrossBrowser = readJson(path.join(repoRoot, 'docs', 'q07-cross-browser-report.json'));
  const qBrowserResult = qCrossBrowser.results?.find(result => result.browser === 'chromium');
  const qBrowser = qBrowserResult?.testReport || {};
  const qFlakiness = readJson(path.join(repoRoot, 'tmp', 'q13-story-flakiness.json'));
  const qBrowserRuntimePassed =
    qRuntime.status === 'passed' &&
    qRuntime.entries === qRuntime.stories + qRuntime.docs &&
    storybookCounts.entries - qRuntime.entries >= 0 &&
    storybookCounts.entries - qRuntime.entries <= 1 &&
    storybookCounts.stories - qRuntime.stories === storybookCounts.entries - qRuntime.entries &&
    qRuntime.docs === storybookCounts.docs &&
    qRuntime.failed === 0 &&
    qCrossBrowser.status === 'passed' &&
    qBrowserResult?.status === 'passed' &&
    qBrowserResult?.reportFresh === true &&
    qBrowser.numTotalTests === storybookCounts.stories &&
    qBrowser.numFailedTests === 0 &&
    qFlakiness.status === 'passed' &&
    qFlakiness.newFlakes.length === 0 &&
    qFlakiness.unresolved.length === 0;
  add('q-full-browser-runtime', qBrowserRuntimePassed ? 'passed' : 'failed', true, {
    index: storybookCounts,
    runtime: {
      status: qRuntime.status,
      passed: qRuntime.passed,
      failed: qRuntime.failed,
      initialFailures: qRuntime.initialFailures.length,
      coverageDelta: storybookCounts.entries - qRuntime.entries,
    },
    browser: {
      suites: qBrowser.numTotalTestSuites,
      tests: qBrowser.numTotalTests,
      failedTests: qBrowser.numFailedTests,
    },
    flakiness: {
      status: qFlakiness.status,
      newFlakes: qFlakiness.newFlakes.length,
    },
  });

  const accessibility = readJson(path.join(repoRoot, 'docs', 'accessibility-full-report.json'));
  const accessibilityBaseline = readJson(
    path.join(repoRoot, 'docs', 'q13-accessibility-baseline-check.json'),
  );
  const accessibilityPassed =
    accessibility.status === 'passed' &&
    accessibility.summary?.stories === storybookCounts.stories &&
    accessibility.summary?.failedAudits === 0 &&
    accessibility.summary?.violationNodeCount === 0 &&
    accessibilityBaseline.status === 'passed' &&
    accessibilityBaseline.added.length === 0 &&
    accessibilityBaseline.changed.length === 0;
  add('q-accessibility', accessibilityPassed ? 'passed' : 'failed', true, {
    stories: accessibility.summary?.stories,
    violations: accessibility.summary?.violationNodeCount,
    incompleteBaseline: accessibilityBaseline.currentWarnings,
    addedWarnings: accessibilityBaseline.added.length,
    changedWarnings: accessibilityBaseline.changed.length,
  });

  const visual = readJson(path.join(repoRoot, 'tmp', 'q05-visual-responsive-report.json'));
  const responsive = readJson(path.join(repoRoot, 'docs', 'q06-responsive-layout-report.json'));
  const visualResponsivePassed =
    visual.status === 'passed' &&
    visual.checks >= 68 &&
    visual.failed === 0 &&
    responsive.status === 'passed' &&
    responsive.checks === 69 &&
    responsive.failed === 0;
  add('q-visual-responsive', visualResponsivePassed ? 'passed' : 'failed', true, {
    visual: { checks: visual.checks, failed: visual.failed },
    responsive: { checks: responsive.checks, failed: responsive.failed },
  });

  const crossBrowser = readJson(path.join(repoRoot, 'docs', 'q07-cross-browser-report.json'));
  const inputModes = readJson(path.join(repoRoot, 'docs', 'q07-input-modes-report.json'));
  const crossBrowserPassed =
    crossBrowser.status === 'passed' &&
    crossBrowser.failed === 0 &&
    ['chromium', 'webkit', 'firefox'].every(browser =>
      String(crossBrowser.browserStatus?.[browser] || '').startsWith('verified-'),
    ) &&
    inputModes.status === 'passed' &&
    inputModes.failed === 0 &&
    inputModes.blocked === 0;
  add(
    'q-cross-browser-input',
    crossBrowserPassed ? 'passed' : 'failed',
    true,
    {
      chromium: crossBrowser.browserStatus?.chromium,
      webkit: crossBrowser.browserStatus?.webkit,
      firefox: crossBrowser.browserStatus?.firefox,
      inputChecksPassed: inputModes.passed,
      environmentMitigations: crossBrowser.environmentMitigations?.length || 0,
    },
  );

  const staticLanguage = readJson(path.join(repoRoot, 'docs', 'q08-static-language-report.json'));
  const runtimeLanguage = readJson(path.join(repoRoot, 'docs', 'q08-runtime-language-report.json'));
  const languagePassed =
    staticLanguage.status === 'passed' &&
    staticLanguage.storyFiles === inventory.storyFiles &&
    runtimeLanguage.status === 'passed' &&
    runtimeLanguage.stories === qRuntime.stories &&
    storybookCounts.stories - runtimeLanguage.stories >= 0 &&
    storybookCounts.stories - runtimeLanguage.stories <= 1 &&
    runtimeLanguage.englishUiFindings === 0 &&
    runtimeLanguage.mojibakeFindings === 0;
  add('q-primary-language-runtime', languagePassed ? 'passed' : 'failed', true, {
    storyFiles: staticLanguage.storyFiles,
    runtimeStories: runtimeLanguage.stories,
    runtimeCoverageDelta: storybookCounts.stories - runtimeLanguage.stories,
    englishFindings: runtimeLanguage.englishUiFindings,
    mojibakeFindings: runtimeLanguage.mojibakeFindings,
  });

  const unitReliability = readJson(path.join(repoRoot, 'docs', 'q09-unit-reliability-report.json'));
  const performance = readJson(path.join(repoRoot, 'docs', 'q12-performance-report.json'));
  const reliabilityPerformancePassed =
    unitReliability.status === 'passed-with-classified-test-harness-warnings' &&
    performance.status === 'passed' &&
    performance.findingCount === 0;
  add('q-reliability-performance', reliabilityPerformancePassed ? 'passed' : 'failed', true, {
    unitReliability: unitReliability.status,
    performance: performance.status,
    performanceFindings: performance.findingCount,
  });

  const ciContract = readJson(path.join(repoRoot, 'docs', 'q13-ci-quality-report.json'));
  const reactCompatibility = readJson(path.join(repoRoot, 'docs', 'react-compatibility.json'));
  const ciReleasePassed =
    ciContract.status === 'passed' &&
    ciContract.failedChecks.length === 0 &&
    reactCompatibility.status === 'runtime-passed' &&
    reactCompatibility.rows.length === 3 &&
    reactCompatibility.rows.every(
      row => row.install === 'passed' && row.build === 'passed' && row.domSmoke === 'passed',
    );
  add('q-ci-react-contract', ciReleasePassed ? 'passed' : 'failed', true, {
    ciChecks: ciContract.checks.length,
    ciFailedChecks: ciContract.failedChecks,
    remoteExecution: ciContract.remoteExecution,
    reactRows: reactCompatibility.rows.map(row => ({
      react: row.react,
      install: row.install,
      build: row.build,
      domSmoke: row.domSmoke,
      peerContract: row.peerContract,
    })),
  });

  const mockCoverage = readJson(path.join(repoRoot, 'docs', 'storybook-mock-coverage.json'));
  const pendingTests = readJson(path.join(repoRoot, 'docs', 'pending-tests-decisions.json'));
  add('q-documented-backlog', 'accepted-risk', false, {
    directStoryGaps: coverageReport.summary.coverage['documented-gap'],
    partialOrGapMockStates: mockCoverage.summary.remainingGaps,
    classifiedPendingTests: pendingTests.summary.currentPendingTotal,
    experimentalSourceOnlyPackages:
      packageScopeReport.classificationCounts['experimental/source-only'],
    supportedPackagesWithSourceMaps: packageScopeReport.results.filter(
      result => result.artifact?.sourceMaps > 0,
    ).length,
  });
  add('q-remote-ci', 'accepted-risk', false, {
    originConfigured: gitOrigin.status === 0,
    remoteRun: 'pending-first-GitHub-run',
  });
  add('q-container-runtime', 'accepted-risk', false, {
    requiredForLocalStorybook: false,
    runtimeVerified: false,
    reason: 'Docker CLI is unavailable; the container recipe is statically validated.',
  });

  const blockingFailures = checks.filter(check => check.blocking && check.status !== 'passed');
  const warnings = checks.filter(check => check.status === 'warning');
  const acceptedRisks = checks.filter(check => check.status === 'accepted-risk');
  const report = {
    status: blockingFailures.length
      ? 'blocked'
      : acceptedRisks.length || warnings.length
        ? 'passed-with-accepted-risks'
        : 'passed',
    mode: 'ds-only-with-q-gates',
    checkedAt: new Date().toISOString(),
    networkInstallAllowed: false,
    externalConsumerUsed: false,
    checks,
    summary: {
      passed: checks.filter(check => check.status === 'passed').length,
      warnings: warnings.length,
      acceptedRisks: acceptedRisks.map(check => check.id),
      blockingFailures: blockingFailures.map(check => check.id),
    },
    durationMs: Date.now() - startedAt,
  };

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(qFinalReportPath, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(documentedQReportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Q-14 DS-only quality gate: ${report.status}`);
  console.log(
    `Passed: ${report.summary.passed}; accepted risks: ${report.summary.acceptedRisks.length}; blocking failures: ${report.summary.blockingFailures.length}`,
  );
  console.log(
    `Inventory: ${inventory.workspaces} workspaces, ${inventory.storyFiles} stories, ${inventory.mdxFiles} MDX, ${inventory.testFiles} tests`,
  );
  console.log(`Report: ${reportPath}`);
  console.log(`Q report: ${qFinalReportPath}`);
  console.log(`Documented Q report: ${documentedQReportPath}`);

  process.exitCode = blockingFailures.length ? 1 : 0;
}

try {
  main();
} catch (error) {
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(
    reportPath,
    `${JSON.stringify(
      {
        status: 'failed',
        error: error instanceof Error ? error.stack || error.message : String(error),
      },
      null,
      2,
    )}\n`,
  );
  fs.copyFileSync(reportPath, qFinalReportPath);
  fs.copyFileSync(reportPath, documentedQReportPath);
  console.error(error instanceof Error ? error.stack || error.message : error);
  process.exitCode = 1;
}
