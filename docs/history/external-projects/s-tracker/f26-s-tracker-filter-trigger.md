# F-26: S-Tracker Toolbar Filter Trigger

## Goal

Migrate the main S-Tracker filter trigger to Tend UI while preserving the complete drawer, count and independent-reset contract.

## Implementation

S-Tracker now renders the toolbar filter control through:

```text
src/integrations/tend-ui/toolbar-filter-button.jsx
```

The adapter uses Tend UI `Button`, `FilterAlt` and `Close`. It preserves `#js-sidebar-filters-btn`, `.js-btn-open-filters`, `.js-filter-reset-indicator` and `.js-filter-reset-count`.

`src/features/filters/filter-drawer.js` remains the sole owner of `window.activeFilters`, `window.applyFilters`, drawer/overlay visibility, count updates, reset and task rerendering.

## Preserved Contract

| Contract | Result |
| --- | --- |
| Stable geometry | Passed: `120 x 36` |
| Drawer and overlay opening | Passed |
| Active classes | Passed: `is-active-filter`, `has-active-filters` |
| Active count | Passed: `0 -> 1 -> 0` |
| Icon replacement | Passed: filter icon hides when indicator appears |
| Independent indicator reset | Passed: resets/applies without opening drawer |
| Card/table/custom-group routes | Passed |
| Product-state ownership | Passed: no filter/drawer state inside React adapter |

## Consumer Gates

`npm.cmd run verify:tend-ui:all` passed before the final documentation sync:

```text
Vite modules: 725
JavaScript chunks: 1
Bundle raw: 726,560 bytes
Bundle gzip: 224,017 bytes
```

The verifier asserts the stable DOM contract, Tend UI imports/markers, vanilla class/count/reset ownership and production bundle markers.

## Boundaries

- the second filter trigger inside the system overlay remains vanilla;
- product filter specifications are unchanged;
- no dependency installation or package-source change;
- no registry, publication or closed corporate source access.

## Decision

`F-26` is complete with status `[x]`. S-Tracker now has four verified Tend UI controls behind one shared isolated runtime, including two functional toolbar actions.

## Next Group

```text
F-27: migrate the S-Tracker column-settings toolbar action to Tend UI Button/Icon while preserving drawer behavior and custom-view placement.
```
