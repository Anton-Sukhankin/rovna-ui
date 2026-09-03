# F-33: S-Tracker Bulk Actions

Date: 2026-07-24

Status: `[x] complete`

## Goal

Migrate the floating bulk-action controls to Tend UI `Button` while preserving S-Tracker ownership of selection, queue-dependent visibility, group movement and selection clearing.

## Implementation

- replaced seven static legacy buttons with two stable React mount points;
- added `src/integrations/tend-ui/bulk-actions.jsx` with seven Tend UI Buttons and narrow icon imports;
- retained the established `.js-fab-*` hooks so `floating-action-bar.js` remains the only business-logic owner;
- used a React portal for the separate clear-selection mount;
- removed the obsolete `.ds-button--fab-outline` and `.ds-fab__close` implementations;
- extended source, ownership and bundle gates for F-33.

## Ownership Contract

The React adapter renders labels, icons and stable DOM hooks. It has no `onClick`, selected-ID, task-data, group, navigation, toast or rerender logic.

S-Tracker vanilla code continues to own selected task IDs, contextual visibility, dialog lifecycle, custom groups, toasts, sidebar refresh, task rerendering and selection clearing.

The pre-existing Status, Assign, Work and Done actions remain presentation-only where no product handler existed. F-33 does not invent unverified mechanics.

## Browser Verification

| Scenario | Result |
| --- | --- |
| Tend UI bulk controls | Passed: `7` |
| Legacy bulk buttons | Passed: `0` |
| Initial hidden state | Passed |
| Todo selection | Status, move, work and clear visible |
| Status no-op contract | Passed: selection and panel unchanged |
| Move dialog | Passed |
| Create custom group | Passed: task moved and selection cleared |
| Remove task from custom group | Passed: empty group removed |
| Explicit clear button | Passed: count `1 -> 0`, panel hidden |
| Control geometry | Passed: actions `38 px` high; clear `38 x 38` |
| Viewport fit | Passed: no horizontal overflow |
| Browser application errors | `0` |

## Build

```text
Vite modules: 930
JavaScript: 936,175 raw / 288,864 gzip bytes
F-33 budget: F-32 result +40 KiB raw / +12 KiB gzip
```

`npm.cmd run verify:tend-ui:all` passes. Existing Tend UI tarballs and the release bundle did not change because F-33 uses existing Button and icon exports.

No closed corporate source was accessed. No package was published.

## Decision

F-33 is complete. Tend UI owns bulk-control presentation; S-Tracker remains authoritative for every product action and state transition.

## Next Group

```text
F-34: migrate the move-to-group dialog form controls to Tend UI Input and Button while preserving native dialog lifecycle, group creation, fallback naming, toast and selection clearing.
```
