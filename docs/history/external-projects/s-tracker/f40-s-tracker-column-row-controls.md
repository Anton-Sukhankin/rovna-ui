# F-40 S-Tracker Main Column-Row Controls

Date: 2026-07-26

Status: `[x]` completed.

## Result

Main column-settings rows now use Tend UI controls:

- `Checkbox` controls draft column visibility;
- `Button` with packaged `ArrowBack` returns library attributes from the main list;
- legacy generated checkbox markup and inline return SVG were removed;
- existing exports were reused, so release artifacts remain unchanged.

## Ownership Boundary

React owns presentation, accessible labels and dynamic portal refresh. Existing S-Tracker code remains responsible for:

- reading checkbox state in current DOM order;
- draft visibility and change detection;
- dragstart, dragover and dragend ordering mechanics;
- library membership and return behavior;
- Apply commit and table rerender.

Dynamic checkbox and return events are delegated at the vanilla list boundary. The adapter contains no product `onClick`, `onChange` or drag logic.

## Verification

| Check | Result |
| --- | --- |
| Tend UI visibility controls | Passed: `18/18` rows |
| Legacy generated checkbox markup | Passed: `0` |
| Accessible checkbox names | Passed |
| Hide column -> Apply | Passed: `Система` removed |
| Restore column -> Apply | Passed: `Система` restored |
| Main-row return action | Passed |
| Draft isolation | Passed: table unchanged before Apply |
| Drag contract | Passed by executable source gate: DOM-order collection and dragstart/dragover/dragend retained |
| Visual layout | Passed: controls and labels remain aligned |
| Aggregate verification | Passed: `npm.cmd run verify:tend-ui:all` |
| Vite build | Passed: `941` transformed modules |
| Bundle gate | Passed: `950,466` raw / `293,468` gzip bytes |
| Closed corporate source access | Not used |

The in-app browser driver does not expose pointer drag. Visibility, return and Apply were browser-verified; drag ordering remains protected by the unchanged vanilla implementation and executable source assertions.

## Decision

F-40 is complete. Tend UI owns row controls while S-Tracker retains state, ordering and commit mechanics.

## Next Group

```text
F-41: migrate remaining column-row drag-handle and preset-delete icons/actions to Tend UI while preserving native drag ordering, preset deletion and active-preset fallback.
```
