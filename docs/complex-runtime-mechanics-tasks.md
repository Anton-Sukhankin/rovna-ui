# E-31: Complex Runtime Mechanics Tasks

Date: 2026-07-06

## Purpose

Define the remaining complex runtime mechanics that must not be replaced globally or guessed without build, Storybook and runtime verification.

This step does not implement replacements. It creates task boundaries for future work.

## Current Boundary

Already completed local compensation:

- `LC-07A`: `omit`, `pick`, `identity`, `isNil`, `isString`;
- `LC-07B`: `chunk`, `uniq`, `groupBy`, `mapValues`;
- `LC-07C`: `pickBy`, `omitBy`, `isEmpty`, `uniqBy`.

Still blocked:

- `app/node_modules` is absent;
- Storybook binary is absent;
- build tooling is absent;
- `dist` artifacts are absent;
- runtime visual verification is unavailable.

## Static Risk Summary

| Area | Files | Primary packages |
| --- | ---: | --- |
| `antd-core` | 128 | `tend-ui`, `tend-ui-grid`, `tend-ui-typography`, `tend-ui-primitives`, `tend-ui-theme` |
| `@tanstack/react-query` | 21 | `tend-ui-notifications`, `tend-ui-search-assistant` |
| `@tanstack/react-table` | 14 | `tend-ui-tree` |
| `@dnd-kit/*` | 11 | `tend-ui`, `tend-ui-columns-settings`, `tend-ui-tree` |
| high-risk `lodash` helpers | 14 | async controls, presets, Button/Navigation styling, icon/logo scripts |
| `@tanstack/react-virtual` | 2 | `tend-ui` search controls |
| `rc-drawer` | 1 | `tend-ui-primitives` Drawer |
| `rc-overflow` | 1 | `tend-ui-primitives` Overflow |

## Task Backlog

| ID | Mechanic | Source dependencies | Affected area | Decision |
| --- | --- | --- | --- | --- |
| `CM-01` | Ant Design primitive behavior | `antd-core` | Forms, inputs, selects, date/time pickers, table, modal, dropdown, menu, pagination, theme provider and locale | Keep public/offline-public route first. If unavailable, split by primitive and write acceptance criteria per component. Do not create a global fake `antd-core`. |
| `CM-02` | Drawer and overflow measurement | `rc-drawer`, `rc-overflow` | Drawer open/close/placement/focus behavior and overflow item measurement | Separate primitive-level task only. Requires visual/runtime checks. |
| `CM-03` | Drag and sort interactions | `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` | Columns settings reorder and tree row sorting | Separate interaction task. Requires pointer/keyboard acceptance criteria and Storybook/runtime verification. |
| `CM-04` | Tree table model | `@tanstack/react-table` | Tree row model, expansion, selection, pinning, cell rendering, filtering | Separate tree-engine task. Do not replace without detailed row-state contract. |
| `CM-05` | Virtualized search lists | `@tanstack/react-virtual` | Checkbox/radio group search controls | Separate virtualization task. Requires scroll/measurement acceptance criteria. |
| `CM-06` | Service query cache flows | `@tanstack/react-query` | Notifications and search assistant API flows | Prefer Storybook mocks/disabled service scenarios. Do not block core UI primitives on live service behavior. |
| `CM-07` | High-risk lodash runtime helpers | `lodash/isEqual`, `lodash/merge`, `lodash/debounce` | Preset duplicate checks, Button/Navigation styling schema, async controls and hooks | Keep deferred until focused tests or Storybook/runtime checks are possible. |
| `CM-08` | Build-time icon/logo naming | full `require('lodash')` with `kebabCase` | icon/logo generation scripts | Tooling-only local helper candidate, but should be separate from runtime helpers. |

## Implementation Rules For Future Tasks

1. Do not replace foundational dependencies globally.
2. Do not create fake React, Storybook, TypeScript, Rollup, `styled-components` or full `antd-core`.
3. Prefer public/offline-public acquisition for foundational runtime and build dependencies.
4. If local compensation is needed, scope it to one component/mechanic at a time.
5. Each complex mechanic task must define:
   - affected package;
   - affected component;
   - expected user behavior;
   - keyboard/pointer behavior if relevant;
   - visual states;
   - data/state contract;
   - Storybook or smoke-test verification plan.

## Priority Recommendation

| Priority | Task | Reason |
| --- | --- | --- |
| P1 | `CM-06` service query cache mocks | Can unblock non-core Storybook service scenarios without touching core UI behavior. |
| P2 | `CM-08` `kebabCase` generation helper | Tooling-only and narrow, but not urgent until icon/logo generation is needed. |
| P3 | `CM-07` high-risk lodash helpers | Useful but needs tests because it touches presets, styling and async behavior. |
| P4 | `CM-03`, `CM-04`, `CM-05` interaction/table/virtualization | Needs runtime verification. |
| P5 | `CM-01`, `CM-02` primitive engine replacement | Broadest blast radius; public/offline-public dependency route is strongly preferred. |

## Decision

`E-31` is complete as a task-definition step.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

Because dependency graph, build output and Storybook are still unavailable, `E-32` is expected to remain blocked unless the environment changes or a reviewed offline-public dependency archive is imported.
