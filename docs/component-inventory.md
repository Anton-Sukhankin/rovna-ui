# Component Inventory

## Purpose

This document is the first offline inventory of the Rovna UI design-system archive now unpacked into this project.

The inventory is based only on local files:

- `app/package.json`
- `app/packages/*/package.json`
- `app/packages/**/*.stories.*`
- `app/packages/**/*.mdx`
- package `exports` fields
- selected public `index.ts` files

No dependency installation, Storybook launch, build, registry access, GitLab access, Figma access, or external lookup was used.

## Package Summary

- Workspace root: `app`
- Root package name: `tend-ui`
- Package manager declared by project: `yarn@1.22.15`
- Workspaces: `packages/*`
- Total workspace packages: `37`
- Total Storybook documentation files found: `327`
- `.stories.*` files found: `112`
- `.mdx` files found: `215`
- Storybook command declared in `app/package.json`: `yarn storybook`
- Storybook port declared in script: `3000`

## Package Inventory

| Type | Package | Version | Story docs |
| --- | --- | --- | ---: |
| ui/runtime | `@rovna-ui/components` | `4.82.0` | 134 |
| ui/runtime | `@rovna-ui/base` | `0.0.1` | 0 |
| ui/runtime | `@rovna-ui/grid` | `0.1.1` | 9 |
| ui/runtime | `@rovna-ui/primitives` | `0.23.7` | 42 |
| ui/runtime | `@rovna-ui/typography` | `0.0.5` | 17 |
| feature/component | `@rovna-ui/ai-chat` | `1.0.0` | 0 |
| feature/component | `@rovna-ui/columns-settings` | `0.4.0` | 5 |
| feature/component | `@rovna-ui/filters` | `0.9.0` | 4 |
| feature/component | `@rovna-ui/form` | `0.1.0` | 3 |
| feature/component | `@rovna-ui/header` | `3.5.18` | 14 |
| feature/component | `@rovna-ui/notifications` | `0.8.0` | 2 |
| feature/component | `@rovna-ui/search-assistant` | `1.10.0` | 2 |
| feature/component | `@rovna-ui/table` | `0.9.3` | 14 |
| feature/component | `@rovna-ui/tree` | `1.16.0` | 3 |
| feature/component | `@rovna-ui/upload` | `2.0.0` | 6 |
| foundation/runtime | `@rovna-ui/api` | `2.0.0` | 1 |
| foundation/runtime | `@rovna-ui/factories` | `1.2.0` | 1 |
| foundation/runtime | `@rovna-ui/hooks` | `0.11.1` | 16 |
| foundation/runtime | `@rovna-ui/locale` | `1.4.6` | 1 |
| foundation/runtime | `@rovna-ui/types` | `1.0.0` | 2 |
| foundation/runtime | `@rovna-ui/utils` | `1.16.2` | 35 |
| icons/logos | `@rovna-ui/favicons` | `0.4.0` | 3 |
| icons/logos | `@rovna-ui/icons` | `0.7.0` | 3 |
| icons/logos | `@rovna-ui/logos` | `1.17.3` | 3 |
| theme/assets | `@rovna-ui/assets` | `0.21.1` | 0 |
| theme/assets | `@rovna-ui/fonts` | `1.0.2` | 2 |
| theme/assets | `@rovna-ui/styling` | `2.9.0` | 1 |
| theme/assets | `@rovna-ui/theme` | `0.2.5` | 1 |
| tokens | `@rovna-ui/tokens` | `1.1.0` | 3 |
| tooling/config | `@rovna-ui/babel-config` | `0.0.0` | 0 |
| tooling/config | `@rovna-ui/eslint-config-legacy` | `0.0.0` | 0 |
| tooling/config | `@rovna-ui/eslint-local-config` | `0.0.0` | 0 |
| tooling/config | `@rovna-ui/jest-config` | `0.0.0` | 0 |
| tooling/config | `@rovna-ui/release-it-config` | `0.0.0` | 0 |
| tooling/config | `@rovna-ui/rollup-config` | `0.0.0` | 0 |
| tooling/config | `@rovna-ui/tools` | `0.0.0` | 0 |
| tooling/config | `@rovna-ui/ts-config` | `0.0.0` | 0 |

## Storybook Stories Summary

Storybook reads stories from `app/.storybook/main.ts`:

```ts
stories: ['../packages/**/*.mdx', '../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)']
```

Package-level story documentation counts:

| Package folder | Story docs |
| --- | ---: |
| `tend-ui` | 134 |
| `tend-ui-primitives` | 42 |
| `tend-ui-utils` | 35 |
| `tend-ui-typography` | 17 |
| `tend-ui-hooks` | 16 |
| `tend-ui-header` | 14 |
| `tend-ui-table` | 14 |
| `tend-ui-grid` | 9 |
| `tend-ui-upload` | 6 |
| `tend-ui-columns-settings` | 5 |
| `tend-ui-filters` | 4 |
| `tend-ui-favicons` | 3 |
| `tend-ui-form` | 3 |
| `tend-ui-icons` | 3 |
| `tend-ui-logos` | 3 |
| `tend-ui-tokens` | 3 |
| `tend-ui-tree` | 3 |
| `tend-ui-fonts` | 2 |
| `tend-ui-notifications` | 2 |
| `tend-ui-search-assistant` | 2 |
| `tend-ui-types` | 2 |
| `tend-ui-api` | 1 |
| `tend-ui-factories` | 1 |
| `tend-ui-locale` | 1 |
| `tend-ui-styling` | 1 |
| `tend-ui-theme` | 1 |

Primary `@rovna-ui/components` story groups:

| Group | Story docs |
| --- | ---: |
| `primitives` | 75 |
| `components` | 32 |
| `ui` | 12 |
| `stories` | 6 |
| `hooks` | 3 |
| `grid` | 2 |
| `features` | 1 |
| `styling` | 1 |
| `theme` | 1 |
| `widgets` | 1 |

## Key Components

Primary primitives visible from `app/packages/tend-ui/src/primitives/index.ts`:

- `Button`
- `Input`
- `Select`
- `InputNumber`
- `TextArea`
- `Search`
- `Password`
- `Checkbox`
- `Radio`
- `Toggle`
- `Tooltip`
- `Popover`
- `Alert`
- `Toast`
- `Tag`
- `Badge`
- `Accordion`
- `Modal`
- `Table`
- `DatePicker`
- `RangePicker`
- `TimePicker`
- `Actions`
- `TimeSelect`
- `Card`
- `Form`
- `Dialog`
- `Pagination`
- `Progress`
- `Steps`
- `StepsHistoryApproval`
- `Segmented`
- `Drawer`
- `Chips`
- `Tree`
- `Avatar`
- `Dropdown`
- `SimpleTable`
- `ToggleButton`
- `Layout`
- `Menu`
- `Counter`

Higher-level components visible from `app/packages/tend-ui/src/components/index.ts`:

- `AsyncSelect`
- `Form`
- `Search`
- `ColumnsSettings`
- `useColumns`
- `useColumnsSettings`
- `Filters`
- `ComponentPicker`
- `ActionsButton`
- `Status`
- `AsyncCheckbox`
- `AsyncRadio`
- `BurgerMenu`
- `Logo`
- `Profile`
- `Stand`
- `CheckboxGroupSearch`
- `RadioGroupSearch`
- `DetachedTabs`

Grid exports visible from `app/packages/tend-ui/src/grid/index.ts`:

- `Space`
- `Box`
- `Row`
- `Col`
- `Divider`
- `Flex`

Core hooks visible from `app/packages/tend-ui/src/hooks/index.ts` and `@rovna-ui/hooks` exports:

- `useApi`
- `useMap`
- `useCallbackRef`
- `useBoolean`
- `useVisibility`
- `useRenderCount`
- `useFilterOption`
- `useDebouncedCallback`
- `useForwardRef`
- `useControllableState`
- `useMediaQuery`
- `useClickOutside`
- `useKeyPress`
- `useHover`

## Public Imports

These imports are statically visible from package `exports` and public `index.ts` files. They still require runtime/build verification in later steps.

| Need | Import pattern | Static source |
| --- | --- | --- |
| Theme provider / initialization | `import { RovnaUI } from '@rovna-ui/components/theme';` | `@rovna-ui/components` export `./theme` |
| Main primitives barrel | `import { Button, Input, Select } from '@rovna-ui/components/primitives';` | `app/packages/tend-ui/src/primitives/index.ts` |
| Direct primitive path | `import { Button } from '@rovna-ui/components/primitives/Button';` | `@rovna-ui/components` export `./primitives/Button` |
| Main components barrel | `import { AsyncSelect, ColumnsSettings, Filters } from '@rovna-ui/components/components';` | `app/packages/tend-ui/src/components/index.ts` |
| Direct component path | `import { ColumnsSettings } from '@rovna-ui/components/components/ColumnsSettings';` | `@rovna-ui/components` export `./components/ColumnsSettings` |
| Grid components | `import { Box, Flex, Row, Col } from '@rovna-ui/components/grid';` | `app/packages/tend-ui/src/grid/index.ts` |
| Typography | `import { Text, Title, Link } from '@rovna-ui/components/typography';` | `@rovna-ui/components` export `./typography` |
| Icons | `import { Add, Search } from '@rovna-ui/components/icons';` | `@rovna-ui/components` export `./icons` |
| Tokens | `import ... from '@rovna-ui/components/tokens';` | `@rovna-ui/components` export `./tokens`; exact named exports require verification |
| Separate primitives package | `import { Button } from '@rovna-ui/primitives';` | `app/packages/tend-ui-primitives/src/index.ts` |
| Separate icons package | `import { Add } from '@rovna-ui/icons';` | `@rovna-ui/icons` export `.` |
| Separate hooks package | `import { useBoolean } from '@rovna-ui/hooks';` | `@rovna-ui/hooks` export `.` |

## Offline / Self-Contained Notes

- Internal registry and corporate links are facts from local config, not available sources.
- Packages with local source under `app/packages` should be treated as recoverable workspace packages before considering any external source.
- Tooling/config packages may block lint/build scripts but are not automatically runtime blockers.
- Runtime packages and complex components must be checked carefully during `P-03` and `P-05`.

## Open Questions / Blockers

- Dependencies have not been installed yet.
- Storybook has not been launched yet.
- Build has not been checked yet.
- Exact runtime behavior of imports is not verified yet.
- Some packages have no Storybook docs in the archive, for example `@rovna-ui/ai-chat`, `@rovna-ui/assets`, and tooling/config packages.
- Exact named exports for some token/styling modules require source-level follow-up during agent-context work.

