# F-24: S-Tracker Global Search Input

Status: `[x]` - second isolated Tend UI primitive is implemented and verified.

Date: 2026-07-22

## Goal

Replace the native global task-search field with Tend UI `Input` while preserving S-Tracker's vanilla filtering, DOM identity, layout and direct-file production boundary.

## Implementation

S-Tracker now contains:

- `src/integrations/tend-ui/global-search-input.jsx` for the new `Input` mount;
- `src/integrations/tend-ui/runtime.jsx` for shared `TendUI.init()` and provider rendering;
- the existing `create-task-button.jsx` refactored onto the same runtime;
- `tend-ui-global-search-root` in `index.html` instead of the original raw input;
- the native input identity `#js-global-search` on the rendered Tend UI element.

The adapter does not read or write `window.activeFilters` and does not call `window.applyFilters`. Existing `initGlobalSearch()` still owns those behaviors after the React mount is complete.

`src/main.js` now initializes the interface both before and after `DOMContentLoaded`, removing a timing dependency while preserving the existing initialization order.

## Product Contract

| Contract | Verified result |
| --- | --- |
| Tend UI component | One native `INPUT` from `@10d/tend-ui/primitives/Input`. |
| DOM identity | Exactly one `#js-global-search`. |
| Placeholder and label | `Поиск по задачам`. |
| Desktop geometry | `430 x 36`; width is unchanged and height remains aligned with toolbar actions. |
| Focus state | Primary border and focus shadow are visible. |
| Card search | Query `Дашборд` reduces the list from `20` to `4`. |
| Table search | The same query reduces table rows from `20` to `4`. |
| Clear | Removing all characters restores `20` items. |
| Mobile geometry | Input remains within the tested viewport; document horizontal overflow is absent. |
| Console | `0` errors. |

The toolbar `01/02/03` product specifications remain unchanged because no user-visible product rule, state or cross-component contract changed. Only the implementation code map was updated.

## Build And Boundary Verification

```powershell
npm.cmd run verify:tend-ui:all
```

Passed:

- Vite production build: `721` transformed modules;
- JavaScript: one chunk, `723,251` bytes raw and `223,055` bytes gzip;
- local Tend UI package boundary: passed;
- local compensation security gate: `3/3` passed;
- both Button and Input bundle markers: present;
- direct-file HTML remains one classic deferred script without `type="module"`.

The automation browser rejected navigation to a local `file://` URL by policy, so no alternate browser workaround was attempted. Direct-file compatibility is covered by the production artifact gate and remains unchanged from F-23.

## Source Policy

- no dependency installation;
- no corporate registry, GitLab, Nexus or private source access;
- no tarball replacement;
- no package publication;
- no Docker work;
- no Git staging, commit or push.

## Decision

`F-24` is complete with status `[x]`. S-Tracker now has two verified Tend UI primitives behind one shared, reversible React boundary.

## Next Group

```text
F-25: migrate the functional S-Tracker print toolbar action to Tend UI Button while preserving its existing toast behavior, icon-only layout and consumer gates.
```
