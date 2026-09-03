# F-03 Dependency Graph Acquisition Path

## Purpose

This document records `F-03`: finalize the dependency graph acquisition path.

The goal is to choose the next executable route for restoring `app/node_modules` without using closed corporate sources and without pretending foundational dependencies can be replaced by local stubs.

## Current State

| Area | Status |
| --- | --- |
| Local Git repository | working on branch `main` |
| `app/node_modules` | absent |
| React / ReactDOM in `app/node_modules` | absent |
| Build tooling (`tsc`, Rollup) | absent |
| Storybook binary | absent |
| `dist` artifacts | absent |
| Current shell network | restricted |
| Closed corporate sources | forbidden |
| Offline-public archive inbox | no reviewed archive imported yet |

## Inputs

| Input | Source |
| --- | --- |
| Dependency graph strategy | `docs/dependency-graph-restoration-strategy.md` |
| Restore route decision | `docs/restore-execution-route-decision.md` |
| Offline-public acquisition plan | `docs/offline-public-package-acquisition-plan.md` |
| Archive preparation request | `docs/offline-public-archive-preparation-request.md` |
| Archive manifest template | `docs/offline-public-archive-manifest-template.md` |
| Import staging runbook | `docs/offline-public-import-staging-runbook.md` |
| Current blocked smoke result | `docs/history/workflows/e32-isolated-react-consumer-smoke-check.md` |

## Decision

Selected path for the current workflow:

```text
reviewed offline-public package archive/cache
```

Reason:

- current shell cannot perform live public npm install;
- closed corporate registry and corporate services are out of scope;
- an offline-public archive can be staged, inspected, checksummed and reviewed before any import;
- this path preserves the difference between public dependencies and local compensation.

Allowed alternate path:

```text
public-enabled local terminal/environment
```

This alternate path is valid only if it uses public npm/GitHub sources and records the exact command, environment and output.

Parallel fallback:

```text
targeted local compensation
```

This remains allowed only for narrow helpers, mocks and clearly understood mechanics. It is not the chosen route for foundational dependencies.

## Selected F-04 Execution Mode

`F-04` should be an archive-gated restore step:

```text
validate reviewed offline-public archive in staging; import only if validation passes
```

If the archive inbox is still empty, `F-04` should close as `[!] blocked input` and keep the exact required input visible.

## Minimum Archive Scope

The first useful archive should target build and Storybook unblock, not every possible dependency.

Required lanes:

1. Build tooling minimum.
2. Storybook and Vite runtime.
3. Foundational React runtime.
4. Minimum React/styled-components type packages.

Minimum packages:

```text
typescript
tsc-alias
rollup
@rollup/plugin-commonjs
@rollup/plugin-node-resolve
@rollup/plugin-typescript
rollup-plugin-copy
rollup-plugin-dts
rollup-plugin-import-css
rollup-plugin-postcss
turbo
storybook
@storybook/react-vite
@storybook/addon-docs
@storybook/addon-designs
vite
@vitejs/plugin-react
vite-plugin-markdown
react
react-dom
styled-components
@types/react
@types/react-dom
@types/styled-components
```

Complex UI mechanics such as `antd-core`, `@tanstack/*`, `@dnd-kit/*` and `rc-*` can be added later or handled as separate component-level tasks. They should not block the first build/Storybook dependency acquisition decision unless required by the first actual build attempt.

## Forbidden Routes

Do not use:

- `packages.samoletgroup.ru`;
- internal registry;
- corporate GitLab;
- Nexus;
- Figma;
- corporate CI/CD artifacts;
- private service infrastructure;
- unverified `node_modules` copies;
- package archive without manifest and checksums;
- fake local stubs for foundational dependencies.

## Local Compensation Boundary

Already acceptable local compensation includes small helpers and service/story mocks:

- `@10d/eslint-config`;
- `@10d/prettier-config`;
- `samolet-oauth2`;
- `query-string`;
- `classnames`;
- `uuid`;
- focused `lodash` helper slices.

Do not locally rewrite as a shortcut:

- React / ReactDOM;
- styled-components;
- TypeScript / `tsc` / `tsc-alias`;
- Rollup and core Rollup plugins;
- Storybook / Vite builder;
- broad AntD, TanStack or drag-and-drop mechanics.

## Not Done

- no dependency install;
- no archive import;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no component source edits;
- no edits inside `S-Tracker`;
- no closed corporate source access.

## Decision Status

`F-03` is complete as a route decision step.

## Next Step

Proceed to:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

`F-04A` prepared the required archive input. The next route step must validate the archive before any restore/import can continue.
