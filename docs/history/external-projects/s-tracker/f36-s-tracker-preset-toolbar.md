# F-36: S-Tracker Preset Toolbar

## Result

Status: `[x] complete`

The column-settings preset trigger and Save action now render through Tend UI `Button`; the trigger uses the packaged `ChevronDown` icon.

## Ownership Boundary

`src/integrations/tend-ui/preset-toolbar.jsx` owns presentation and confirmed React state for the current label, `aria-expanded` and Save disabled state. `src/features/columns/columns-drawer.js` remains the owner of dropdown visibility, preset data, active preset, draft comparison, column replay, deletion and dialog opening.

Synchronization uses `s-tracker:preset-toolbar-changed`. The adapter has no product action handlers.

## Preserved Contract

```text
.js-preset-dropdown-trigger
.js-preset-current
.js-preset-save-btn
.js-preset-option
.js-preset-delete
```

- the trigger opens and closes the existing dropdown;
- outside click closes it and synchronizes `aria-expanded`;
- unchanged drafts keep Save disabled;
- column changes enable Save;
- saved and base presets restore their respective column states;
- deleting the active preset returns to the base state;
- deletion is now a semantic button with an accessible name and stable hover geometry.

## Verification

- `npm.cmd run verify:tend-ui:all`: passed;
- Vite build: `933` transformed modules;
- toolbar controls: `2` Tend UI, `0` legacy;
- trigger/save geometry: `36 px` high;
- initial, dirty, saved, base replay and active deletion scenarios: passed;
- dropdown/listbox and expanded-state synchronization: passed;
- reviewed bundle: `940,702` raw / `290,034` gzip bytes;
- browser application errors: `0`;
- registry-neutral package/release artifacts: unchanged, existing exports only;
- closed corporate source access: not used.

## Next Group

```text
F-37: migrate the column-settings footer actions to Tend UI Button while preserving attribute-library expansion, default reset, draft commit and Apply disabled behavior.
```
