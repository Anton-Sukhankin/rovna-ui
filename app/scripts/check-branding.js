const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const brand = JSON.parse(fs.readFileSync(path.join(appRoot, 'brand.json'), 'utf8'));
const forbiddenTerms = [
  `@${'10d'}/`,
  `@${'10d'}\\/`,
  ['Tend', 'UI'].join(''),
  ['Tend', ' UI'].join(''),
];
const scanRoots = ['.github', 'app', 'docs', 'examples'];
const rootFiles = [
  'AGENTS.md',
  'CONTRIBUTING.md',
  'LICENSE',
  'README.md',
  'SECURITY.md',
  'TRADEMARKS.md',
];

function relative(filePath) {
  return path.relative(repoRoot, filePath).replace(/\\/g, '/');
}

function isSkipped(filePath) {
  const file = relative(filePath);
  return (
    file === 'app/scripts/check-branding.js' ||
    file.endsWith('.log') ||
    /(^|\/)node_modules(?:\/|$)/.test(file) ||
    file.startsWith('app/.loki/') ||
    file.startsWith('app/storybook-static/') ||
    file.startsWith('app/storybook-static-previous/') ||
    file.startsWith('app/release/') ||
    file.startsWith('app/tmp/') ||
    file.startsWith('app/.q-visual-baseline/') ||
    file.startsWith('docs/evidence/') ||
    file.startsWith('docs/agent-context/component-passports/generated/') ||
    file.startsWith('docs/history/') ||
    (file.startsWith('docs/') && file.endsWith('.json')) ||
    file.startsWith('docs/r-reports/') ||
    /^docs\/(?:h-|q(?:g)?\d|q-final-|r(?:\d|-final-))/.test(file) ||
    /(^|\/)(?:dist|build|coverage|\.turbo|__snapshots__)(?:\/|$)/.test(file)
  );
}

function collectFiles(root, files = []) {
  if (!fs.existsSync(root) || isSkipped(root)) return files;
  const stats = fs.statSync(root);
  if (stats.isFile()) {
    files.push(root);
    return files;
  }
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    collectFiles(path.join(root, entry.name), files);
  }
  return files;
}

function readText(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.includes(0)) return null;
  return buffer.toString('utf8');
}

function checkManifest(manifestPath, failures) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8').replace(/^\uFEFF/, ''));
  if (manifest.name?.startsWith(`${brand.packageScope}/`) && manifest.license !== brand.license) {
    failures.push(`${relative(manifestPath)}: expected license ${brand.license}`);
  }
}

function main() {
  const failures = [];
  const files = [
    ...scanRoots.flatMap(root => collectFiles(path.join(repoRoot, root))),
    ...rootFiles.map(file => path.join(repoRoot, file)).filter(fs.existsSync),
  ];

  for (const filePath of files) {
    const content = readText(filePath);
    if (content === null) continue;
    const contractContent = content
      .split(repoRoot)
      .join('<repository-root>')
      .split(repoRoot.replace(/\\/g, '\\\\'))
      .join('<repository-root>');
    for (const term of forbiddenTerms) {
      if (contractContent.includes(term)) {
        failures.push(`${relative(filePath)}: legacy identifier ${term}`);
      }
    }
    if (path.basename(filePath) === 'package.json') checkManifest(filePath, failures);
  }

  const workspace = JSON.parse(fs.readFileSync(path.join(appRoot, 'package.json'), 'utf8'));
  const boundary = JSON.parse(fs.readFileSync(path.join(appRoot, 'release-boundary.json'), 'utf8'));
  if (workspace.name !== brand.workspaceName) {
    failures.push(`app/package.json: expected workspace name ${brand.workspaceName}`);
  }
  if (workspace.license !== brand.license) {
    failures.push(`app/package.json: expected license ${brand.license}`);
  }
  if (boundary.releaseRoot !== brand.rootPackage) {
    failures.push(`app/release-boundary.json: expected root package ${brand.rootPackage}`);
  }
  if (boundary.publicReleasePackages.some(name => !name.startsWith(`${brand.packageScope}/`))) {
    failures.push(`app/release-boundary.json: public packages must use ${brand.packageScope}`);
  }
  if (!fs.existsSync(path.join(repoRoot, 'LICENSE'))) {
    failures.push('LICENSE: root MIT license is missing');
  }

  const uniqueFailures = [...new Set(failures)].sort();
  if (uniqueFailures.length) {
    console.error('Rovna UI branding contract: failed');
    uniqueFailures.slice(0, 100).forEach(failure => console.error(`- ${failure}`));
    if (uniqueFailures.length > 100) {
      console.error(`- ... ${uniqueFailures.length - 100} more`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Rovna UI branding contract: passed (${files.length} files checked)`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
}
