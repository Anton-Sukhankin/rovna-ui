# E-27: LC-07A Lodash Object Helper Replacement

Date: 2026-07-06

## Purpose

Implement the first narrow local `lodash` compensation slice selected in `E-26`.

This is not a full lodash replacement. It only covers `LC-07A`.

## Implemented Scope

Created local workspace packages:

```text
app/packages/lodash/
app/packages/types-lodash/
```

Runtime helpers covered:

| Helper | Supported import shape |
| --- | --- |
| `omit` | `lodash/omit`, named export from `lodash` |
| `pick` | `lodash/pick`, named export from `lodash` |
| `identity` | `lodash/identity`, named export from `lodash` |
| `isNil` | `lodash/isNil`, named export from `lodash` |
| `isString` | `lodash/isString`, named export from `lodash` |

Type declarations covered:

```text
app/packages/lodash/*.d.ts
app/packages/types-lodash/index.d.ts
```

## Behavior

| Helper | Local behavior |
| --- | --- |
| `omit` | Returns a shallow copy without selected own enumerable keys. |
| `pick` | Returns a shallow object containing selected own enumerable keys. |
| `identity` | Returns the input value unchanged. |
| `isNil` | Returns `true` for `null` and `undefined`. |
| `isString` | Returns `true` for string primitives and `String` objects. |

## Explicit Non-Scope

The following helpers remain intentionally unimplemented:

- `groupBy`;
- `mapValues`;
- `pickBy`;
- `omitBy`;
- `isEmpty`;
- `uniqBy`;
- `uniq`;
- `chunk`;
- `kebabCase`;
- `isEqual`;
- `merge`;
- `debounce`.

This means the local `lodash` package is still partial. Build and Storybook are not expected to be unblocked by `E-27` alone.

## Verification

Performed a direct local Node check against:

```text
app/packages/lodash
app/packages/lodash/omit
app/packages/lodash/pick
app/packages/lodash/identity
app/packages/lodash/isNil
app/packages/lodash/isString
```

Result:

```text
LC-07A helper check passed
```

Also checked that the new local package does not contain the deferred high-risk helper names.

## Not Performed

- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no edits to existing component source files;
- no access to closed corporate sources.

## Expected Remaining Blockers

The project can still be blocked by:

- missing dependency graph and `app/node_modules`;
- missing TypeScript/Rollup/Storybook tooling;
- unimplemented lodash helpers from later slices;
- foundational dependencies such as React and styled-components;
- complex runtime dependencies such as `antd-core`, `@tanstack/*` and `@dnd-kit/*`.

## Decision

`E-27` is complete.

Next recommended step:

```text
E-28 completed in `docs/lodash-lc07b-helper-replacement.md`.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```
```
