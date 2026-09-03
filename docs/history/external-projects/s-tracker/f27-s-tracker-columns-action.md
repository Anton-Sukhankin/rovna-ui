# F-27: S-Tracker Column Settings Action

## Goal

Migrate the table column-settings toolbar action to Tend UI while preserving visibility, drawer behavior and custom-view movement.

## Implementation

S-Tracker now renders the main action through:

```text
src/integrations/tend-ui/columns-button.jsx
```

The adapter uses Tend UI `Button` and `Settings`. It preserves `#js-columns-btn` and `.js-btn-open-columns`; `columns-drawer.js` remains the owner of drafts, presets, library attributes, apply/reset and table rerendering.

`tasks-view.js` moves `#tend-ui-columns-root` between the main toolbar and `#js-header-actions`.

## Preserved Contract

| Contract | Result |
| --- | --- |
| Card visibility | Passed: hidden |
| Table visibility and geometry | Passed: visible, `40 x 40` |
| Accessible name / title | Passed: `Настройка колонок` |
| Drawer and overlay opening | Passed |
| Custom-group card view | Passed: hidden in header |
| Custom-group table view | Passed: visible in header |
| Return to main toolbar | Passed |
| Column-state ownership | Passed: adapter contains no drawer/draft state |

## Navigation Boundary Fix

Browser verification found that the return route still used React-owned `.js-btn-create-task` as an `insertBefore` anchor. Since F-22, the direct toolbar child is `#tend-ui-create-task-root`.

F-27 replaces the anchor with that mount node. Column and print mounts now return from the custom header without detaching React-owned DOM or remaining in the wrong parent.

## Consumer Gates

The final gate passed:

```text
Vite modules: 727
JavaScript chunks: 1
Bundle raw: 729,759 bytes
Bundle gzip: 225,170 bytes
```

## Boundaries

- the system-overlay columns trigger remains vanilla;
- column-setting product specifications are unchanged;
- no dependency installation, registry, publication or closed corporate source access.

## Decision

`F-27` is complete with status `[x]`. S-Tracker now has five verified Tend UI controls behind one shared runtime, and the custom-view mount return route is corrected.

## Next Group

```text
F-28: migrate the S-Tracker download toolbar action to Tend UI Button/Icon while preserving table visibility, custom-view placement and the current no-op contract.
```
