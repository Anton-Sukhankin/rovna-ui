import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import pkg from './package.json';

const dependencies = pkg.dependencies ? Object.keys(pkg.dependencies) : [];

const createProxy = (target?: string) =>
  target
    ? {
        target,
        changeOrigin: true,
        secure: false,
      }
    : undefined;

const proxy = Object.fromEntries(
  [
    ['/api/sn', createProxy(process.env.ROVNA_UI_NOTIFICATIONS_API_URL)],
    ['/api/v1', createProxy(process.env.ROVNA_UI_SEARCH_API_URL)],
    ['/api/services', createProxy(process.env.ROVNA_UI_SERVICES_API_URL)],
  ].filter((entry): entry is [string, NonNullable<ReturnType<typeof createProxy>>] =>
    Boolean(entry[1]),
  ),
);

const alias = fs
  .readdirSync('./packages')
  .filter(directory => directory.includes('tend-ui'))
  .reduce<Record<string, string>>(
    (accumulator, currentValue) => {
      accumulator[`@${currentValue}`] = path.resolve(
        __dirname,
        `./packages/${currentValue}/src`,
      );

      return accumulator;
    },
    {
      '@notifications': path.resolve(__dirname, './packages/tend-ui-notifications/src'),
      '@search-assistant': path.resolve(
        __dirname,
        './packages/tend-ui-search-assistant/src',
      ),
      '@packages': path.resolve(__dirname, './packages'),
    },
  );

// https://vitejs.dev/config/
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
    proxy,
  },
  plugins: [react()],
});
