# E-28: LC-07B Lodash Collection Helper Replacement

Date: 2026-07-06

## Purpose

Implement the second narrow local `lodash` compensation slice selected after `E-27`.

This is still not a full lodash replacement. It only extends the local package with deterministic collection helpers.

## Implemented Scope

Updated local workspace package:

```text
app/packages/lodash/
```

Runtime helpers covered in `LC-07B`:

| Helper | Supported import shape |
| --- | --- |
| `chunk` | `lodash/chunk`, named export from `lodash` |
| `uniq` | `lodash/uniq`, named export from `lodash` |
| `groupBy` | `lodash/groupBy`, named export from `lodash` |
| `mapValues` | `lodash/mapValues`, named export from `lodash` |

Type declarations covered:

```text
app/packages/lodash/chunk.d.ts
app/packages/lodash/uniq.d.ts
app/packages/lodash/groupBy.d.ts
app/packages/lodash/mapValues.d.ts
app/packages/lodash/index.d.ts
```

## Behavior

| Helper | Local behavior |
| --- | --- |
| `chunk` | Splits an array into fixed-size groups; returns `[]` for non-arrays or invalid sizes. |
| `uniq` | Returns unique array values using JavaScript `Set` semantics. |
| `groupBy` | Groups array items by property name or iteratee function result. |
| `mapValues` | Maps own enumerable object values while preserving keys. |

## Explicit Non-Scope

The following helpers remain intentionally unimplemented:

- `pickBy`;
- `omitBy`;
- `isEmpty`;
- `uniqBy`;
- `kebabCase`;
- `isEqual`;
- `merge`;
- `debounce`.

`LC-07B` therefore reduces more lodash surface, but the local `lodash` package is still partial.

## Verification

Performed a direct local Node check against:

```text
app/packages/lodash
app/packages/lodash/chunk
app/packages/lodash/uniq
app/packages/lodash/groupBy
app/packages/lodash/mapValues
```

Result:

```text
LC-07B helper check passed
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

`E-28` is complete.

Next recommended step:

```text
E-29 completed in `docs/lodash-lc07c-helper-replacement.md`.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```
```
