# E-26: Lodash Helper Usage Audit

Date: 2026-07-06

## Purpose

Close `E-26` by auditing actual `lodash` usage before any local `lodash` package, import rewrite or component source change.

This document defines replacement slices. It does not implement them.

## Boundary

Allowed in this step:

- read local source files under `app/packages`;
- classify direct `lodash` imports and `lodash/*` imports;
- define safe replacement order;
- update workflow documents.

Not allowed in this step:

- dependency install;
- network access;
- Storybook launch;
- package build;
- Docker build;
- package publication;
- edits to component source;
- edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- access to closed corporate sources.

## Current Result

`lodash` is a valid local-compensation candidate only as a helper-by-helper task.

It must not be replaced wholesale without tests and runtime verification.

## Static Scan Summary

Direct `lodash` usage was found in 84 source/script files.

Package impact by files with direct lodash usage:

| Package folder | Files |
| --- | ---: |
| `tend-ui` | 40 |
| `tend-ui-filters` | 22 |
| `tend-ui-table` | 9 |
| `tend-ui-columns-settings` | 5 |
| `tend-ui-header` | 3 |
| `tend-ui-hooks` | 1 |
| `tend-ui-icons` | 1 |
| `tend-ui-logos` | 1 |
| `tend-ui-primitives` | 1 |
| `tend-ui-upload` | 1 |

Helper impact by files:

| Helper/import shape | Files | Primary area |
| --- | ---: | --- |
| `omit` | 38 | filter props, column fixed state, upload utils |
| `groupBy` | 11 | table/columns/header grouping |
| `pick` | 8 | filters and columns persistence |
| `isEqual` | 6 | preset comparison |
| `debounce` | 4 | async controls and debounced callback hook |
| `identity` | 4 | filter preset cleanup with `pickBy` |
| `isEmpty` | 4 | table filter indicators/root state |
| `mapValues` | 4 | dependent filters/sorters value mapping |
| `pickBy` | 4 | preset value cleanup |
| `uniqBy` | 4 | table form-change normalization and stories |
| full `require('lodash')` | 2 | icon/logo generation scripts |
| `chunk` | 2 | header burger menu grouping |
| `isNil` | 2 | columns settings preset cleanup |
| `merge` | 2 | Button styling and Navigation styling |
| `omitBy` | 2 | columns settings preset cleanup |
| `uniq` | 2 | stories only |
| `isString` | 1 | DatePicker trigger |

## Helper Behavior Map

| Helper | Needed behavior | Local compensation level | Notes |
| --- | --- | --- | --- |
| `omit` | Return shallow copy without selected keys. | Low | Most usages omit static prop names. First implementation candidate. |
| `pick` | Return shallow object with selected keys. | Low | Used for persisted filter/column payloads. |
| `identity` | Return input value unchanged. | Low | Used as `pickBy` predicate. |
| `isNil` | Check `null` or `undefined`. | Low | Narrow primitive helper. |
| `isString` | Check string value. | Low | Narrow primitive helper. |
| `chunk` | Split array into fixed-size groups. | Low-medium | Header menu layout should be visually verified later. |
| `uniq` | Return unique primitive values. | Low-medium | Currently found in stories. |
| `groupBy` | Group array items by property name or iteratee. | Medium | Table/columns logic depends on exact grouping shape. |
| `mapValues` | Map object values while preserving keys. | Medium | Used in filters/sorters value propagation. |
| `pickBy` | Keep object entries passing predicate. | Medium | Used with `identity`; falsy handling must match expected preset behavior. |
| `omitBy` | Remove object entries passing predicate. | Medium | Used in columns preset cleanup. |
| `isEmpty` | Check empty arrays/objects/strings. | Medium | Needs lodash-like semantics for UI indicators. |
| `uniqBy` | Return unique array items by property or iteratee. | Medium | Table form-change behavior can be affected. |
| `kebabCase` | Convert names to kebab case. | Medium | Build-time icon/logo generation scripts only. |
| `isEqual` | Deep equality for arrays/objects. | High | Preset duplicate detection depends on deep comparison. |
| `merge` | Deep merge objects. | High | Button/Navigation styling can be affected. |
| `debounce` | Delayed callback with options and cancellation semantics. | High | Async components and hooks can be affected. |

## Replacement Slices

| Slice | Status | Helpers | Scope | Why this order |
| --- | --- | --- | --- | --- |
| `LC-07A` object helper base | Next candidate | `omit`, `pick`, `identity`, `isNil`, `isString` | filters, columns settings, DatePicker trigger, upload utils | Small deterministic helpers, easiest to implement and inspect. |
| `LC-07B` collection helper base | Pending after A | `chunk`, `uniq`, `groupBy`, `mapValues` | table, filters, header stories/menu grouping | Still deterministic, but touches table/filter behavior. |
| `LC-07C` object filtering helpers | Pending after B | `pickBy`, `omitBy`, `isEmpty`, `uniqBy` | presets, table state, filter indicators | Requires more careful behavior matching. |
| `LC-07D` build script helpers | Pending after A or B | full `require('lodash')` with `kebabCase` | icon/logo generation scripts | Tooling-only, but affects generated source if scripts are run. |
| `LC-07E` high-risk runtime helpers | Defer | `isEqual`, `merge`, `debounce` | presets, styling schema, async controls | Requires focused tests or runtime checks before replacement. |

## Recommended Next Step

Proceed with `E-27`: implement only `LC-07A`.

Implementation target for `E-27`:

- create a local workspace-compatible `lodash` replacement only if it can satisfy existing import shapes;
- support the narrow helpers `omit`, `pick`, `identity`, `isNil`, `isString`;
- do not touch `isEqual`, `merge`, `debounce`, `groupBy`, `uniqBy` or other higher-risk helpers yet;
- keep implementation behavior documented in a dedicated helper-replacement document;
- do not claim Storybook/build readiness until dependency graph and build tooling are available.

## Verification For Future Implementation

Future `LC-07A` implementation should be verified by static checks first:

| Check | Expected result |
| --- | --- |
| Local package shape | Existing imports like `lodash/omit` resolve to local files. |
| TypeScript declarations | Existing TypeScript imports do not lose types for the covered helpers. |
| Source scope | No component source edits are required for the first slice if package subpaths are compatible. |
| Build/Storybook | Still expected to remain blocked until foundational dependency graph is restored. |

Runtime verification remains blocked until Storybook/build can run.

## Decision

`E-26` is complete as an audit step.

Next step:

```text
E-27 completed in `docs/lodash-lc07a-helper-replacement.md`.

Next step:

```text
E-28 completed in `docs/lodash-lc07b-helper-replacement.md`.

Next step:

```text
E-29 completed in `docs/lodash-lc07c-helper-replacement.md`.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```
```
```
```
