import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineMain } from '@storybook/react-vite/node';
import { mergeConfig } from 'vite';

const configDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(configDir, '..');

const alias = fs
  .readdirSync(path.join(appRoot, 'packages'))
  .filter(directory => {
    const sourceRoot = path.join(appRoot, 'packages', directory, 'src');
    const manifestPath = path.join(appRoot, 'packages', directory, 'package.json');
    return fs.existsSync(sourceRoot) && fs.existsSync(manifestPath);
  })
  .reduce<Record<string, string>>(
    (accumulator, directory) => {
      const manifest = JSON.parse(
        fs.readFileSync(path.join(appRoot, 'packages', directory, 'package.json'), 'utf8'),
      ) as { name?: string };
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
    },
  );

export default defineMain({
  stories: ['../packages/**/*.mdx', '../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: '.storybook-f06/vite.config.mjs',
      },
    },
  },
  viteFinal: async config =>
    mergeConfig(config, {
      configFile: false,
      css: { modules: { generateScopedName: '[local]' } },
      resolve: { alias },
    }),
});
