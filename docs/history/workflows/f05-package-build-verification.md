# F-05 Package Build Verification

## Superseded Status

The blockers recorded in this diagnostic step were addressed in `F-05A`.

Current build status after `F-05A`:

```text
main/key package builds pass; see docs/history/workflows/f05a-local-build-graph-fixes.md
```

## Purpose

Verify package build readiness after `F-04G` restored `app/node_modules` from the reviewed offline-public archive v2 and aligned local `@10d/*` workspace ranges.

This step does not install dependencies, start Storybook, run Docker, publish packages, or connect a consumer project.

## Result

Status: `[!] partially blocked`

`F-05` is diagnostically complete: the build commands now execute far enough to reach TypeScript/Rollup for at least one package, but the full package build is not ready.

One package built successfully:

```text
@10d/tend-ui-tokens
```

The remaining checked packages are blocked by TypeScript module resolution and local package build-order issues:

```text
@10d/tend-ui-theme
@10d/tend-ui-icons
@10d/tend-ui-primitives
@10d/tend-ui
```

## Command Boundary

Commands were run from `app/` with a temporary local build-runner PATH shim:

```text
tmp/build-runner-shim/yarn.cmd
tmp/build-runner-shim/cp.cmd
```

Why the shims were needed:

- package scripts call plain `yarn`, while the local shell exposes Yarn through `corepack yarn`;
- package scripts call Unix-like `cp`, which is not available as a default PowerShell/CMD command on Windows.

The shims are diagnostic runner helpers only. Package scripts, source code, `package.json`, `yarn.lock` and registry settings were not changed in `F-05`.

## Preflight

| Check | Status |
| --- | --- |
| `app/node_modules` | present |
| `corepack yarn --version` | `1.22.15` |
| plain `yarn` | not available without shim |
| `app/node_modules/.bin/tsc.cmd` | present |
| `app/node_modules/.bin/tsc-alias.cmd` | present |
| `app/node_modules/.bin/rollup.cmd` | present |
| `app/node_modules/.bin/storybook.cmd` | present |

## Build Attempts

| Command | Result | Notes |
| --- | --- | --- |
| `corepack yarn build:tokens` | passed | Created `app/packages/tend-ui-tokens/dist`. |
| `corepack yarn build:theme` | blocked | TypeScript cannot resolve `@tend-ui-hooks/useCallbackRef` and `lodash/debounce`; also reports an implicit `any` in `useControllableState`. |
| `corepack yarn build:icons` | blocked | Same hooks blockers, plus `@tend-ui-styling/core/*` paths resolve to missing `dist` output. |
| `corepack yarn build:primitives` | blocked | Hooks, icons, styling and `lodash/merge` blockers. |
| `corepack yarn build:main` | blocked | Large TypeScript failure set across icons, primitives, styling, hooks and lodash subpath imports. |

## Build Output Status

| Package | `dist` status |
| --- | --- |
| `app/packages/tend-ui-tokens/dist` | present |
| `app/packages/tend-ui-theme/dist` | absent |
| `app/packages/tend-ui-icons/dist` | absent |
| `app/packages/tend-ui-primitives/dist` | absent |
| `app/packages/tend-ui/dist` | absent |

## Main Blockers

### 1. Internal workspace aliases point to unbuilt package output

Many package `tsconfig.base.json` files map local aliases to sibling package `dist` folders:

```text
@tend-ui-hooks/* -> ../tend-ui-hooks/dist/*
@tend-ui-icons/* -> ../tend-ui-icons/dist/*
@tend-ui-styling/* -> ../tend-ui-styling/dist/*
```

Because those foundational internal packages are not built first, packages such as `theme`, `icons`, `primitives` and `tend-ui` cannot resolve their local imports.

Examples:

```text
Cannot find module '@tend-ui-hooks/useCallbackRef'
Cannot find module '@tend-ui-icons/Icon'
Cannot find module '@tend-ui-icons/types'
Cannot find module '@tend-ui-styling/core/styling'
Cannot find module '@tend-ui-styling/core/px'
Cannot find module '@tend-ui-styling/core/withUnit'
```

### 2. `lodash/*` subpath imports still need build-time verification

`app/node_modules/lodash` and `app/node_modules/@types/lodash` exist, and local partial lodash workspaces also exist from the E-branch. TypeScript still reports subpath imports in the checked build:

```text
Cannot find module 'lodash/debounce'
Cannot find module 'lodash/merge'
Cannot find module 'lodash/isEqual'
```

This should be handled as a focused local compensation/build-resolution task, not as a new corporate registry request.

### 3. TypeScript strictness issues appear after module blockers

Examples:

```text
useControllableState.ts: Parameter 'previous' implicitly has an 'any' type.
Drawer Root: Element implicitly has an 'any' type because expression of type 'any' cannot be used to index the size map.
Filters useDepends: no overload matches this call.
```

These are likely small source/type fixes, but they should be handled after alias/build-order resolution reduces the noisy error surface.

## Warnings

Non-blocking warnings observed during build attempts:

```text
Skipping preferred cache folder because it is not writable.
Selected Temp .yarn-cache.
Cannot find a suitable global folder.
baseline-browser-mapping data is outdated.
Rollup source map warning.
Generated an empty chunk "index" for tokens.
```

## Decision

`F-05` is complete as a package build verification gate, but the build gate does not pass.

The project is now past the old "no dependency graph" blocker. The next real blocker is local build graph readiness:

```text
internal alias/build-order resolution + lodash subpath build compatibility + small TypeScript fixes
```

## Next Step

Recommended next group:

```text
F-05A: fix local build graph blockers for hooks, styling, icons and lodash subpath imports, then rerun the package build verification.
```

`F-06` Storybook verification should wait until at least the package build graph is less noisy, because Storybook will likely hit the same alias and runtime import blockers.
