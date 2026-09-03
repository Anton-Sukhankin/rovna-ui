/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const resolve = require('@rollup/plugin-node-resolve');
const copy = require('rollup-plugin-copy');
// const css = require('rollup-plugin-import-css');
const postcss = require('rollup-plugin-postcss');
const path = require('path');

const validator = require('./plugins/plugin-import-validator');
const pkg = require(path.resolve(process.cwd(), 'package.json'));
/* eslint-enable @typescript-eslint/no-var-requires */

const external = [
  /antd-core\/.*/,
  /use-sync-external-store\/.*/,
  /rc-picker\/.*/,
  /tslib/,
  /lodash\/.*/,
  /@rovna-ui\/.*/,
];

const dependencies = pkg.dependencies ? Object.keys(pkg.dependencies) : [];
const peerDependencies = pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : [];

const whitelist = ['index.ts'];
const blacklist = ['types/index.ts'];

const onwarn = (warning, warn) => {
  // Type-only barrel entry points intentionally produce no JavaScript output.
  if (warning.code === 'EMPTY_BUNDLE') return;

  warn(warning);
};

function createEntries(entry) {
  const dirs = fs.readdirSync(entry);
  const paths = dirs.map(dir => {
    const subPath = `${entry}/${dir}`;
    const isDir = fs.lstatSync(subPath).isDirectory();
    if (isDir) {
      return createEntries(subPath);
    }

    return subPath;
  });

  return paths
    .flat()
    .filter(subPath => subPath.includes(whitelist))
    .filter(subPath => blacklist.length === 0 || !subPath.includes(blacklist));
}

/** @type {import('rollup').RollupOptions[]} */
module.exports = [
  {
    input: createEntries('./src'),
    onwarn,
    output: [
      {
        dir: 'dist',
        format: 'esm',
        sourcemap: true,
        sourcemapExcludeSources: true,
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
    external: [...dependencies, ...peerDependencies, ...external],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        compilerOptions: {
          module: 'ESNext',
          moduleResolution: 'bundler',
        },
        declaration: undefined,
        outDir: undefined,
        declarationDir: undefined,
        emitDeclarationOnly: undefined,
      }),
      copy({
        targets: [{ src: 'package.json', dest: 'dist' }],
      }),
      postcss({
        automodules: false,
        inject: false,
        modules: {
          generateScopedName: '[local]',
        },
      }),
      validator({ targets: ['dist'] }),
    ],
  },
  {
    input: createEntries('./src'),
    onwarn,
    output: [
      {
        dir: 'dist/cjs',
        format: 'cjs',
        sourcemap: true,
        sourcemapExcludeSources: true,
        preserveModules: true,
        preserveModulesRoot: 'src',
        interop: 'auto',
        generatedCode: {
          reservedNamesAsProps: false,
        },
      },
    ],
    external: [...dependencies, ...peerDependencies, ...external],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        compilerOptions: {
          module: 'ESNext',
          moduleResolution: 'bundler',
        },
        declaration: undefined,
        outDir: undefined,
        declarationDir: undefined,
        emitDeclarationOnly: undefined,
      }),
      postcss({
        inject: false,
        automodules: false,
        modules: {
          generateScopedName: '[local]',
        },
      }),
      validator(),
    ],
  },
];
