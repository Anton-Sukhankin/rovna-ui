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

const workspaceDist = packageName => path.join(packagesRoot, packageName, 'dist');
const appDependency = packageName => path.join(appRoot, 'node_modules', packageName);

export default defineConfig({
  root: configDir,
  cacheDir: path.join(configDir, '.vite-cache'),
  plugins: [react.default()],
  resolve: {
    alias: [
      { find: '@rovna-ui/logos', replacement: workspaceDist('tend-ui-logos') },
      { find: '@rovna-ui/components', replacement: workspaceDist('tend-ui') },
      { find: '@rovna-ui/api', replacement: workspaceDist('tend-ui-api') },
      { find: '@rovna-ui/factories', replacement: workspaceDist('tend-ui-factories') },
      { find: '@rovna-ui/grid', replacement: workspaceDist('tend-ui-grid') },
      { find: '@rovna-ui/hooks', replacement: workspaceDist('tend-ui-hooks') },
      { find: '@rovna-ui/icons', replacement: workspaceDist('tend-ui-icons') },
      { find: '@rovna-ui/locale', replacement: workspaceDist('tend-ui-locale') },
      { find: '@rovna-ui/primitives', replacement: workspaceDist('tend-ui-primitives') },
      { find: '@rovna-ui/styling', replacement: workspaceDist('tend-ui-styling') },
      { find: '@rovna-ui/theme', replacement: workspaceDist('tend-ui-theme') },
      { find: '@rovna-ui/tokens', replacement: workspaceDist('tend-ui-tokens') },
      { find: '@rovna-ui/types', replacement: workspaceDist('tend-ui-types') },
      { find: '@rovna-ui/typography', replacement: workspaceDist('tend-ui-typography') },
      { find: '@rovna-ui/utils', replacement: workspaceDist('tend-ui-utils') },
      { find: 'react', replacement: appDependency('react') },
      { find: 'react-dom', replacement: appDependency('react-dom') },
      { find: 'styled-components', replacement: appDependency('styled-components') },
      { find: 'antd-core', replacement: appDependency('antd-core') },
      { find: 'axios', replacement: appDependency('axios') },
      { find: 'dayjs', replacement: appDependency('dayjs') },
      { find: 'rc-drawer', replacement: appDependency('rc-drawer') },
      { find: 'rc-overflow', replacement: appDependency('rc-overflow') },
      { find: 'tslib', replacement: appDependency('tslib') },
    ],
  },
  server: {
    host: '127.0.0.1',
    port: 3101,
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
