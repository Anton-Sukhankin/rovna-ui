const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const packagesRoot = path.join(appRoot, 'packages');
const reportPath = path.join(repoRoot, 'tmp', 'q00-baseline.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function command(commandName, args, cwd = appRoot) {
  const result = spawnSync(commandName, args, {
    cwd,
    encoding: 'utf8',
    shell: process.platform === 'win32',
    env: {
      ...process.env,
      COREPACK_ENABLE_NETWORK: '0',
      STORYBOOK_DISABLE_TELEMETRY: '1',
      npm_config_offline: 'true',
    },
    stdio: 'pipe',
  });

  return {
    status: result.status,
    stdout: (result.stdout || '').trim(),
    stderr: (result.stderr || '').trim(),
  };
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function directorySha256(root) {
  const hash = crypto.createHash('sha256');
  const files = walk(root, () => true);
  for (const file of files) {
    hash.update(path.relative(root, file).replace(/\\/g, '/'));
    hash.update('\0');
    hash.update(fs.readFileSync(file));
    hash.update('\0');
  }
  return { files: files.length, sha256: hash.digest('hex') };
}

function walk(root, predicate) {
  if (!fs.existsSync(root)) return [];
  const result = [];
  const queue = [root];

  while (queue.length) {
    const directory = queue.pop();
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) queue.push(absolute);
      else if (entry.isFile() && predicate(absolute)) result.push(absolute);
    }
  }

  return result.sort();
}

function installedVersion(packageName) {
  const manifestPath = path.join(appRoot, 'node_modules', packageName, 'package.json');
  return fs.existsSync(manifestPath) ? readJson(manifestPath).version : null;
}

function main() {
  const rootManifest = readJson(path.join(appRoot, 'package.json'));
  const storybookIndexPath = path.join(appRoot, 'storybook-static', 'index.json');
  const storybookIframePath = path.join(appRoot, 'storybook-static', 'iframe.html');
  const storybookIndex = readJson(storybookIndexPath);
  const entries = Object.values(storybookIndex.entries || {});
  const storyFiles = walk(packagesRoot, file => /\.stories\.(js|jsx|mjs|ts|tsx)$/.test(file));
  const mdxFiles = walk(packagesRoot, file => file.endsWith('.mdx'));
  const testFiles = walk(packagesRoot, file => /\.(test|spec)\.(js|jsx|ts|tsx)$/.test(file));
  const playFiles = storyFiles
    .map(file => ({
      file: path.relative(repoRoot, file).replace(/\\/g, '/'),
      playFunctions: (fs.readFileSync(file, 'utf8').match(/\bplay\s*:/g) || []).length,
    }))
    .filter(item => item.playFunctions > 0);
  const gitSha = command('git', ['rev-parse', 'HEAD'], repoRoot);
  const gitBranch = command('git', ['branch', '--show-current'], repoRoot);
  const gitStatus = command('git', ['status', '--short'], repoRoot);
  const npmVersion = command(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['--version']);
  const corepackVersion = command('corepack', ['--version']);
  const yarnVersion = command('corepack', ['yarn', '--version']);
  const testsReportPath = path.join(repoRoot, 'tmp', 'g10-ds-only-tests', 'report.json');
  const coverageReportPath = path.join(repoRoot, 'docs', 'component-story-coverage.json');
  const runtimeReportPath = path.join(repoRoot, 'docs', 'component-runtime-audit.json');
  const accessibilityReportPath = path.join(repoRoot, 'docs', 'accessibility-full-report.json');
  const accessibilityReport = fs.existsSync(accessibilityReportPath)
    ? readJson(accessibilityReportPath)
    : null;
  const staticBuildHash = directorySha256(path.join(appRoot, 'storybook-static'));

  const report = {
    formatVersion: 1,
    status: 'captured',
    capturedAt: new Date().toISOString(),
    mode: 'local-ds-only',
    networkAccessUsed: false,
    source: {
      commit: gitSha.stdout || null,
      branch: gitBranch.stdout || null,
      dirtyEntries: gitStatus.stdout ? gitStatus.stdout.split(/\r?\n/).length : 0,
    },
    environment: {
      platform: process.platform,
      architecture: process.arch,
      node: process.version,
      npm: npmVersion.stdout || null,
      corepack: corepackVersion.stdout || null,
      yarn: yarnVersion.stdout || null,
      packageManager: rootManifest.packageManager || null,
    },
    toolchain: {
      storybookDeclared: rootManifest.devDependencies?.storybook || null,
      installed: {
        storybook: installedVersion('storybook'),
        reactVite: installedVersion('@storybook/react-vite'),
        addonDocs: installedVersion('@storybook/addon-docs'),
        addonA11y: installedVersion('@storybook/addon-a11y'),
        addonVitest: installedVersion('@storybook/addon-vitest'),
        vite: installedVersion('vite'),
        vitest: installedVersion('vitest'),
        browserPlaywright: installedVersion('@vitest/browser-playwright'),
        playwright: installedVersion('playwright'),
        react: installedVersion('react'),
        reactDom: installedVersion('react-dom'),
      },
    },
    storybook: {
      indexSha256: sha256(storybookIndexPath),
      iframeSha256: sha256(storybookIframePath),
      staticBuildSha256: staticBuildHash.sha256,
      staticBuildFiles: staticBuildHash.files,
      entries: entries.length,
      stories: entries.filter(entry => entry.type === 'story').length,
      docs: entries.filter(entry => entry.type === 'docs').length,
      storyGroups: new Set(
        entries.filter(entry => entry.type === 'story').map(entry => entry.title),
      ).size,
      storyFiles: storyFiles.length,
      mdxFiles: mdxFiles.length,
      filesWithPlay: playFiles.length,
      playFunctions: playFiles.reduce((sum, item) => sum + item.playFunctions, 0),
      playFiles,
    },
    tests: {
      sourceFiles: testFiles.length,
      latestReport: fs.existsSync(testsReportPath) ? readJson(testsReportPath).summary : null,
    },
    reports: {
      componentCoverage: fs.existsSync(coverageReportPath)
        ? readJson(coverageReportPath).summary
        : null,
      componentRuntime: fs.existsSync(runtimeReportPath)
        ? readJson(runtimeReportPath).summary
        : null,
      accessibility: accessibilityReport
        ? {
            status: accessibilityReport.status,
            stories: accessibilityReport.summary?.stories
              ?? (Array.isArray(accessibilityReport.stories)
                ? accessibilityReport.stories.length
                : accessibilityReport.stories),
          }
        : null,
    },
  };

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
}

main();
