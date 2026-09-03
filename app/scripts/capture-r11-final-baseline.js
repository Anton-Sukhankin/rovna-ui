const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const staticRoot = path.join(appRoot, 'storybook-static');
const packagesRoot = path.join(appRoot, 'packages');
const reportPath = path.join(repoRoot, 'docs', 'r11-final-baseline.json');

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function fileSha256(filePath) {
  return sha256(fs.readFileSync(filePath));
}

function walk(root) {
  if (!fs.existsSync(root)) return [];
  const files = [];
  const queue = [root];
  while (queue.length) {
    const current = queue.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) queue.push(absolute);
      else if (entry.isFile()) files.push(absolute);
    }
  }
  return files.sort((left, right) => left.localeCompare(right));
}

function treeSummary(root) {
  const files = walk(root);
  const rows = files.map(file => {
    const relative = path.relative(root, file).split(path.sep).join('/');
    const stat = fs.statSync(file);
    return { relative, bytes: stat.size, sha256: fileSha256(file) };
  });
  return {
    files: rows.length,
    bytes: rows.reduce((total, row) => total + row.bytes, 0),
    sha256: sha256(rows.map(row => `${row.relative}\0${row.bytes}\0${row.sha256}`).join('\n')),
  };
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function git(args) {
  const result = spawnSync(
    'git',
    ['-c', `safe.directory=${repoRoot}`, ...args],
    { cwd: repoRoot, encoding: 'utf8' },
  );
  return result.status === 0 ? result.stdout.trim() : null;
}

function main() {
  const indexPath = path.join(staticRoot, 'index.json');
  const packageReportPath = path.join(repoRoot, 'tmp', 'g07-supported-package-gate.json');
  if (!fs.existsSync(indexPath)) throw new Error('Build Storybook before capturing R-11 baseline.');
  if (!fs.existsSync(packageReportPath)) throw new Error('Build supported packages before capturing R-11 baseline.');

  const index = readJson(indexPath);
  const entries = Object.values(index.entries || {});
  const packageReport = readJson(packageReportPath);
  if (packageReport.status !== 'passed' || packageReport.passedPackages !== 21) {
    throw new Error('Supported package baseline is not passed for all 21 packages.');
  }

  const selectedPackages = packageReport.results
    .filter(item => item.status === 'passed')
    .map(item => item.directory)
    .sort();
  const artifactRows = selectedPackages.map(directory => {
    const distRoot = path.join(packagesRoot, directory, 'dist');
    return { package: directory, ...treeSummary(distRoot) };
  });
  const artifactTreeSha256 = sha256(
    artifactRows.map(row => `${row.package}\0${row.files}\0${row.bytes}\0${row.sha256}`).join('\n'),
  );
  const staticTree = treeSummary(staticRoot);
  const report = {
    schemaVersion: 1,
    status: 'captured',
    generatedAt: new Date().toISOString(),
    git: {
      branch: git(['branch', '--show-current']),
      head: git(['rev-parse', 'HEAD']),
      origin: git(['remote', 'get-url', 'origin']),
    },
    storybook: {
      entries: entries.length,
      stories: entries.filter(entry => entry.type === 'story').length,
      docs: entries.filter(entry => entry.type === 'docs').length,
      indexSha256: fileSha256(indexPath),
      treeSha256: staticTree.sha256,
      files: staticTree.files,
      bytes: staticTree.bytes,
    },
    packages: {
      supported: selectedPackages.length,
      passed: packageReport.passedPackages,
      artifactTreeSha256,
      files: artifactRows.reduce((total, row) => total + row.files, 0),
      bytes: artifactRows.reduce((total, row) => total + row.bytes, 0),
      rows: artifactRows,
    },
    inputs: {
      yarnLockSha256: fileSha256(path.join(appRoot, 'yarn.lock')),
      releaseBoundarySha256: fileSha256(path.join(appRoot, 'release-boundary.json')),
    },
    publicationPerformed: false,
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log('R-11 final baseline captured.');
  console.log(`Storybook: ${report.storybook.entries} entries; index ${report.storybook.indexSha256}`);
  console.log(`Packages: ${report.packages.passed}/${report.packages.supported}; artifacts ${report.packages.artifactTreeSha256}`);
  console.log(`Report: ${reportPath}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
}
