# F-25: S-Tracker Print Button

## Goal

Migrate the first functional S-Tracker toolbar action to Tend UI while preserving its product contract and the isolated React boundary.

## Implementation

S-Tracker now renders the print control through:

```text
src/integrations/tend-ui/print-button.jsx
```

The adapter uses `@10d/tend-ui/primitives/Button` and `@10d/tend-ui-icons/Print/Print.js`. It preserves `#js-print-btn`, while `src/ui/basic-controls.js` remains the owner of the click action and global toast.

`tasks-view.js` moves `#tend-ui-print-root` between the toolbar and custom-view header. React-owned children are never detached from their mount.

## Preserved Contract

| Contract | Result |
| --- | --- |
| Icon-only geometry | Passed: `40 x 40` before and after migration |
| Accessible name / title | Passed: `Печать` |
| Toast | Passed: `Подготовка к печати...` |
| Card view | Passed |
| Table view | Passed |
| Custom-group header transfer | Passed: mount parent becomes `#js-header-actions` |
| Product-state ownership | Passed: adapter has no toast/filter/navigation mutations |

## Consumer Gates

`npm.cmd run verify:tend-ui:all` passed:

```text
Vite modules: 723
JavaScript chunks: 1
Bundle raw: 724,984 bytes
Bundle gzip: 223,608 bytes
```

The adapter verifier now asserts the mount, Button/Icon imports, stable selector, vanilla event owner, safe custom-view movement and production bundle markers.

## Boundaries

- no dependency installation;
- no package or Storybook source changes;
- no registry or publication action;
- no closed corporate source access;
- existing toolbar product specifications remain unchanged because behavior did not change.

## Decision

`F-25` is complete with status `[x]`. S-Tracker now has three verified Tend UI controls behind one shared runtime, including one functional toolbar action whose existing vanilla behavior is preserved.

## Next Group

```text
F-26: migrate the S-Tracker Filters toolbar trigger to Tend UI Button while preserving drawer opening, active-count/reset indication and vanilla filter ownership.
```
