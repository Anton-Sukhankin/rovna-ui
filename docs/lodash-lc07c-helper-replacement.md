# E-29: LC-07C Lodash Object Filtering Helper Replacement

Date: 2026-07-06

## Purpose

Implement the third narrow local `lodash` compensation slice.

This slice covers object filtering and uniqueness helpers that are used by filters, table state and columns settings.

## Implemented Scope

Updated local workspace package:

```text
app/packages/lodash/
```

Runtime helpers covered in `LC-07C`:

| Helper | Supported import shape |
| --- | --- |
| `pickBy` | `lodash/pickBy`, named export from `lodash` |
| `omitBy` | `lodash/omitBy`, named export from `lodash` |
| `isEmpty` | `lodash/isEmpty`, named export from `lodash` |
| `uniqBy` | `lodash/uniqBy`, named export from `lodash` |

Type declarations covered:

```text
app/packages/lodash/pickBy.d.ts
app/packages/lodash/omitBy.d.ts
app/packages/lodash/isEmpty.d.ts
app/packages/lodash/uniqBy.d.ts
app/packages/lodash/index.d.ts
```

## Behavior

| Helper | Local behavior |
| --- | --- |
| `pickBy` | Keeps own enumerable object entries when predicate returns truthy; default predicate is identity. |
| `omitBy` | Removes own enumerable object entries when predicate returns truthy; default predicate is identity. |
| `isEmpty` | Returns `true` for `null`, `undefined`, empty arrays, empty strings, empty objects, empty maps and empty sets. |
| `uniqBy` | Keeps the first array item for each property name or iteratee result. |

## Explicit Non-Scope

The following helpers remain intentionally unimplemented:

- `kebabCase`;
- `isEqual`;
- `merge`;
- `debounce`.

These helpers are still deferred because they affect generation scripts, deep equality, styling schema merging and async behavior.

## Verification

Performed a direct local Node check against:

```text
app/packages/lodash
app/packages/lodash/pickBy
app/packages/lodash/omitBy
app/packages/lodash/isEmpty
app/packages/lodash/uniqBy
```

Result:

```text
LC-07C helper check passed
```

Also checked that the new local package does not contain the deferred high-risk helper names:

```text
isEqual, merge, debounce, kebabCase
```

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
- unimplemented lodash helpers from deferred slices;
- foundational dependencies such as React and styled-components;
- complex runtime dependencies such as `antd-core`, `@tanstack/*` and `@dnd-kit/*`.

## Decision

`E-29` is complete.

Next step from the current E-checklist:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

Because dependency graph and build tooling are still unavailable, `E-30` is expected to remain diagnostic or blocked unless those external conditions change.
