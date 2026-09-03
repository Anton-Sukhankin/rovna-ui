# F-30: S-Tracker Queue Tabs

Date: 2026-07-22

Status: `[x] complete`

## Goal

Migrate the S-Tracker queue/status selector to Tend UI Tabs while preserving queue counts, task filtering, rerendering, view-mode independence and custom-view hiding.

## Implementation

- added `src/integrations/tend-ui/queue-tabs.jsx` in S-Tracker;
- replaced six raw queue buttons with `#tend-ui-queue-tabs-root`;
- added `src/domain/queue-state.js` as the single DOM-compatible active-queue source;
- kept task generation, filters, navigation matching, pagination and rerendering in vanilla modules;
- implemented `s-tracker:queue-request` and `s-tracker:queues-changed` as the React/vanilla boundary;
- updated all filter, columns, sidebar, selection and initialization consumers to use the shared queue-state API;
- preserved custom-group hiding and restoration of the previous selected queue.

## Narrow Package Export

F-30 added and verified:

```text
@10d/tend-ui/primitives/Tabs
```

The export contains ESM, CJS and types. The main package was rebuilt, its public metadata check passed with zero pending changes, and its local tarball was refreshed without registry access.

## Verification

| Gate | Result |
| --- | --- |
| Six accessible Tend UI tabs | Passed |
| Queue counts | Passed: `134`, `121`, `117` |
| Overdue indicator | Passed for the todo queue |
| Queue task rerendering | Passed for all six queues |
| Detail-count contract | Passed, including excluded queues |
| Card/table independence | Passed |
| Custom-group hiding and return | Passed; selected queue preserved |
| Browser application errors | `0` actionable errors |
| Vite modules | `814` |
| Bundle | `809,677` raw / `249,892` gzip bytes |

The refreshed main tarball SHA-256 is:

```text
7f84f1334cc2ee090c07c6eef468dded6f5a681537c7bd805372d36eebd667f4
```

The complete registry-neutral release bundle SHA-256 is:

```text
b1496f19ef12dcfb31986fe18df6813c6ef591de50a8467c3bff6ddfbd1d052d
```

No closed corporate source or publication was used.

## Decision

F-30 is complete. React/Tend UI owns the visual tabs and selected indicator; S-Tracker vanilla modules remain authoritative for queue state transitions, counts and task data.

## Next Group

```text
F-31: migrate S-Tracker pagination to Tend UI Pagination while preserving current page, total-page calculation, task counts and card/table behavior.
```
