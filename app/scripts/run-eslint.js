const { spawnSync } = require('child_process');
const path = require('path');

let eslintBin;
try {
  eslintBin = path.join(path.dirname(require.resolve('eslint/package.json')), 'bin', 'eslint.js');
} catch (error) {
  console.error('Local ESLint is missing. Restore the public lint dependencies before running this gate.');
  process.exit(1);
}

const args = process.argv.slice(2);
const lintArgs = args.length > 0 ? args : ['packages', '--ext', '.ts,.tsx'];
const result = spawnSync(process.execPath, [eslintBin, ...lintArgs], {
  cwd: path.resolve(__dirname, '..'),
  encoding: 'utf8',
  stdio: 'inherit',
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
