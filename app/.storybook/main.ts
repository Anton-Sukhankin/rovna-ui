import fs from 'node:fs';
import path from 'node:path';
import { defineMain } from '@storybook/react-vite/node';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';

const configDir = process.env.Q_STORYBOOK_RUNTIME_ROOT
  ? path.join(process.env.Q_STORYBOOK_RUNTIME_ROOT, '.storybook')
  : path.dirname(fileURLToPath(import.meta.url));
const appRoot = process.env.Q_STORYBOOK_RUNTIME_ROOT || path.resolve(configDir, '..');
const rootManifest = JSON.parse(
  fs.readFileSync(path.join(appRoot, 'package.json'), 'utf8'),
) as {
  dependencies?: Record<string, string>;
};
const workspaceDependencies = Object.keys(rootManifest.dependencies || {}).filter(name =>
  name.startsWith('@rovna-ui/'),
);
const classNamesEsmEntry = fileURLToPath(
  new URL('../packages/classnames/index.mjs', import.meta.url),
);
const packageAliases = fs
  .readdirSync(path.join(appRoot, 'packages'))
  .filter(directory => {
    const sourceRoot = path.join(appRoot, 'packages', directory, 'src');
    const manifestPath = path.join(appRoot, 'packages', directory, 'package.json');
    return fs.existsSync(sourceRoot) && fs.existsSync(manifestPath);
  })
  .reduce<Record<string, string>>(
    (aliases, directory) => {
      const manifest = JSON.parse(
        fs.readFileSync(path.join(appRoot, 'packages', directory, 'package.json'), 'utf8'),
      ) as { name?: string };
      if (manifest.name?.startsWith('@rovna-ui/')) {
        const packageName = manifest.name.slice('@rovna-ui/'.length);
        aliases[`@rovna-internal/${packageName}`] = path.resolve(
          appRoot,
          'packages',
          directory,
          'src',
        );
      }
      return aliases;
    },
    {
      '@notifications': path.resolve(appRoot, 'packages/tend-ui-notifications/src'),
      '@packages': path.resolve(appRoot, 'packages'),
      '@search-assistant': path.resolve(appRoot, 'packages/tend-ui-search-assistant/src'),
      classnames: classNamesEsmEntry,
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
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/react-vite',
    options: {
      legacyRootApi: true,
    },
  },
  viteFinal(config) {
    const mergedConfig = mergeConfig(config, {
      css: {
        modules: {
          generateScopedName: '[local]',
        },
      },
      optimizeDeps: {
        entries: [
          '.storybook/preview.tsx',
          'packages/**/*.stories.{js,jsx,mjs,ts,tsx}',
        ],
        exclude: workspaceDependencies,
        include: [
          '@storybook/addon-vitest',
          '@storybook/react-vite',
          '@dnd-kit/core',
          '@dnd-kit/sortable',
          '@dnd-kit/utilities',
          '@tanstack/react-table',
          '@tanstack/react-virtual',
          'antd-core',
          'antd-core/es/_util/motion',
          'antd-core/es/card',
          'antd-core/es/card/Grid',
          'antd-core/es/card/Meta',
          'antd-core/es/checkbox/Checkbox',
          'antd-core/es/checkbox/Group',
          'antd-core/es/collapse',
          'antd-core/es/col',
          'antd-core/es/config-provider',
          'antd-core/es/date-picker',
          'antd-core/es/date-picker/locale/en_US',
          'antd-core/es/date-picker/locale/ru_RU',
          'antd-core/es/divider',
          'antd-core/es/drawer',
          'antd-core/es/drawer/style',
          'antd-core/es/dropdown',
          'antd-core/es/flex',
          'antd-core/es/form',
          'antd-core/es/input/Group',
          'antd-core/es/input/Input',
          'antd-core/es/input/Password',
          'antd-core/es/input/Search',
          'antd-core/es/input/TextArea',
          'antd-core/es/input-number',
          'antd-core/es/menu',
          'antd-core/es/modal',
          'antd-core/es/modal/Modal',
          'antd-core/es/notification',
          'antd-core/es/pagination',
          'antd-core/es/popover',
          'antd-core/es/progress',
          'antd-core/es/radio',
          'antd-core/es/row',
          'antd-core/es/segmented',
          'antd-core/es/select',
          'antd-core/es/space',
          'antd-core/es/steps',
          'antd-core/es/switch',
          'antd-core/es/table',
          'antd-core/es/tabs',
          'antd-core/es/tooltip',
          'antd-core/es/tour',
          'antd-core/es/tree/Tree',
          'antd-core/es/typography',
          'antd-core/es/typography/Base',
          'antd-core/es/typography/Link',
          'antd-core/es/typography/Text',
          'antd-core/lib/message',
          'antd-core/locale/en_US',
          'antd-core/locale/ru_RU',
          'axios',
          'dayjs',
          'dayjs/locale/ru',
          'js-sha1',
          'rc-drawer',
          'rc-overflow',
          'react',
          'react-dom',
          'react-helmet',
          'react-is',
          'react-router-dom',
          'shallowequal',
          'storybook/actions',
          'storybook/test',
          'storybook/viewport',
          'styled-components',
          'use-sync-external-store/shim',
        ],
      },
      resolve: {
        alias: packageAliases,
      },
    });

    return mergedConfig;
  },
});
