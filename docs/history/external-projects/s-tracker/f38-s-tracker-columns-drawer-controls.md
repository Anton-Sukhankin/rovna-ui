# F-38 S-Tracker Column-Settings Drawer Controls

Date: 2026-07-26

Status: `[x]` completed.

## Result

The column-settings header close action and attribute-library search now render through Tend UI:

- the close action uses Tend UI `Button` with the packaged `Close` icon;
- the library search uses Tend UI `Input` with the packaged `Search` icon;
- the legacy close button and search input were removed from the static markup;
- no package export, tarball or release-bundle change was required.

## Ownership Boundary

React owns only presentation and stable DOM hooks. Existing S-Tracker code remains responsible for:

- closing the drawer and collapsing the attribute library;
- discarding an uncommitted column draft on the next open;
- filtering the attribute library from the input value;
- preserving the search query while the library or drawer is hidden;
- applying columns and rerendering the table.

The preserved hooks are `.js-columns-close` and `.js-library-search`. The adapter contains no product `onClick` or `onChange` logic.

## Verification

| Check | Result |
| --- | --- |
| Tend UI controls | Passed: one `Button`, one `Input` |
| Legacy close/search controls | Passed: `0` |
| Search filtering | Passed for `Внутренний номер` |
| Empty search state | Passed: `Атрибуты не найдены` |
| Query persistence | Passed across library collapse and drawer close/reopen |
| Draft isolation | Passed: `internal_id` was not committed after close |
| Drawer close/library collapse | Passed |
| Geometry | Passed: `40 px` close and `36 px` input shell |
| Aggregate verification | Passed: `npm.cmd run verify:tend-ui:all` |
| Vite build | Passed: `938` transformed modules |
| Bundle gate | Passed: `947,513` raw / `292,047` gzip bytes |
| Closed corporate source access | Not used |

## Decision

F-38 is complete. The migration preserves the established vanilla-owned product behavior and extends the executable adapter and bundle gates.

## Next Group

```text
F-39: migrate attribute-library row actions to Tend UI Button/icons while preserving add/return semantics, current search filtering, draft isolation and library reset behavior.
```
