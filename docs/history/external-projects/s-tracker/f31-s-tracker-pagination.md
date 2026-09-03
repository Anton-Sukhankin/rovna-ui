# F-31: S-Tracker Pagination

Date: 2026-07-23

Status: `[x] complete`

## Goal

Migrate S-Tracker pagination to Tend UI `Pagination` while preserving page state, total-page calculation, queue/search resets, card/table behavior and cross-page task selection.

## Implementation

- added `src/integrations/tend-ui/pagination.jsx` in S-Tracker;
- replaced generated HTML page buttons with `#tend-ui-pagination-root`;
- added the `s-tracker:page-request` and `s-tracker:pagination-changed` boundary;
- kept `window.paginationState`, task slicing and `renderTab(tabName, true)` in vanilla modules;
- preserved the 20-task page size and visibility threshold;
- preserved queue, navigation, search, filter and column reset behavior;
- added conditional spacing so the bulk-action bar cannot cover pagination.

## Narrow Package Export

F-31 added and verified:

```text
@10d/tend-ui/primitives/Pagination
```

The export contains ESM, CJS and types. The main package and registry-neutral release bundle were rebuilt locally without publication.

## Verification

| Gate | Result |
| --- | --- |
| Initial page and 20-row slice | Passed |
| Direct page selection | Passed |
| Previous/next controls and disabled edges | Passed |
| Last-page partial result | Passed: one row on page 7 |
| Queue change resets to page 1 | Passed |
| Search result at 20 or fewer tasks hides pagination | Passed |
| Search clear restores pagination on page 1 | Passed |
| Card/table mode preserves current page | Passed |
| Cross-page task selection | Passed |
| Bulk-action overlap | Fixed and passed |
| Browser application errors | `0` |
| Vite modules | `906` |
| Bundle | `913,695` raw / `282,112` gzip bytes |

## Bundle Budget

The complete Tend UI Pagination dependency chain adds Ant Pagination, locale, Tooltip and icon runtime code. F-31 therefore replaced the old absolute F-23 limit with a reviewed incremental budget:

```text
F-30 baseline: 809,677 raw / 249,892 gzip bytes
F-31 allowance: +120 KiB raw / +40 KiB gzip
F-31 result:    913,695 raw / 282,112 gzip bytes
```

The gate remains executable and fails if later work exceeds this allowance.

The refreshed main tarball SHA-256 is:

```text
41f66f47892e4d79830eac6eac53615b4af9885b1785b56fde5c13744775355a
```

The complete release bundle SHA-256 is:

```text
975408ffcf907c7cfa850da792feea5f229d33986b47962813030d124e8c2774
```

## Decision

F-31 is complete. React/Tend UI owns only pagination presentation and request emission; S-Tracker remains authoritative for page validation, state, task slicing and rerendering.

## Next Group

```text
F-32: migrate S-Tracker task-selection controls to Tend UI Checkbox while preserving row selection, select-all, cross-page state and bulk actions.
```
