// eslint-disable-next-line @typescript-eslint/no-var-requires
const moduleNameMapper = require('./paths');

/** @type {import('jest').Config} */
module.exports = {
  roots: ['./src'],
  moduleNameMapper,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [`<rootDir>/setupTests.ts`],
  testTimeout: 30000,
};
