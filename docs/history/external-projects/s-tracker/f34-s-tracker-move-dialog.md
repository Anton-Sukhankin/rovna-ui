# F-34: S-Tracker Move Dialog Controls

Date: 2026-07-26

Status: `[x] complete`

## Goal

Migrate the move-to-group dialog field and buttons to Tend UI `Input` and `Button` while preserving the native dialog lifecycle and all S-Tracker product mechanics.

## Implementation

- retained the native `#js-modal-move` dialog, title, description and content structure;
- replaced the legacy input, header close, cancel and confirm buttons with three stable mount zones;
- added `move-dialog-controls.jsx` with one Tend UI Input and three Tend UI Buttons;
- retained `#js-move-group-name`, `#js-btn-move-submit`, `.js-modal-move-close` and `.js-btn-confirm-move` hooks;
- added `aria-labelledby` and an explicit label/input association;
- kept all close, reset, fallback, group mutation, toast and selection logic in `floating-action-bar.js`.

## Ownership Contract

React owns control presentation only. The adapter contains no click handlers, selected IDs, custom groups, dialog lifecycle, toast, navigation or rerender logic.

Vanilla S-Tracker continues to own:

- clearing the input whenever the dialog opens;
- native `showModal()` and `close()` calls;
- close and cancel behavior;
- fallback group name `Группа`;
- custom group creation;
- toast content;
- selection clearing, sidebar refresh and task rerendering.

## Browser Verification

| Scenario | Result |
| --- | --- |
| Tend UI controls | Passed: `4` |
| Legacy move controls | Passed: `0` |
| Header close | Dialog closes; selection remains `1` |
| Reopen reset | Input returns to empty |
| Cancel | Dialog closes; no group created; selection remains `1` |
| Empty confirmation | Creates `Группа` |
| Custom name | Creates `F34 Test Group` |
| Confirmation side effects | Dialog closes, selection becomes `0`, panel hides, toast is correct |
| Input geometry | `542 x 40` at tested desktop viewport |
| Close geometry | `40 x 40` |
| Footer actions | Equal-width, `40 px` high |
| Browser application errors | `0` |

## Build

```text
Vite modules: 931
JavaScript: 937,481 raw / 289,178 gzip bytes
F-34 budget: F-33 result +24 KiB raw / +8 KiB gzip
```

`npm.cmd run verify:tend-ui:all` passes. Existing Tend UI tarballs and the release bundle did not change because F-34 uses existing Input, Button and Close exports.

No closed corporate source was accessed. No package was published.

## Decision

F-34 is complete. Tend UI owns the dialog controls; native S-Tracker code remains authoritative for lifecycle, data and side effects.

## Next Group

```text
F-35: migrate the preset-save dialog controls to Tend UI Input and Button while preserving empty-name validation, trimmed names, draft capture, dropdown refresh and close/cancel behavior.
```
