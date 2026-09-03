# F-35: S-Tracker Preset Dialog Controls

## Result

Status: `[x] complete`

The S-Tracker column-preset dialog now renders one Tend UI `Input` and three Tend UI `Button` controls through the shared isolated React runtime.

## Ownership Boundary

`src/integrations/tend-ui/preset-dialog-controls.jsx` owns presentation, controlled input state and stable DOM hooks only. `src/features/columns/columns-drawer.js` remains the owner of native dialog lifecycle, validation, trimming, draft capture, preset storage, active-preset state and dropdown refresh.

The input reset crosses the React/vanilla boundary through `s-tracker:preset-name-reset`. The same controlled-reset pattern was applied to the F-34 move dialog to prevent stale React values after native dialog close/reopen cycles.

## Preserved Contract

```text
#js-modal-preset
#js-preset-name-input
.js-modal-preset-close
.js-btn-preset-submit
```

- whitespace-only names keep the dialog open and create no preset;
- names are trimmed before storage;
- the current drawer draft is captured before storage;
- the new preset becomes active and appears in the dropdown;
- choosing the base preset restores the base columns;
- choosing the saved preset restores its captured column state;
- header close and cancel close without creating a preset;
- each open starts with an empty field.

## Verification

- `npm.cmd run verify:tend-ui:all`: passed;
- Vite build: `932` transformed modules;
- controls: `4` Tend UI, `0` legacy;
- geometry: `40 px` input/actions and `40 x 40` close;
- whitespace validation, close and cancel: passed;
- trimmed save: `"  F35 Preset  " -> "F35 Preset"`;
- draft replay: base preset restores `Система`, saved preset hides it again;
- reviewed bundle: `939,361` raw / `289,710` gzip bytes;
- registry-neutral package/release artifacts: unchanged, existing exports only;
- closed corporate source access: not used.

## Next Group

```text
F-36: migrate the column-settings preset trigger and Save action to Tend UI Button while preserving dropdown selection/deletion, active preset, draft dirty-state and disabled behavior.
```
