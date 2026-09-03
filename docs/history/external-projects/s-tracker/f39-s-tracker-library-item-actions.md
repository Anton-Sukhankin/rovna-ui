# F-39 S-Tracker Attribute-Library Row Actions

Date: 2026-07-26

Status: `[x]` completed.

## Result

Dynamic attribute-library rows now render their add/return controls through Tend UI:

- `Button` provides the compact action control;
- packaged `Add` represents adding an attribute to the draft;
- packaged `ArrowBack` represents returning an added attribute to the library;
- legacy generated buttons and inline SVG icons were removed;
- existing public exports were reused, so release artifacts remain unchanged.

## Ownership Boundary

React owns presentation, icon choice and accessible naming. Existing S-Tracker code remains responsible for:

- filtering and empty-state rendering;
- draft membership and add/return transitions;
- library reset;
- change detection and drawer rerendering;
- Apply commit and table rerender.

The portal adapter preserves `.js-library-item-action`, `data-key` and `data-added` for the existing delegated handler. It contains no product `onClick` or `onChange` logic.

## Verification

| Check | Result |
| --- | --- |
| Filtered Tend UI actions | Passed: one add/return action for the exact search |
| Legacy row buttons | Passed: `0` |
| Add -> return transition | Passed |
| Return -> add transition | Passed |
| Draft isolation | Passed: table unchanged before Apply |
| Library reset | Passed and query preserved |
| Apply commit | Passed: selected column rendered |
| Reverse Apply | Passed: column removed and baseline restored |
| Aggregate verification | Passed: `npm.cmd run verify:tend-ui:all` |
| Vite build | Passed: `940` transformed modules |
| Bundle gate | Passed: `949,073` raw / `292,401` gzip bytes |
| Browser application errors | `0` |
| Closed corporate source access | Not used |

## Decision

F-39 is complete. Dynamic portal ownership is limited to the visual action while all column and library mechanics remain in S-Tracker.

## Next Group

```text
F-40: migrate main column-row visibility and return controls to Tend UI Checkbox/Button/icons while preserving drag order, draft visibility, library membership and Apply behavior.
```
