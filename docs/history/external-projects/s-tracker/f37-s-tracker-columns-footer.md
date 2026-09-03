# F-37: S-Tracker Column-Settings Footer

## Result

Status: `[x] complete`

All four column-settings footer actions now render through Tend UI `Button`: attribute-library toggle, library-only reset, default reset and Apply. The first two use packaged `Book` and `Refresh` icons.

## Ownership Boundary

`src/integrations/tend-ui/columns-footer-actions.jsx` owns presentation plus confirmed library-open and library-reset-disabled state. `src/features/columns/columns-drawer.js` remains the owner of drawer expansion, draft columns, library membership, default reset, commit to `window.customColumnState` and table rerendering.

Synchronization uses `s-tracker:columns-footer-changed`. The adapter has no product `onClick` handlers. Apply remains enabled because that is the existing S-Tracker contract; no new disabled behavior was invented.

## Preserved Contract

```text
.js-open-library
.js-library-reset
.js-columns-reset
.js-columns-apply
```

- the library toggle expands/collapses the left pane and synchronizes `aria-expanded`;
- library reset is hidden while closed, visible/disabled with no additions and enabled with additions;
- library changes stay in the drawer draft until Apply;
- Apply commits the draft, closes the drawer/library and rerenders the table;
- default reset changes the draft to base without deleting presets or mutating the table before Apply.

## Verification

- `npm.cmd run verify:tend-ui:all`: passed;
- Vite build: `936` transformed modules;
- footer controls: `4` Tend UI, `0` legacy;
- control geometry: `36 px` high;
- library open/close and reset state: passed;
- add -> reset and add -> Apply flows: passed;
- `internal_id` remained absent before Apply and appeared after Apply;
- default -> Apply removed the committed library column;
- reviewed bundle: `945,839` raw / `291,773` gzip bytes;
- browser application errors: `0`;
- registry-neutral package/release artifacts: unchanged, existing exports only;
- closed corporate source access: not used.

## Next Group

```text
F-38: migrate the column-settings header close action and attribute-library search field to Tend UI Button/Input while preserving discard-on-close, library collapse, search filtering and query lifecycle.
```
