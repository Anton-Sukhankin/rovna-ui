# Offline Public Dependency Package Manifest

Date: 2026-07-06

## Purpose

`E-19` builds the dependency package manifest from local files only:

- `app/package.json`;
- `app/packages/*/package.json`;
- `app/yarn.lock`.

No install, build, Storybook launch, Docker build, publication or network request was performed.

This manifest is a direct-dependency map. It is not a complete `node_modules` tree. Transitive packages must be resolved later in an allowed public/offline-public environment or from a prepared package archive with provenance.

## Current Facts

| Check | Result |
| --- | --- |
| Root package file | `app/package.json` |
| Workspace package files | 44 |
| Total package files scanned | 45 |
| Unique direct dependencies | 118 |
| Direct dependencies resolved by local workspaces | 32 |
| Direct dependencies still external | 86 |
| `yarn.lock` resolved entries | 1593 |
| `yarn.lock` resolved domains | `packages.samoletgroup.ru` only |
| `app/node_modules` | absent |
| `app/packages/tend-ui/dist` | absent |

## Lockfile Assessment

`app/yarn.lock` is useful as a version hint, but it cannot be used as an allowed source because every resolved tarball points to the closed corporate registry:

```text
packages.samoletgroup.ru: 1593 resolved entries
```

Decision:

- do not use the current lockfile URLs as package sources;
- use local `package.json` files as the manifest source of truth;
- use `yarn.lock` only as version evidence when a version must be pinned later;
- create a new public/offline-public package resolution path before install/build/Storybook verification.

## Local Workspace Route

These dependencies are present inside `app/packages` and should be resolved locally instead of downloaded from the old internal registry.

| Route | Count | Packages |
| --- | ---: | --- |
| Local Rovna UI workspace packages | 25 | `@rovna-ui/components`, `@rovna-ui/api`, `@rovna-ui/base`, `@rovna-ui/columns-settings`, `@rovna-ui/factories`, `@rovna-ui/filters`, `@rovna-ui/fonts`, `@rovna-ui/form`, `@rovna-ui/grid`, `@rovna-ui/header`, `@rovna-ui/hooks`, `@rovna-ui/icons`, `@rovna-ui/locale`, `@rovna-ui/logos`, `@rovna-ui/notifications`, `@rovna-ui/primitives`, `@rovna-ui/search-assistant`, `@rovna-ui/styling`, `@rovna-ui/theme`, `@rovna-ui/tokens`, `@rovna-ui/tree`, `@rovna-ui/types`, `@rovna-ui/typography`, `@rovna-ui/upload`, `@rovna-ui/utils` |
| Local compensation workspaces | 7 | `@rovna-ui/eslint-config`, `@rovna-ui/prettier-config`, `@types/uuid`, `classnames`, `query-string`, `samolet-oauth2`, `uuid` |

## Public / Offline-Public Direct Dependency Manifest

These packages are not local workspaces. They must come from public/offline-public sources or be handled by a separate compensation task where appropriate.

### Foundational Runtime

These must not be fake-stubbed.

| Package | Requested spec | Used by packages | Route |
| --- | --- | ---: | --- |
| `react` | `^17.0.2` | 25 | public/offline-public |
| `react-dom` | `^17.0.2` | 20 | public/offline-public |
| `styled-components` | `>=5`, `^5` | 20 | public/offline-public |

### Build And Storybook Tooling

These are required before build and Storybook can be verified.

| Package | Requested spec | Route |
| --- | --- | --- |
| `typescript` | `^5.5.2` | public/offline-public |
| `tsc-alias` | `^1.8.16` | public/offline-public |
| `rollup` | `^4.52.5` | public/offline-public |
| `@rollup/plugin-commonjs` | `^28.0.9` | public/offline-public |
| `@rollup/plugin-node-resolve` | `^16.0.3` | public/offline-public |
| `@rollup/plugin-typescript` | `^12.3.0` | public/offline-public |
| `rollup-plugin-copy` | `^3.5.0` | public/offline-public |
| `rollup-plugin-dts` | `^6.2.3` | public/offline-public |
| `rollup-plugin-import-css` | `^4.1.0` | public/offline-public |
| `rollup-plugin-postcss` | `^4.0.2` | public/offline-public |
| `storybook` | `^10.1.10` | public/offline-public |
| `@storybook/react-vite` | `^10.1.11` | public/offline-public |
| `@storybook/addon-docs` | `^10.0.1` | public/offline-public |
| `@storybook/addon-designs` | `^11.0.1` | public/offline-public |
| `vite` | `^7.1.12` | public/offline-public |
| `@vitejs/plugin-react` | `^5.1.0` | public/offline-public |
| `turbo` | `^2.5.8` | public/offline-public |
| `@babel/preset-env` | `^7.28.5` | public/offline-public |
| `@babel/preset-react` | `^7.28.5` | public/offline-public |
| `@babel/preset-typescript` | `^7.28.5` | public/offline-public |

### Complex UI Mechanics

These packages provide significant component behavior. If public/offline-public acquisition stays blocked, each item should become a separate compensation task with component-level verification.

| Package | Requested spec | Used by packages | Mechanic |
| --- | --- | ---: | --- |
| `antd-core` | `npm:antd@5.12.5` | 6 | Ant Design primitives, base UI behavior |
| `@dnd-kit/core` | `^6` | 3 | drag-and-drop foundation |
| `@dnd-kit/sortable` | `^8` | 3 | sortable lists/tree settings |
| `@dnd-kit/utilities` | `^3` | 3 | dnd helper transforms/utilities |
| `@tanstack/react-query` | `^4.36.1` | 3 | async data/query state |
| `@tanstack/react-table` | `^8` | 1 | table/tree table model |
| `@tanstack/react-virtual` | `^3` | 1 | virtual lists |
| `rc-drawer` | `~6.5.2` | 1 | drawer/overlay mechanics |
| `rc-overflow` | `^1.3.1` | 1 | overflow measurement/menus |

### Runtime Utilities And Service Packages

| Package | Requested spec | Used by packages | Route |
| --- | --- | ---: | --- |
| `axios` | `^1.13.1` | 5 | public/offline-public |
| `dayjs` | `^1.11.1` | 5 | public/offline-public |
| `lodash` | `^4` | 6 | public/offline-public or helper-by-helper compensation |
| `js-sha1` | `^0.7.0` | 2 | public/offline-public |
| `react-helmet` | `^6.1.0` | 1 | public/offline-public |
| `zustand` | `^4.4.7`, `^4.5.2` | 2 | public/offline-public |
| `storeon` | `^3.1.5` | 1 | public/offline-public |
| `use-sync-external-store` | `^1.4.0` | 1 | public/offline-public |
| `centrifuge` | `^5.1.1` | 1 | public/offline-public or service mock/disable |

### Type Packages

| Package | Requested spec | Route |
| --- | --- | --- |
| `@types/autoprefixer` | `^10.2.0` | public/offline-public |
| `@types/identity-obj-proxy` | `^3.0.2` | public/offline-public |
| `@types/jest` | `^29.5.4` | public/offline-public |
| `@types/lodash` | `^4` | public/offline-public or lodash compensation companion |
| `@types/path-to-regexp` | `^1.7.0` | public/offline-public |
| `@types/react` | `^17.0.2` | public/offline-public |
| `@types/react-dom` | `^17.0.2` | public/offline-public |
| `@types/react-helmet` | `^6.1.11` | public/offline-public |
| `@types/react-router` | `^5.1.20` | public/offline-public |
| `@types/react-router-dom` | `^5.3.3` | public/offline-public |
| `@types/react-test-renderer` | `^17.0.1` | public/offline-public |
| `@types/rollup-plugin-postcss` | `^3.1.4` | public/offline-public |
| `@types/styled-components` | `^5` | public/offline-public |
| `@types/typescript` | `^2.0.0` | public/offline-public |
| `@types/use-sync-external-store` | `^0.0.6` | public/offline-public |

### Dev Tooling

These are lower priority for first Storybook/build unblocking unless a command directly requires them.

```text
@commitlint/cli
@commitlint/config-conventional
@faker-js/faker
@react-docgen/cli
@release-it/conventional-changelog
@testing-library/jest-dom
@testing-library/react
@testing-library/react-hooks
autoprefixer
eslint-import-resolver-typescript
eslint-plugin-import
express
http-proxy-middleware
husky
identity-obj-proxy
jest
jest-environment-jsdom
jest-styled-components
nock
nodemon
png-to-ico
react-docgen
react-router-dom
react-test-renderer
release-it
sharp
typed-css-modules
vite-bundle-visualizer
vite-plugin-markdown
yarn-deduplicate
```

## Priority Restore Lanes

| Lane | Purpose | Packages |
| --- | --- | --- |
| Lane 1 | Make TypeScript/build scripts reach real compiler/tooling | `typescript`, `tsc-alias`, `rollup`, Rollup plugins, `turbo` |
| Lane 2 | Make Storybook binary and Vite Storybook runtime available | `storybook`, `@storybook/react-vite`, `@storybook/addon-docs`, `@storybook/addon-designs`, `vite`, `@vitejs/plugin-react` |
| Lane 3 | Make React component runtime available | `react`, `react-dom`, `styled-components` |
| Lane 4 | Restore high-impact UI behavior | `antd-core`, `rc-*`, `@dnd-kit/*`, `@tanstack/*` |
| Lane 5 | Restore service/runtime utilities | `axios`, `dayjs`, `lodash`, `zustand`, `storeon`, `centrifuge`, `js-sha1` |
| Lane 6 | Restore test/release/dev support | Jest, Testing Library, release, docs, proxy and visualizer packages |

## Compensation Candidates

Already compensated locally:

```text
@rovna-ui/eslint-config
@rovna-ui/prettier-config
classnames
query-string
samolet-oauth2
uuid
@types/uuid
```

Candidate for next local compensation only after exact usage audit:

```text
lodash
centrifuge
service/realtime flows that require corporate infrastructure
```

Protected from fake stubs:

```text
react
react-dom
styled-components
typescript
tsc-alias
rollup
storybook
antd-core
@dnd-kit/*
@tanstack/*
rc-*
```

## E-19 Decision

`E-19` is complete as a manifest step.

The next practical step should not be a blind build or Storybook retry. The active blocker is still the missing dependency graph.

Completed next step:

```text
E-20: choose the restore execution route from this manifest.
```

Result:

```text
Primary route selected: offline-public package archive/cache with provenance.
```

Decision document:

```text
docs/restore-execution-route-decision.md
```

Current next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```
