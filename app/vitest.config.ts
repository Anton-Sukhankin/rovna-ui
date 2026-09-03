import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const dirname =
  process.env.Q_STORYBOOK_RUNTIME_ROOT ||
  (typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url)));
const browserName = process.env.Q_STORYBOOK_BROWSER || 'chromium';
const workspaceAliases = fs
  .readdirSync(path.join(dirname, 'packages'))
  .reduce<Array<{ find: string; replacement: string }>>((aliases, directory) => {
    const manifestPath = path.join(dirname, 'packages', directory, 'package.json');
    if (!fs.existsSync(manifestPath)) return aliases;

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as { name?: string };
    if (manifest.name?.startsWith('@rovna-ui/')) {
      const sourceDirectory = path.join(dirname, 'packages', directory, 'src');
      aliases.push({
        find: manifest.name,
        replacement: fs.existsSync(sourceDirectory)
          ? sourceDirectory
          : path.join(dirname, 'packages', directory),
      });
    }
    return aliases;
  }, [])
  .sort((left, right) => right.find.length - left.find.length);
const useInstalledChrome =
  browserName === 'chromium' && process.env.Q_USE_PLAYWRIGHT_BUNDLED_BROWSER !== '1';
const emptyAppEntryPlugin = {
  name: 'q-empty-app-entry',
  enforce: 'pre' as const,
  resolveId(source: string) {
    return source === '/playground/index.tsx' ? '\0q-empty-app-entry' : null;
  },
  load(id: string) {
    return id === '\0q-empty-app-entry' ? 'export {};' : null;
  },
};

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        resolve: {
          alias: workspaceAliases,
          preserveSymlinks: true,
        },
        plugins: [
          emptyAppEntryPlugin,
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({
              launchOptions: useInstalledChrome ? { channel: 'chrome' } : {},
            }),
            instances: [{ browser: browserName as 'chromium' | 'firefox' | 'webkit' }],
          },
          fileParallelism: false,
          hookTimeout: 30_000,
          setupFiles: '.storybook/vitest.setup.ts',
          testTimeout: 20_000,
        },
      },
    ],
  },
});
