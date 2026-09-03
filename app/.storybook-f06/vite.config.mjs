import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const configDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = process.env.Q_STORYBOOK_RUNTIME_ROOT || path.resolve(configDir, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(appRoot, 'package.json'), 'utf8'));
const dependencies = pkg.dependencies ? Object.keys(pkg.dependencies) : [];

const alias = fs
  .readdirSync(path.join(appRoot, 'packages'))
  .filter(directory => {
    const sourceRoot = path.join(appRoot, 'packages', directory, 'src');
    const manifestPath = path.join(appRoot, 'packages', directory, 'package.json');
    return fs.existsSync(sourceRoot) && fs.existsSync(manifestPath);
  })
  .reduce(
    (accumulator, directory) => {
      const manifest = JSON.parse(
        fs.readFileSync(path.join(appRoot, 'packages', directory, 'package.json'), 'utf8'),
      );
      if (manifest.name?.startsWith('@rovna-ui/')) {
        const packageName = manifest.name.slice('@rovna-ui/'.length);
        accumulator[`@rovna-internal/${packageName}`] = path.resolve(
          appRoot,
          'packages',
          directory,
          'src',
        );
      }

      return accumulator;
    },
    {
      '@notifications': path.resolve(appRoot, 'packages/tend-ui-notifications/src'),
      '@search-assistant': path.resolve(
        appRoot,
        'packages/tend-ui-search-assistant/src',
      ),
      '@packages': path.resolve(appRoot, 'packages'),
      'react-dom/client': path.resolve(
        appRoot,
        'storybook-f06/react-dom-client-compat.ts',
      ),
    },
  );

export default defineConfig({
  css: { modules: { generateScopedName: '[local]' } },
  optimizeDeps: {
    exclude: dependencies,
    include: ['shallowequal', 'react-is'],
  },
  resolve: {
    alias,
  },
  server: {
    port: 3000,
  },
  plugins: [react()],
});
