/* eslint-disable @typescript-eslint/no-var-requires */
const copy = require('rollup-plugin-copy');
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const baseRollupConfig = require('@rovna-ui/rollup-config');

/* eslint-enable @typescript-eslint/no-var-requires */

/** @type {import('rollup').RollupOptions[]} */
module.exports = Object.assign(
  [
    {
      plugins: [
        postcss({
          plugins: [autoprefixer()],
          sourceMap: true,
          extract: true,
          minimize: true,
        }),
        copy({
          targets: [
            { src: 'package.json', dest: 'dist' },
            { src: './src/global/colors.css', dest: './dist/global/' },
            { src: './src/samolet/colors.css', dest: './dist/samolet/' },
          ],
        }),
      ],
    },
  ],
  baseRollupConfig,
);
