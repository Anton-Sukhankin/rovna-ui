module.exports = {
  extends: ['@rovna-ui/eslint-config'],
  root: false,
  env: {
    browser: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@rovna-internal/components', '../tend-ui/src'],
          ['@rovna-internal/api', '../tend-ui-api/src'],
          ['@rovna-internal/assets', '../tend-ui-assets/src'],
          ['@rovna-internal/base', '../tend-ui-base/src'],
          ['@rovna-internal/columns-settings', '../tend-ui-columns-settings/src'],
          ['@rovna-internal/factories', '../tend-ui-factories/src'],
          ['@rovna-internal/favicons', '../tend-ui-favicons/src'],
          ['@rovna-internal/filters', '../tend-ui-filters/src'],
          ['@rovna-internal/fonts', '../tend-ui-fonts/src'],
          ['@rovna-internal/form', '../tend-ui-form/src'],
          ['@rovna-internal/grid', '../tend-ui-grid/src'],
          ['@rovna-internal/header', '../tend-ui-header/src'],
          ['@rovna-internal/hooks', '../tend-ui-hooks/src'],
          ['@rovna-internal/icons', '../tend-ui-icons/src'],
          ['@rovna-internal/locale', '../tend-ui-locale/src'],
          ['@rovna-internal/logos', '../tend-ui-logos/src'],
          ['@rovna-internal/primitives', '../tend-ui-primitives/src'],
          ['@rovna-internal/styling', '../tend-ui-styling/src'],
          ['@rovna-internal/table', '../tend-ui-table/src'],
          ['@rovna-internal/tokens', '../tend-ui-tokens/src'],
          ['@rovna-internal/tree', '../tend-ui-tree/src'],
          ['@rovna-internal/theme', '../tend-ui-theme/src'],
          ['@rovna-internal/typography', '../tend-ui-typography/src'],
          ['@rovna-internal/upload', '../tend-ui-upload/src'],
          ['@rovna-internal/utils', '../tend-ui-utils/src'],
          ['@rovna-internal/types', '../tend-ui-types/src'],
          ['@rovna-internal/ai-chat', '../tend-ui-ai-chat/src'],
          ['@notifications', '../tend-ui-notifications/src'],
          ['@search-assistant', '../tend-ui-search-assistant/src'],
        ],
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: [['external', 'builtin'], 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
  ignorePatterns: ['node_modules', 'dist'],
  overrides: [
    {
      files: ['*.stories.tsx', '*.test.tsx', '*.test.ts'],
      rules: { '@typescript-eslint/no-unused-vars': 'warn', 'no-unused-vars': 'warn' },
    },
  ],
};
