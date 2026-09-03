const fs = require('fs');
const path = require('path');

const packagesDir = path.resolve(__dirname, '..', 'packages');
const storyPattern = /\.stories\.(?:js|jsx|ts|tsx)$/;
const forbiddenPatterns = [
  { name: 'alert', pattern: /\balert\s*\(/g },
  { name: 'confirm', pattern: /\bconfirm\s*\(/g },
  { name: 'prompt', pattern: /\bprompt\s*\(/g },
  { name: 'window.open', pattern: /\bwindow\.open\s*\(/g },
];

const walk = directory =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });

const findings = [];
const storyFiles = walk(packagesDir).filter(file => storyPattern.test(file));

for (const file of storyFiles) {
  const source = fs.readFileSync(file, 'utf8');
  const lines = source.split(/\r?\n/);

  for (const { name, pattern } of forbiddenPatterns) {
    for (const match of source.matchAll(pattern)) {
      const line = source.slice(0, match.index).split(/\r?\n/).length;
      findings.push({ file: path.relative(packagesDir, file), line, api: name, source: lines[line - 1].trim() });
    }
  }
}

const report = {
  status: findings.length === 0 ? 'passed' : 'failed',
  storyFiles: storyFiles.length,
  forbiddenBrowserInteractions: findings.length,
  findings,
};

console.log(JSON.stringify(report, null, 2));

if (findings.length > 0) {
  process.exitCode = 1;
}
