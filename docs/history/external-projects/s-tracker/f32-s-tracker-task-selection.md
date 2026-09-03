# F-32: S-Tracker Task Selection

Date: 2026-07-24

Status: `[x] complete`

## Goal

Migrate card and table task-selection controls to Tend UI `Checkbox` while preserving vanilla-owned selected IDs, select-all, cross-page state and bulk actions.

## Implementation

- added the narrow `@10d/tend-ui/primitives/Checkbox` export with ESM, CJS and types;
- replaced generated checkbox SVG markup with stable dynamic mount points;
- added one shared React portal adapter for card, table and table-header controls;
- added `s-tracker:selection-request` and `s-tracker:selection-changed` as the request/confirmation boundary;
- kept `window.selectedTaskIds`, page-visible selection, row state and bulk actions in `floating-action-bar.js`;
- removed the legacy `.ds-selection-checkbox` visual implementation.

## Verified Product Contract

| Scenario | Result |
| --- | --- |
| Card task selection | Passed |
| Card/table state synchronization | Passed |
| Partly selected header | Passed: indeterminate |
| Select all current page | Passed: 20 tasks |
| Cross-page persistence | Passed: count remains 20 |
| Additional page-two selection | Passed: count becomes 21 |
| Clear through bulk-action bar | Passed: all states return to zero |
| Stable control geometry | Passed: `20 x 20` mount |
| Legacy controls | `0` |
| Browser application errors | `0` |

## Build And Artifacts

```text
Vite modules: 923
JavaScript: 928,233 raw / 286,643 gzip bytes
F-32 budget: F-31 result +32 KiB raw / +12 KiB gzip
```

Main tarball SHA-256:

```text
58eb7763b2e48c2af3f74170d798eb420f72905f83dae20105f6d7e4952f790c
```

Release bundle SHA-256:

```text
6413e8be2a5c1611720a4b521967c53d15bbc566982e5c4627874da48045f1be
```

No closed corporate source was accessed. No package was published.

## Decision

F-32 is complete. Tend UI owns Checkbox rendering and request emission; S-Tracker remains authoritative for selected IDs and every product action.

## Next Group

```text
F-33: migrate the S-Tracker bulk-action bar controls to Tend UI Button while preserving queue-dependent visibility, status actions, group movement and selection clearing.
```
