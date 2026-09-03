# F-29: S-Tracker View Switcher

Date: 2026-07-22

Status: `[x] complete`

## Goal

Migrate the card/table mode selector to Tend UI while preserving S-Tracker's existing view state, dependent toolbar actions and custom-view navigation behavior.

## Implementation

- added `src/integrations/tend-ui/view-switcher.jsx` in S-Tracker;
- rendered Tend UI `Segmented` with packaged `CardView` and `TableView` icons;
- replaced the raw HTML switcher buttons with `#tend-ui-view-switcher-root`;
- preserved `.js-view-switcher` as the stable navigation/movement selector;
- implemented a request/confirmation boundary using `s-tracker:view-request` and `s-tracker:view-changed`;
- kept `src/ui/basic-controls.js` as the owner of card/table display and columns/download visibility;
- preserved custom-header transfer and main-toolbar return.

## Narrow Package Export

The existing Segmented build files were not reachable through a narrow package subpath. F-29 added and verified:

```text
@10d/tend-ui/primitives/Segmented
```

The export contains ESM, CJS and types. `@10d/tend-ui` was rebuilt, its public metadata check passed with `0` pending changes, and its local tarball was refreshed.

The narrow export avoids the aggregate primitives barrel, which produced a `1.61 MB` S-Tracker bundle during diagnosis.

## Verification

| Gate | Result |
| --- | --- |
| Initial card mode | Passed |
| Table mode and dependent actions | Passed |
| Return to card mode | Passed |
| Custom-group table/card modes | Passed |
| Custom-header transfer | Passed |
| Main-toolbar return | Passed |
| Accessible radio names | Passed |
| Geometry | `105 x 40`; two `46`-pixel options |
| Browser application errors | `0` |
| Vite modules | `741` |
| Bundle | `747,476` raw / `230,190` gzip bytes |

The refreshed main tarball SHA-256 is:

```text
c4bf2d67a4dad9bce3cf7fba6b22af6dabe46c20ae94e43e876f2ccf9abc12fa
```

The complete registry-neutral bundle was recreated with 15 packages across seven levels:

```text
2dbdaf482ccff4494b40a069b2f2b00087cf50651d6d85a440c4c9079f6ebfda
```

No registry access, closed corporate source or publication was used.

## Decision

F-29 is complete. The visual control is React/Tend UI, while application view state remains vanilla-owned and independently testable.

## Next Group

```text
F-30: migrate the S-Tracker queue/status selector to Tend UI Tabs while preserving queue counts, task filtering, rerendering and custom-view hiding.
```
