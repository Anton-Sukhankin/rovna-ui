# E-25: Local Compensation Lane Decision

Date: 2026-07-06

## Purpose

Choose the next local compensation lane while the offline-public archive route is blocked by missing archive input.

This step does not install dependencies, build packages, launch Storybook, run Docker, publish packages or change source files.

## Current Blocker

The archive route is blocked because:

- `tmp/offline-public-archive-staging/inbox/` is empty;
- no reviewed archive is available;
- no archive manifest is available;
- no checksum file is available;
- the current shell has no public network access to create the archive.

## Candidates Considered

| Candidate | Decision | Reason |
| --- | --- | --- |
| `LC-07` focused lodash helper audit | Selected | Many lodash imports are helper-level and can be scoped helper-by-helper before any replacement. |
| `LC-02` service/realtime mock | Deferred | Useful later for Storybook service scenarios, but less central than the broad lodash helper surface. |
| Fake React/Storybook/TypeScript/Rollup stubs | Rejected | Foundational dependencies must not be faked. |
| Complex UI mechanics replacement | Deferred | `antd-core`, `@dnd-kit/*`, `@tanstack/*` and `rc-*` require separate component-level tasks and visual/runtime verification. |

## Selected Lane

```text
LC-07: focused lodash helper audit
```

This is an audit lane first, not an implementation lane.

The goal is to identify exact lodash helpers, package impact and safe replacement slices before creating any local `lodash` workspace or editing imports.

## Static Scan Summary

Direct lodash usage was found across these packages:

| Package folder | Matches |
| --- | ---: |
| `tend-ui` | 48 |
| `tend-ui-filters` | 27 |
| `tend-ui-table` | 11 |
| `tend-ui-columns-settings` | 8 |
| `tend-ui-header` | 3 |
| `tend-ui-hooks` | 3 |
| `tend-ui-icons` | 2 |
| `tend-ui-logos` | 2 |
| `tend-ui-upload` | 2 |
| `tend-ui-primitives` | 1 |
| `tend-ui-rollup-config` | 1 |

Detected helpers:

| Helper/import shape | Matches |
| --- | ---: |
| `omit` | 38 |
| `groupBy` | 11 |
| `pick` | 8 |
| `isEqual` | 6 |
| `debounce` | 4 |
| `identity` | 4 |
| `isEmpty` | 4 |
| `mapValues` | 4 |
| `pickBy` | 4 |
| `uniqBy` | 4 |
| full `require('lodash')` | 2 |
| `chunk` | 2 |
| `isNil` | 2 |
| `kebabCase` | 2 |
| `merge` | 2 |
| `omitBy` | 2 |
| `uniq` | 2 |
| Rollup external pattern | 1 |
| `isString` | 1 |

## Why This Lane Is Safe To Audit

- It does not touch foundational runtime/build dependencies.
- Existing imports are mostly per-helper imports like `lodash/omit` and `lodash/pick`.
- Several helpers are pure data transforms and can be evaluated locally.
- The lane can be split into small replacement tasks with direct checks.

## What Is Not Allowed Yet

Do not:

- replace lodash wholesale;
- create a local `lodash` workspace before exact helper behavior is documented;
- edit component imports in this step;
- claim runtime compatibility before tests/build/Storybook can run;
- use closed corporate sources to resolve lodash.

## Next Step

```text
E-26 completed in `docs/lodash-helper-audit.md`.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```
```

The completed audit produced a detailed helper map and replacement-slice plan:

- helper;
- files;
- package;
- usage pattern;
- behavior needed;
- replacement difficulty;
- whether local compensation is allowed;
- suggested verification.

Only after that audit should implementation begin. The first approved implementation slice is `LC-07A`.
