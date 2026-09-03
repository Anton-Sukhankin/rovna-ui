const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const releaseRoot = path.join(repoRoot, 'release', 'rovna-ui-4.82.0');
const packagesRoot = path.join(releaseRoot, 'packages');
const exampleRoot = path.join(repoRoot, 'examples', 'consumer-tarball');
const runId = new Date().toISOString().replace(/[:.]/g, '-');
const outputRoot = path.join(repoRoot, 'tmp', 'h08-react-compatibility-runs', runId);
const reportPath = path.join(repoRoot, 'docs', 'react-compatibility.json');
const releaseArchivePath = path.join(repoRoot, 'release', 'rovna-ui-4.82.0-release-bundle.tgz');
const cachedYarnRuntimePath = path.join(
  process.env.LOCALAPPDATA || '',
  'node',
  'corepack',
  'v1',
  'yarn',
  '1.22.15',
  'bin',
  'yarn.js',
);

const matrix = [
  { major: 17, react: '17.0.2', reactDom: '17.0.2', reactIs: '17.0.2' },
  { major: 18, react: '18.3.1', reactDom: '18.3.1', reactIs: '18.3.1' },
  { major: 19, react: '19.2.8', reactDom: '19.2.8', reactIs: '19.2.8' },
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function toPosix(value) {
  return value.replace(/\\/g, '/');
}

function runYarn(args, cwd, timeout = 300000) {
  const hasCachedRuntime = fs.existsSync(cachedYarnRuntimePath);
  const command = hasCachedRuntime
    ? process.execPath
    : process.platform === 'win32'
      ? 'yarn.cmd'
      : 'yarn';
  const commandArgs = hasCachedRuntime ? [cachedYarnRuntimePath, ...args] : args;

  return spawnSync(command, commandArgs, {
    cwd,
    encoding: 'utf8',
    timeout,
    env: {
      ...process.env,
      CI: '1',
      COREPACK_ENABLE_NETWORK: '1',
      npm_config_registry: 'https://registry.npmjs.org',
    },
    stdio: 'pipe',
  });
}

function copyFile(relative, targetRoot) {
  const target = path.join(targetRoot, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(path.join(exampleRoot, relative), target);
}

function sourceFor(major) {
  const renderImport = major === 17
    ? "import ReactDOM from 'react-dom';"
    : "import { createRoot } from 'react-dom/client';";
  const renderCall = major === 17
    ? "ReactDOM.render(<App />, document.getElementById('root'));"
    : "createRoot(document.getElementById('root')).render(<App />);";

  return `import React from 'react';
${renderImport}
import { RovnaUI } from '@rovna-ui/components/theme';
import { Button } from '@rovna-ui/components/primitives/Button';
import { Breadcrumbs } from '@rovna-ui/components/primitives/Breadcrumbs';

RovnaUI.init();

function App() {
  return (
    <RovnaUI lang="ru" theme="samolet">
      <main data-testid="f13-tarball-consumer">
        <Breadcrumbs
          items={[
            { key: 'home', label: 'Главная', href: '/' },
            { key: 'projects', label: 'Проекты', href: '/projects' },
            { key: 'current', label: 'Карточка проекта' },
          ]}
        />
        <Button variant="primary" size="medium">
          F-14 Tarball Button
        </Button>
      </main>
    </RovnaUI>
  );
}

${renderCall}
`;
}

function main() {
  const yarnVersion = runYarn(['--version'], appRoot, 120000);
  if (yarnVersion.status !== 0) {
    throw new Error(
      `Yarn 1 runtime is unavailable: ${yarnVersion.error?.message || yarnVersion.stderr || yarnVersion.status}`,
    );
  }
  if (!fs.existsSync(releaseArchivePath)) {
    throw new Error(`Missing release archive: ${releaseArchivePath}`);
  }
  const manifest = readJson(path.join(releaseRoot, 'publication-manifest.json'));
  const packageByName = new Map(manifest.packages.map(entry => [entry.name, entry]));
  const requiredNames = new Set();
  const queue = ['@rovna-ui/components'];
  while (queue.length > 0) {
    const packageName = queue.shift();
    if (requiredNames.has(packageName)) continue;
    const entry = packageByName.get(packageName);
    if (!entry) throw new Error(`Missing release dependency: ${packageName}`);
    requiredNames.add(packageName);
    queue.push(...entry.internalDependencies);
  }
  const packageResolutions = Object.fromEntries(
    [...requiredNames].map(packageName => [
      packageName,
      `file:${toPosix(path.join(packagesRoot, packageByName.get(packageName).file))}`,
    ]),
  );
  const rootEntry = manifest.packages.find(entry => entry.name === '@rovna-ui/components');
  if (!rootEntry) throw new Error('Root release tarball is missing');

  fs.mkdirSync(outputRoot, { recursive: true });
  const rows = [];

  for (const target of matrix) {
    const consumerRoot = path.join(outputRoot, `react-${target.major}`);
    fs.mkdirSync(consumerRoot, { recursive: true });
    for (const relative of ['index.html', 'vite.config.mjs', 'verify-dom.cjs']) {
      copyFile(relative, consumerRoot);
    }
    fs.mkdirSync(path.join(consumerRoot, 'src'), { recursive: true });
    fs.writeFileSync(path.join(consumerRoot, 'src', 'main.jsx'), sourceFor(target.major));
    fs.writeFileSync(
      path.join(consumerRoot, '.yarnrc'),
      '"registry" "https://registry.npmjs.org"\n',
    );

    const packageJson = {
      name: `rovna-ui-react-${target.major}-compatibility`,
      version: '1.0.0',
      private: true,
      packageManager: 'yarn@1.22.15',
      scripts: {
        build: 'vite build --configLoader runner',
        verify: 'node verify-dom.cjs',
      },
      dependencies: {
        '@rovna-ui/components': `file:${toPosix(path.join(packagesRoot, rootEntry.file))}`,
        react: target.react,
        'react-dom': target.reactDom,
        'react-is': target.reactIs,
        'styled-components': '5.3.11',
      },
      devDependencies: {
        '@vitejs/plugin-react': '5.1.0',
        jsdom: '20.0.3',
        vite: '7.1.12',
      },
      resolutions: packageResolutions,
    };
    fs.writeFileSync(
      path.join(consumerRoot, 'package.json'),
      `${JSON.stringify(packageJson, null, 2)}\n`,
    );

    const install = runYarn(
      [
        'install',
        '--ignore-scripts',
        '--ignore-engines',
        '--non-interactive',
        '--registry',
        'https://registry.npmjs.org',
        '--cache-folder',
        path.join(consumerRoot, '.yarn-cache'),
      ],
      consumerRoot,
      600000,
    );
    const installOutput = `${install.stdout || ''}${install.stderr || ''}`;
    fs.writeFileSync(path.join(consumerRoot, 'install.log'), installOutput);
    const peerWarnings = installOutput
      .split(/\r?\n/)
      .filter(line => /unmet peer dependency|incorrect peer dependency/i.test(line));

    let build = { status: null, stdout: '', stderr: '' };
    let verify = { status: null, stdout: '', stderr: '' };
    if (install.status === 0) {
      build = runYarn(['build'], consumerRoot, 300000);
      if (build.status === 0) verify = runYarn(['verify'], consumerRoot, 120000);
    }
    fs.writeFileSync(
      path.join(consumerRoot, 'build.log'),
      `${build.stdout || ''}${build.stderr || ''}`,
    );
    fs.writeFileSync(
      path.join(consumerRoot, 'verify.log'),
      `${verify.stdout || ''}${verify.stderr || ''}`,
    );

    rows.push({
      react: target.react,
      reactDom: target.reactDom,
      install: install.status === 0 ? 'passed' : 'failed',
      build: build.status === 0 ? 'passed' : 'failed',
      domSmoke: verify.status === 0 ? 'passed' : 'failed',
      peerContract: target.major === 17 ? 'declared-supported' : 'runtime-only-unverified-peer',
      peerWarnings,
      logs: path.relative(repoRoot, consumerRoot).replace(/\\/g, '/'),
    });
    console.log(
      `React ${target.react}: install=${rows.at(-1).install}, build=${rows.at(-1).build}, dom=${rows.at(-1).domSmoke}, peerWarnings=${peerWarnings.length}`,
    );
  }

  const report = {
    formatVersion: 1,
    status: rows.every(row => row.install === 'passed' && row.build === 'passed' && row.domSmoke === 'passed')
      ? 'runtime-passed'
      : 'runtime-failed',
    checkedAt: new Date().toISOString(),
    sourcePolicy: 'public npm and local release tarballs only; no corporate source contacted',
    releaseArchive: path.relative(repoRoot, releaseArchivePath).replace(/\\/g, '/'),
    releaseArchiveSha256: sha256(releaseArchivePath),
    declaredPeerContract: 'React and ReactDOM ^17.0.2',
    rows,
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`H-08 React compatibility: ${report.status}`);
  console.log(`Report: ${reportPath}`);
  process.exitCode = report.status === 'runtime-passed' ? 0 : 1;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.stack || error.message : error);
  process.exitCode = 1;
}
