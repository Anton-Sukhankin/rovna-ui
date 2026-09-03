import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineMain } from '@storybook/react-vite/node';
import { mergeConfig } from 'vite';

const configDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = process.env.Q_STORYBOOK_RUNTIME_ROOT || path.resolve(configDir, '..');

const alias = fs
  .readdirSync(path.join(appRoot, 'packages'))
  .filter(directory => directory.includes('tend-ui'))
  .reduce<Record<string, string>>(
    (accumulator, currentValue) => {
      accumulator[`@${currentValue}`] = path.resolve(
        appRoot,
        `packages/${currentValue}/src`,
      );

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

export default defineMain({
  stories: ['../packages/**/*.mdx', '../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: [
    '../packages/tend-ui-assets/src',
    { from: '../packages/tend-ui-assets/dist/favicons', to: '/favicons' },
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {
      legacyRootApi: true,
      builder: {
        viteConfigPath: 'storybook-f06/vite.config.mjs',
      },
    },
  },
  viteFinal: async config => {
    const mergedConfig = mergeConfig(config, {
      configFile: false,
      css: { modules: { generateScopedName: '[local]' } },
      resolve: { alias },
    });
    return mergedConfig;
  },
});
