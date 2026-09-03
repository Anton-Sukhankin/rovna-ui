# F-05A Local Build Graph Fixes

## Purpose

Fix the local build graph blockers found in `F-05` without using closed corporate sources and without changing registry settings.

## Result

Status: `[x] complete`

`F-05A` fixed the local build graph enough for the main package and key packages to build.

## Changes

### Local lodash compatibility

Extended the existing local partial `lodash` workspace with the subpath helpers that blocked TypeScript builds:

```text
app/packages/lodash/debounce.js
app/packages/lodash/debounce.d.ts
app/packages/lodash/isEqual.js
app/packages/lodash/isEqual.d.ts
app/packages/lodash/merge.js
app/packages/lodash/merge.d.ts
app/packages/lodash/_helpers.js
app/packages/lodash/index.d.ts
app/packages/lodash/pick.d.ts
app/packages/lodash/omit.d.ts
```

Covered helper mechanics:

- `debounce`: delayed callback with `leading`, `trailing`, `cancel` and `flush`;
- `merge`: narrow deep merge for plain objects and arrays;
- `isEqual`: narrow deep equality for arrays and plain objects;
- `pick` / `omit` type fallback for generic object-like values used by filters.

### Main package declaration build fix

Added a local typed wrapper for `ErrorStepIcon` in:

```text
app/packages/tend-ui/src/primitives/StepsHistoryApproval/styled.ts
```

This keeps the visual behavior unchanged and fixes a TypeScript declaration portability error.

## Build Order Used

The following commands were run with the existing temporary Windows build-runner shims:

```text
corepack yarn build:utils
corepack yarn build:types
corepack yarn build:hooks
corepack yarn build:styling
corepack yarn build:icons
corepack yarn build:theme
corepack yarn build:primitives
corepack yarn build:main
```

## Verification

Passed:

| Package | Result |
| --- | --- |
| `@10d/tend-ui-utils` | built |
| `@10d/tend-ui-types` | built |
| `@10d/tend-ui-hooks` | built |
| `@10d/tend-ui-styling` | built |
| `@10d/tend-ui-icons` | built |
| `@10d/tend-ui-theme` | built |
| `@10d/tend-ui-primitives` | built |
| `@10d/tend-ui-tokens` | already built in `F-05` |
| `@10d/tend-ui` | built |

Current dist state:

```text
app/packages/tend-ui-utils/dist
app/packages/tend-ui-types/dist
app/packages/tend-ui-hooks/dist
app/packages/tend-ui-styling/dist
app/packages/tend-ui-icons/dist
app/packages/tend-ui-theme/dist
app/packages/tend-ui-primitives/dist
app/packages/tend-ui-tokens/dist
app/packages/tend-ui/dist
```

All listed paths exist.

Additional sanity check:

```text
lodash helpers ok
```

## Warnings

Builds still print non-blocking environment warnings:

```text
Skipping preferred cache folder because it is not writable.
Selected Temp .yarn-cache.
Cannot find a suitable global folder.
Rollup sourcemap warning.
Generated empty chunks in the main package.
```

## Not Done

- no dependency install;
- no Storybook launch;
- no Docker build;
- no package publication;
- no consumer project connection;
- no access to closed corporate sources.

## Decision

The local package build blocker for the main and key packages is resolved.

Next group:

```text
F-06: run Storybook verification.
```
