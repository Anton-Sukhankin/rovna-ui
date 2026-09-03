import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const configDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(configDir, '..', '..');
const appRoot = path.join(repoRoot, 'app');
const packagesRoot = path.join(appRoot, 'packages');
const requireFromApp = createRequire(path.join(appRoot, 'package.json'));
const { defineConfig } = requireFromApp('vite');
const react = requireFromApp('@vitejs/plugin-react');

const packageIndex = packageName =>
  path.join(packagesRoot, packageName, 'dist', 'index.js');

const packageSubpath = (packageName, subpath) =>
  path.join(packagesRoot, packageName, 'dist', subpath, 'index.js');

export default defineConfig({
  root: configDir,
  cacheDir: path.join(configDir, '.vite-cache'),
  plugins: [react.default()],
  resolve: {
    alias: [
      {
        find: /^@rovna-ui\/tokens\/(.*)$/,
        replacement: path.join(packagesRoot, 'tend-ui-tokens', 'dist', '$1', 'index.js'),
      },
      {
        find: /^@rovna-ui\/icons\/Icon$/,
        replacement: path.join(packagesRoot, 'tend-ui-icons', 'dist', 'Icon.js'),
      },
      {
        find: /^@rovna-ui\/icons\/(.*)$/,
        replacement: path.join(packagesRoot, 'tend-ui-icons', 'dist', '$1', 'index.js'),
      },
      {
        find: /^@rovna-ui\/hooks\/(.*)$/,
        replacement: path.join(packagesRoot, 'tend-ui-hooks', 'dist', '$1', 'index.js'),
      },
      {
        find: /^@rovna-ui\/utils\/(.*)$/,
        replacement: path.join(packagesRoot, 'tend-ui-utils', 'dist', '$1.js'),
      },
      {
        find: /^@rovna-ui\/locale\/hooks\/(.*)$/,
        replacement: path.join(packagesRoot, 'tend-ui-locale', 'dist', 'hooks', '$1.js'),
      },
      {
        find: /^@rovna-ui\/locale\/(.*)$/,
        replacement: path.join(packagesRoot, 'tend-ui-locale', 'dist', '$1', 'index.js'),
      },
      {
        find: /^@rovna-ui\/primitives\/(.*)$/,
        replacement: path.join(packagesRoot, 'tend-ui-primitives', 'dist', '$1', 'index.js'),
      },
      {
        find: /^@rovna-ui\/components\/theme$/,
        replacement: packageSubpath('tend-ui', 'theme'),
      },
      {
        find: /^@rovna-ui\/components\/primitives\/Button$/,
        replacement: packageSubpath('tend-ui', 'primitives/Button'),
      },
      { find: '@rovna-ui/api', replacement: packageIndex('tend-ui-api') },
      { find: '@rovna-ui/factories', replacement: packageIndex('tend-ui-factories') },
      { find: '@rovna-ui/grid', replacement: packageIndex('tend-ui-grid') },
      { find: '@rovna-ui/hooks', replacement: packageIndex('tend-ui-hooks') },
      { find: '@rovna-ui/icons', replacement: packageIndex('tend-ui-icons') },
      { find: '@rovna-ui/locale', replacement: packageIndex('tend-ui-locale') },
      { find: '@rovna-ui/primitives', replacement: packageIndex('tend-ui-primitives') },
      { find: '@rovna-ui/styling', replacement: packageIndex('tend-ui-styling') },
      { find: '@rovna-ui/theme', replacement: packageIndex('tend-ui-theme') },
      { find: '@rovna-ui/types', replacement: packageIndex('tend-ui-types') },
      { find: '@rovna-ui/typography', replacement: packageIndex('tend-ui-typography') },
      { find: '@rovna-ui/utils', replacement: packageIndex('tend-ui-utils') },
      { find: 'classnames', replacement: path.join(configDir, 'shims', 'classnames.mjs') },
      { find: 'lodash/debounce', replacement: path.join(configDir, 'shims', 'lodash-debounce.mjs') },
      { find: 'lodash/merge', replacement: path.join(configDir, 'shims', 'lodash-merge.mjs') },
      { find: 'lodash/isEqual', replacement: path.join(configDir, 'shims', 'lodash-is-equal.mjs') },
      { find: 'react', replacement: path.join(appRoot, 'node_modules', 'react') },
      { find: 'react-dom', replacement: path.join(appRoot, 'node_modules', 'react-dom') },
    ],
  },
  server: {
    host: '127.0.0.1',
    port: 3100,
    strictPort: true,
    fs: {
      allow: [repoRoot, appRoot],
    },
  },
  build: {
    outDir: path.join(configDir, 'dist'),
    emptyOutDir: true,
  },
});
