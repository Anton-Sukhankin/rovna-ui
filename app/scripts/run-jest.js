const path = require('path');

const originalWarn = console.warn;

console.warn = (...args) => {
  const [message] = args;
  const isStaleBaselineDataWarning =
    typeof message === 'string' &&
    message.startsWith('[baseline-browser-mapping] The data in this module is over two months old.');

  if (!isStaleBaselineDataWarning) originalWarn(...args);
};

const jestBin = path.join(path.dirname(require.resolve('jest/package.json')), 'bin', 'jest.js');

process.argv = [process.argv[0], jestBin, ...process.argv.slice(2)];
require(jestBin);
