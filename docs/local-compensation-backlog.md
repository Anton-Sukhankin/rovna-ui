# Local Compensation Backlog

## Purpose

This document closes `E-06`: it prepares the local compensation backlog and the first implementation candidates after `E-05`.

The goal is not to implement replacements yet. The goal is to decide which missing dependency areas are safe to compensate locally, which must stay on a public/offline-public dependency route, and which need separate component-level work.

## Current Status

Checked on: 2026-07-06.

Known facts:

- `app/node_modules` is still missing.
- `dist` output is still missing.
- Storybook and build are still blocked.
- Public npm access in the current Codex environment stopped on `AggregateError [EACCES]`.
- Closed corporate sources remain forbidden.
- The design-system source of truth remains local `app/` and `app/packages`.

## Backlog Legend

| Status | Meaning |
| --- | --- |
| `ready-candidate` | Safe enough to prepare as a first implementation task. |
| `needs-scope` | Needs a smaller technical plan before code changes. |
| `defer-public-first` | Prefer public/offline-public dependency acquisition before local replacement. |
| `defer-complex` | Too risky to replace without Storybook/build/runtime verification. |
| `do-not-rewrite` | Foundational dependency; do not manually reimplement in this workflow. |

## Compensation Backlog

| ID | Dependency / area | Affected packages / files | Missing mechanic | Strategy | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- |
| LC-01 | `samolet-oauth2` auth integration | `app/packages/tend-ui-notifications/src/shared/api/client.ts`, `app/packages/tend-ui-notifications/src/shared/api/centrifuge.ts`, `app/packages/tend-ui-search-assistant/src/shared/api/client.ts`, `app/packages/tend-ui-search-assistant/src/entities/user/ui/avatar/ui/UserAvatar.tsx` | Corporate auth storage and Axios auth interceptor. | Local workspace auth mock/stub added in `E-09`; see `docs/service-auth-mock-boundary.md`. | `done` | P1 |
| LC-02 | Notifications/search-assistant service transport | `axios`, `centrifuge`, `@tanstack/react-query`, `query-string` in `tend-ui-notifications` and `tend-ui-search-assistant` | API calls, query serialization, realtime subscriptions and async cache flows. | Build mock service layer for Storybook scenarios; keep live service integration disabled. | `needs-scope` | P1 |
| LC-03 | Missing tooling configs | `app/package.json`, `app/packages/tend-ui/package.json`, `app/packages/tend-ui-eslint-local-config/index.js` reference `@rovna-ui/eslint-config` / `@rovna-ui/prettier-config`. | Lint/prettier presets, not runtime UI. | Local config/stub packages added in `E-07`; see `docs/tooling-config-stubs.md`. | `done` | P1 |
| LC-04 | `classnames` helper | Static scan found usage in primitives, typography, upload, header, table and tree; examples include Button, Form, Drawer, Tag, Spinner and TreeNode. | Conditional CSS class composition. | Local helper replacement added in `E-11`; see `docs/classnames-helper-replacement.md`. | `done` | P2 |
| LC-05 | `query-string` narrow usage | `app/packages/tend-ui-notifications/src/shared/api/methods.ts`, `app/packages/tend-ui-search-assistant/src/shared/api/methods.ts` | Query parameter serialization for service API calls. | Local narrow serializer added in `E-10`; see `docs/query-string-replacement.md`. | `done` | P2 |
| LC-06 | `uuid` helper | Runtime imports use only `v4()` in upload attachments, filters presets and columns-settings presets. | Internal stable IDs for uploads and saved presets. | Local helper replacement added in `E-12`; see `docs/uuid-helper-replacement.md`. | `done` | P2 |
| LC-07 | Focused `lodash` helpers | Static scan found helpers such as `pick`, `omit`, `groupBy`, `isEqual`, `pickBy`, `omitBy`, `isNil`, `mapValues`, `uniqBy`, `debounce`, `chunk`, `isEmpty`. | Collection/object helpers across filters, columns settings, table, upload and hooks. | `LC-07A`, `LC-07B` and `LC-07C` implemented through local `lodash` and `@types/lodash` workspace packages. Deferred helpers remain `kebabCase`, `isEqual`, `merge` and `debounce`. | `partial-done-deferred-high-risk` | P2 |
| LC-08 | `@dnd-kit/*` mechanics | Columns settings and tree: `DndContext`, `SortableContext`, `useSortable`, transforms and sorting strategy. | Drag-and-drop sensors, reorder behavior, keyboard/pointer interactions. | Keep public/offline-public route first; local replacement must be a separate component-level task. Task boundary defined in `docs/complex-runtime-mechanics-tasks.md`. | `task-defined-defer-complex` | P3 |
| LC-09 | `@tanstack/react-table` and `@tanstack/react-virtual` | Tree/table models, row state, cell rendering, virtualized search groups. | Table/tree state model, row expansion/selection/pinning, virtualization. | Keep public/offline-public route first; only compensate with detailed acceptance criteria. Task boundary defined in `docs/complex-runtime-mechanics-tasks.md`. | `task-defined-defer-complex` | P3 |
| LC-10 | `antd-core`, `rc-drawer`, `rc-overflow` | Core primitives, grid, theme, typography, overlays, drawers, overflow behavior. | Base primitive behavior, overlays, measurement, forms/select/date/time controls. | Keep public/offline-public route first; compensate only by specific primitive, not globally. Task boundary defined in `docs/complex-runtime-mechanics-tasks.md`. | `task-defined-defer-complex` | P3 |
| LC-11 | `dayjs` | Date/time controls, locale setup, filters and stories. | Date parsing, formatting, locale behavior and date calculations. | Public/offline-public route first; local replacement only for a proven narrow case. | `defer-public-first` | P3 |
| LC-12 | React runtime and rendering | `react`, `react-dom` across the design system. | Component runtime, hooks, context, portals and Storybook rendering. | Do not rewrite; acquire through public/offline-public route. | `do-not-rewrite` | P0 |
| LC-13 | `styled-components` | Theme, styled wrappers and visual state styles across most packages. | CSS-in-JS, theme propagation and variant styling. | Do not rewrite in this workflow; acquire through public/offline-public route. | `do-not-rewrite` | P0 |
| LC-14 | Storybook/build stack | Storybook packages, TypeScript, Rollup, Vite, Turbo and related tooling. | Storybook runtime, docs rendering, build and `dist` generation. | Do not rewrite; acquire through public/offline-public route. | `do-not-rewrite` | P0 |

## First Implementation Candidates

These are the safest candidates to turn into implementation tasks first:

| Candidate | Why first | Expected output | Verification later |
| --- | --- | --- | --- |
| LC-03 tooling config stubs | Tooling-only and not user-facing runtime UI. | Done in `E-07`: local workspace packages for `@rovna-ui/eslint-config` and `@rovna-ui/prettier-config`. | Install/build diagnostic should no longer need the closed registry for those two package names. |
| LC-01 auth mock boundary | Corporate-only source is forbidden and service flows should not block core UI Storybook. | Done in `E-09`: local workspace package `samolet-oauth2`. | Service Storybook scenarios can run without corporate auth after dependency graph is otherwise available. |
| LC-05 query serialization helper | Narrow service-layer usage. | Done in `E-10`: local workspace package `query-string`. | API mock scenarios preserve comma array query shape. |
| LC-04 class name helper | Low-complexity helper behavior. | Done in `E-11`: local workspace package `classnames`. | Visual class names still need Storybook/runtime verification after build is unblocked. |

## Deferred Or Protected Areas

Do not start these as broad local rewrites:

- React / React DOM.
- `styled-components`.
- Storybook and build tooling.
- `antd-core` as a whole.
- `@dnd-kit/*` as a whole.
- `@tanstack/*` as a whole.
- `dayjs` as a general date engine.

If any of these remain unavailable, create a separate component-level task with:

- exact component;
- exact story;
- expected states and interactions;
- keyboard/pointer/focus behavior;
- visual acceptance criteria;
- fallback behavior;
- verification path.

## E-07 Result

`E-07` implemented `LC-03`.

Created local workspace packages:

```text
app/packages/eslint-config
app/packages/prettier-config
```

Recorded in:

```text
docs/tooling-config-stubs.md
```

## E-08 Recommendation

The recommended next step is:

```text
E-08: re-run build diagnostics or continue with the next low-risk compensation slice.
```

Recommended next slice if build remains blocked by missing dependencies:

```text
LC-01 service auth mock boundary.
```

## E-08 Result

`E-08` is complete as a blocked build diagnostic.

Recorded in:

```text
docs/history/workflows/e08-build-after-lc03-diagnostics.md
```

Result:

- local config stubs are recognized by Yarn workspaces;
- build still stops on nested plain `yarn`;
- `app/node_modules` remains missing;
- no `dist` artifacts were created.

Next recommended backlog item:

```text
LC-01 service auth mock boundary.
```

## E-09 Result

`E-09` implemented `LC-01`.

Created local workspace package:

```text
app/packages/samolet-oauth2
```

Recorded in:

```text
docs/service-auth-mock-boundary.md
```

Result:

- `samolet-oauth2` is recognized by Yarn workspaces;
- `@rovna-ui/notifications` sees it as a workspace dependency;
- `@rovna-ui/search-assistant` sees it as a workspace dependency;
- no closed corporate auth/source access is required for that dependency name.

Next recommended backlog item:

```text
LC-05 query-string narrow usage.
```

## E-10 Result

`E-10` implemented `LC-05`.

Created local workspace package:

```text
app/packages/query-string
```

Recorded in:

```text
docs/query-string-replacement.md
```

Result:

- `query-string` is recognized by Yarn workspaces;
- `@rovna-ui/notifications` sees it as a workspace dependency;
- `@rovna-ui/search-assistant` sees it as a workspace dependency;
- `stringify(params, { arrayFormat: 'comma' })` is supported for the locally used service-layer scenario.

Next recommended action:

```text
E-11: implement LC-04 class name helper.
```

Reason:

- both avoid closed corporate sources;
- both have limited runtime blast radius;
- both reduce future install/build/Storybook blockers without rewriting core UI mechanics.

## E-11 Result

`E-11` implemented `LC-04`.

Created local workspace package:

```text
app/packages/classnames
```

Recorded in:

```text
docs/classnames-helper-replacement.md
```

Result:

- `classnames` is recognized by Yarn workspaces;
- local usage in primitives, typography, upload, header, table and tree is covered by strings, arrays and conditional object composition;
- no component source files were changed;
- runtime visual behavior still needs Storybook or consumer smoke verification after dependency graph/bootstrap is solved.

Next recommended action:

```text
E-12: scope and implement LC-06 uuid helper.
```

Reason:

- `uuid` has limited local usage;
- it is another small helper candidate;
- build and Storybook are still expected to hit missing dependency graph/plain `yarn` blockers, so another narrow compensation step has better value before repeating diagnostics.

## E-12 Result

`E-12` implemented `LC-06`.

Created local workspace packages:

```text
app/packages/uuid
app/packages/types-uuid
```

Recorded in:

```text
docs/uuid-helper-replacement.md
```

Result:

- `uuid` is recognized by Yarn workspaces;
- `@types/uuid` is recognized by Yarn workspaces;
- local runtime usage of `import { v4 as uuidv4 } from 'uuid'` is covered;
- generated IDs match UUID v4 string shape;
- no component source files were changed;
- runtime behavior still needs Storybook or consumer smoke verification after dependency graph/bootstrap is solved.

Next recommended action:

```text
E-13: run a build diagnostic checkpoint after LC-04 and LC-06.
```

Reason:

- two visual/runtime helper blockers were just compensated;
- build is still expected to remain blocked, but the blocker should be re-confirmed before starting broader `LC-07` lodash work.

## E-13 Result

`E-13` is complete as a blocked build diagnostic.

Recorded in:

```text
docs/history/workflows/e13-build-after-lc04-lc06-diagnostics.md
```

Result:

- `classnames`, `uuid` and `@types/uuid` are recognized by Yarn workspaces;
- build attempts still stop on nested plain `yarn`;
- `app/node_modules` is still absent;
- no `dist` output is created;
- broader `LC-07` lodash work should wait until the build-runner blocker has a local strategy.

Next recommended action:

```text
E-14: define local build-runner strategy for nested plain yarn calls.
```

## E-14 Result

`E-14` is complete as a build-runner strategy step.

Recorded in:

```text
docs/history/workflows/e14-build-runner-strategy.md
```

Result:

- selected a temporary local `yarn.cmd` shim for the next diagnostic shell;
- rejected broad package script rewrites for now;
- rejected global Yarn installation / `corepack enable` for now;
- kept the workflow inside local/offline boundaries;
- did not install dependencies or create build artifacts.

Next recommended action:

```text
E-15: create temporary local yarn.cmd shim and run narrow build diagnostics.
```

## E-15 Result

`E-15` is complete as a blocked shimmed build diagnostic.

Recorded in:

```text
docs/history/workflows/e15-shimmed-build-diagnostics.md
```

Result:

- temporary `yarn.cmd` shim works;
- build attempts move beyond nested plain `yarn`;
- current blocker is missing `tsc`;
- `app/node_modules` is still absent;
- no `dist` output is created.

Next recommended action:

```text
E-16: define dependency graph and build tooling restoration strategy.
```

## E-16 Result

`E-16` is complete as a strategy step.

Recorded in:

```text
docs/dependency-graph-restoration-strategy.md
```

Result:

- foundational build/runtime tools are protected from fake local stubs;
- public/offline-public dependency restoration is selected as the required route;
- local compensation remains limited to exact narrow helpers, mocks and component-level tasks;
- broader `LC-07` lodash work should wait until the dependency graph/build tooling route is prepared.

Next recommended action:

```text
E-17: prepare executable public-only dependency restore runbook.
```

## E-17 Result

`E-17` is complete as a runbook step.

Recorded in:

```text
docs/public-only-dependency-restore-executable-runbook.md
```

Result:

- public-only restore command and registry boundary are documented;
- protected files and allowed changed paths are documented;
- stop conditions and rollback/cleanup rules are documented;
- no dependency install was run;
- local compensation backlog remains paused before broader `LC-07` until dependency graph restore is attempted or blocked.

Next recommended action:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## Not Done In E-06

- No dependency install.
- No network call.
- No build.
- No Storybook launch.
- No Docker build.
- No package publication.
- No source-code edits.
- No edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`.
- No changes inside `S-Tracker`.
