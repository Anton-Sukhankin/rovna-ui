const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { JSDOM } = require('jsdom');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const examplesRoot = path.join(repoRoot, 'examples');
const reportRoot = path.join(repoRoot, 'tmp', 'g12-ds-only-consumers');
const reportPath = path.join(reportRoot, 'report.json');
const viteBin = path.join(appRoot, 'node_modules', 'vite', 'bin', 'vite.js');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function run(command, args, cwd) {
  const startedAt = Date.now();
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    timeout: 1200000,
    env: {
      ...process.env,
      CI: '1',
      COREPACK_ENABLE_NETWORK: '0',
      npm_config_offline: 'true',
    },
    stdio: 'pipe',
  });
  return {
    status: result.status,
    signal: result.signal || null,
    error: result.error ? result.error.message : null,
    durationMs: Date.now() - startedAt,
    output: `${result.stdout || ''}${result.stderr || ''}`,
  };
}

function findBundle(distRoot) {
  const assetsRoot = path.join(distRoot, 'assets');
  if (!fs.existsSync(assetsRoot)) return null;
  return fs
    .readdirSync(assetsRoot)
    .filter(file => file.endsWith('.js'))
    .map(file => path.join(assetsRoot, file))
    .sort((left, right) => fs.statSync(right).size - fs.statSync(left).size)[0] || null;
}

async function verifyDom(exampleRoot, contract) {
  const distRoot = path.join(exampleRoot, 'dist');
  const htmlPath = path.join(distRoot, 'index.html');
  const bundlePath = findBundle(distRoot);
  if (!fs.existsSync(htmlPath) || !bundlePath) {
    throw new Error(`${contract.id}: built HTML or JavaScript bundle is missing`);
  }

  const dom = new JSDOM(fs.readFileSync(htmlPath, 'utf8'), {
    runScripts: 'outside-only',
    url: `http://127.0.0.1/${contract.id}/`,
    pretendToBeVisual: true,
  });
  dom.window.matchMedia = () => ({
    matches: false,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() { return false; },
  });
  dom.window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  dom.window.scrollTo = () => {};
  dom.window.eval(fs.readFileSync(bundlePath, 'utf8'));
  await new Promise(resolve => setTimeout(resolve, 150));

  const root = dom.window.document.querySelector(contract.rootSelector);
  const buttons = [...dom.window.document.querySelectorAll('button')];
  const expectedButton = buttons.find(button => button.textContent.trim() === contract.buttonText);
  const logo = contract.logoSelector
    ? dom.window.document.querySelector(contract.logoSelector)
    : null;
  const passed = Boolean(root && expectedButton && (!contract.logoSelector || logo));
  const result = {
    passed,
    bundle: path.relative(repoRoot, bundlePath).replace(/\\/g, '/'),
    bundleBytes: fs.statSync(bundlePath).size,
    rootFound: Boolean(root),
    buttonCount: buttons.length,
    expectedButtonFound: Boolean(expectedButton),
    logoFound: contract.logoSelector ? Boolean(logo) : null,
  };
  dom.window.close();
  return result;
}

async function runBuiltExample(contract) {
  const exampleRoot = path.join(examplesRoot, contract.directory);
  const build = run(
    process.execPath,
    [
      viteBin,
      'build',
      '--config',
      path.join(exampleRoot, 'vite.config.mjs'),
      '--configLoader',
      'runner',
    ],
    appRoot,
  );
  fs.writeFileSync(path.join(reportRoot, `${contract.id}-build.log`), build.output);
  const moduleMatch = build.output.match(/(\d+) modules transformed/);
  const dom = build.status === 0
    ? await verifyDom(exampleRoot, contract)
    : { passed: false, error: 'Build failed; DOM verification was not run.' };
  return {
    id: contract.id,
    route: contract.route,
    status: build.status === 0 && dom.passed ? 'passed' : 'failed',
    build: {
      exitCode: build.status,
      signal: build.signal,
      error: build.error,
      durationMs: build.durationMs,
      transformedModules: moduleMatch ? Number(moduleMatch[1]) : null,
      log: path.relative(repoRoot, path.join(reportRoot, `${contract.id}-build.log`)).replace(/\\/g, '/'),
    },
    dom,
  };
}

async function main() {
  fs.mkdirSync(reportRoot, { recursive: true });
  const startedAt = Date.now();
  const consumers = [];
  const reuseTarball = process.argv.includes('--reuse-tarball');

  consumers.push(await runBuiltExample({
    id: 'consumer-smoke',
    directory: 'consumer-smoke',
    route: 'diagnostic-local-aliases',
    rootSelector: '[data-testid="consumer-smoke"]',
    buttonText: 'F-07 Smoke Button',
  }));
  consumers.push(await runBuiltExample({
    id: 'consumer-clean-package',
    directory: 'consumer-clean-package',
    route: 'built-package-exports',
    rootSelector: '[data-testid="consumer-clean-package-smoke"]',
    buttonText: 'F-09 Clean Package Button',
    logoSelector: 'svg',
  }));

  const tarballResultPath = path.join(repoRoot, 'tmp', 'f13-local-tarball-rehearsal', 'result.json');
  const tarballRun = reuseTarball
    ? {
        status: 0,
        signal: null,
        error: null,
        durationMs: 0,
        output: 'Reused the immediately preceding successful offline tarball rehearsal.\n',
      }
    : run(
        process.execPath,
        [path.join(__dirname, 'rehearse-local-tarball-install.js')],
        appRoot,
      );
  fs.writeFileSync(path.join(reportRoot, 'consumer-tarball.log'), tarballRun.output);
  const tarballResult = fs.existsSync(tarballResultPath) ? readJson(tarballResultPath) : null;
  const tarballPassed =
    tarballRun.status === 0 &&
    tarballResult?.status === 'passed' &&
    tarballResult?.consumer?.install?.includes('passed') &&
    tarballResult?.consumer?.build?.includes('passed') &&
    tarballResult?.consumer?.domSmoke === 'passed';
  consumers.push({
    id: 'consumer-tarball',
    route: 'isolated-registry-free-tarballs',
    status: tarballPassed ? 'passed' : 'failed',
    execution: {
      exitCode: tarballRun.status,
      signal: tarballRun.signal,
      error: tarballRun.error,
      durationMs: tarballRun.durationMs,
      mode: reuseTarball ? 'reused-fresh-report' : 'fresh',
      log: path.relative(repoRoot, path.join(reportRoot, 'consumer-tarball.log')).replace(/\\/g, '/'),
    },
    install: tarballResult?.consumer?.install || null,
    build: tarballResult?.consumer?.build || null,
    domSmoke: tarballResult?.consumer?.domSmoke || null,
    releaseTarballs: tarballResult?.packedTarballs?.length ?? null,
    registryContacted: false,
  });

  const failures = consumers.filter(consumer => consumer.status !== 'passed');
  const report = {
    status: failures.length ? 'failed' : 'passed',
    mode: 'ds-only-offline-consumers',
    checkedAt: new Date().toISOString(),
    networkInstallAllowed: false,
    closedCorporateSourceUsed: false,
    externalProjectUsed: false,
    consumers,
    summary: {
      total: consumers.length,
      passed: consumers.length - failures.length,
      failed: failures.map(consumer => consumer.id),
    },
    durationMs: Date.now() - startedAt,
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`G-12 DS-only consumers: ${report.status}`);
  for (const consumer of consumers) console.log(`${consumer.id}: ${consumer.status}`);
  console.log(`Report: ${reportPath}`);
  process.exitCode = failures.length ? 1 : 0;
}

main().catch(error => {
  fs.mkdirSync(reportRoot, { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify({ status: 'failed', error: error.stack || error.message }, null, 2)}\n`);
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
