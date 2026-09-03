const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { JSDOM } = require('jsdom');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const reactCompatibilityReportPath = path.join(repoRoot, 'docs', 'react-compatibility.json');
let reactConsumerRoot;
const webpackExampleRoot = path.join(repoRoot, 'examples', 'consumer-webpack');
const outputRoot = path.join(repoRoot, 'tmp', 'r06-bundler-consumers');
const reportPath = path.join(repoRoot, 'docs', 'r06-bundler-compatibility.json');
const releaseArchivePath = path.join(repoRoot, 'release', 'rovna-ui-4.82.0-release-bundle.tgz');
const yarnRuntime = path.join(
  process.env.LOCALAPPDATA || '',
  'node',
  'corepack',
  'v1',
  'yarn',
  '1.22.15',
  'bin',
  'yarn.js',
);

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function run(command, args, cwd, timeout = 300000) {
  const startedAt = Date.now();
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    timeout,
    env: {
      ...process.env,
      CI: '1',
      COREPACK_ENABLE_NETWORK: '0',
      npm_config_offline: 'true',
    },
  });
  return {
    status: result.status === 0 ? 'passed' : 'failed',
    exitCode: result.status,
    durationMs: Date.now() - startedAt,
    output: `${result.stdout || ''}${result.stderr || ''}`,
  };
}

async function verifyBundle(bundlePath) {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
    runScripts: 'outside-only',
    url: 'http://127.0.0.1/r06-webpack/',
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
  const root = dom.window.document.querySelector('[data-testid="r06-webpack-consumer"]');
  const button = [...dom.window.document.querySelectorAll('button')]
    .find(element => element.textContent.trim() === 'Webpack-\u043a\u043d\u043e\u043f\u043a\u0430 Rovna UI');
  const logo = dom.window.document.querySelector(
    '[data-testid="rovna-ui-s-materials-icon"][aria-label="\u041b\u043e\u0433\u043e\u0442\u0438\u043f \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u043e\u0432"]',
  );
  const result = {
    status: root && button && logo ? 'passed' : 'failed',
    rootFound: Boolean(root),
    buttonFound: Boolean(button),
    logoFound: Boolean(logo),
  };
  dom.window.close();
  return result;
}

function runWebpack() {
  const webpack = require('webpack');
  const distRoot = path.join(outputRoot, 'webpack-dist');
  fs.rmSync(distRoot, { force: true, recursive: true });
  return new Promise(resolve => {
    const startedAt = Date.now();
    webpack({
      mode: 'production',
      context: webpackExampleRoot,
      entry: path.join(webpackExampleRoot, 'src', 'main.js'),
      output: { path: distRoot, filename: 'bundle.js' },
      resolve: {
        extensions: ['.js', '.json'],
        modules: [path.join(reactConsumerRoot, 'node_modules'), path.join(appRoot, 'node_modules')],
      },
      performance: {
        hints: 'warning',
        maxAssetSize: 400 * 1024,
        maxEntrypointSize: 400 * 1024,
      },
      devtool: false,
      target: 'web',
    }, (error, stats) => {
      const output = error ? error.stack || error.message : stats.toString({ all: false, errors: true, warnings: true });
      const failed = Boolean(error || stats?.hasErrors());
      resolve({
        status: failed ? 'failed' : 'passed',
        durationMs: Date.now() - startedAt,
        output,
        bundlePath: path.join(distRoot, 'bundle.js'),
        warnings: stats?.compilation?.warnings?.length || 0,
        errors: stats?.compilation?.errors?.length || (error ? 1 : 0),
      });
    });
  });
}

async function main() {
  const startedAt = Date.now();
  if (!fs.existsSync(reactCompatibilityReportPath)) {
    throw new Error('React compatibility report is missing. Run compatibility:react first.');
  }
  const reactCompatibility = JSON.parse(fs.readFileSync(reactCompatibilityReportPath, 'utf8'));
  const react17 = reactCompatibility.rows?.find(row => row.react?.startsWith('17.'));
  if (!react17?.logs) throw new Error('React 17 consumer path is missing from the report.');
  reactConsumerRoot = path.join(repoRoot, react17.logs);
  if (!fs.existsSync(path.join(reactConsumerRoot, 'node_modules', '@rovna-ui', 'components', 'package.json'))) {
    throw new Error('Fresh React 17 tarball consumer is missing. Run compatibility:react first.');
  }
  if (!fs.existsSync(releaseArchivePath)) throw new Error('Release archive is missing.');
  fs.mkdirSync(outputRoot, { recursive: true });

  const viteBuild = run(process.execPath, [yarnRuntime, 'build'], reactConsumerRoot, 300000);
  const viteDom = viteBuild.status === 'passed'
    ? run(process.execPath, [yarnRuntime, 'verify'], reactConsumerRoot, 120000)
    : { status: 'failed', exitCode: null, durationMs: 0, output: 'Build failed.' };
  fs.writeFileSync(path.join(outputRoot, 'vite.log'), `${viteBuild.output}\n${viteDom.output}`);

  const webpackBuild = await runWebpack();
  fs.writeFileSync(path.join(outputRoot, 'webpack.log'), webpackBuild.output);
  const webpackDom = webpackBuild.status === 'passed'
    ? await verifyBundle(webpackBuild.bundlePath)
    : { status: 'failed', rootFound: false, buttonFound: false, logoFound: false };
  const rows = [
    {
      bundler: 'Vite 7',
      status: viteBuild.status === 'passed' && viteDom.status === 'passed' ? 'passed' : 'failed',
      build: viteBuild.status,
      domSmoke: viteDom.status,
      source: 'fresh React 17 tarball consumer',
    },
    {
      bundler: 'Webpack 5',
      status: webpackBuild.status === 'passed' && webpackDom.status === 'passed' ? 'passed' : 'failed',
      build: webpackBuild.status,
      domSmoke: webpackDom.status,
      warnings: webpackBuild.warnings,
      errors: webpackBuild.errors,
      bundleBytes: fs.existsSync(webpackBuild.bundlePath) ? fs.statSync(webpackBuild.bundlePath).size : null,
      dom: webpackDom,
      source: 'examples/consumer-webpack with fresh React 17 tarball node_modules',
    },
  ];
  const failures = rows.filter(row => row.status !== 'passed');
  const report = {
    status: failures.length ? 'failed' : 'passed',
    checkedAt: new Date().toISOString(),
    networkInstallAllowed: false,
    releaseArchiveSha256: sha256(releaseArchivePath),
    rows,
    durationMs: Date.now() - startedAt,
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  for (const row of rows) console.log(`${row.bundler}: ${row.status}`);
  console.log(`R-06 bundler consumers: ${report.status}`);
  console.log(`Report: ${reportPath}`);
  if (failures.length) process.exitCode = 1;
}

main().catch(error => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
});
