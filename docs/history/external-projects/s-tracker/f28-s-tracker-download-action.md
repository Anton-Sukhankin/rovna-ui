# F-28: S-Tracker Download Action

Date: 2026-07-22

Status: `[x] complete`

## Goal

Migrate the S-Tracker download toolbar control to Tend UI without inventing download behavior that is absent from the available product contract.

## Implementation

- added `src/integrations/tend-ui/download-button.jsx` in S-Tracker;
- rendered Tend UI `Button` with the packaged `Download` icon;
- preserved the stable vanilla selector `#js-download-btn`;
- replaced the raw HTML button with the isolated `#tend-ui-download-root` mount;
- kept vanilla `initViewSwitcher()` as the owner of card/table visibility;
- moved the complete React mount to and from the custom-view header;
- intentionally added no React `onClick`, request, navigation, toast or synthetic file generation.

## Preserved Contract

| Contract | Verified result |
| --- | --- |
| Card view | Hidden |
| Table view | Visible, `40 x 40` |
| Accessible name | `Скачать` |
| Click | Visible no-op; URL, drawers, filters and toast remain unchanged |
| Custom-group card view | Hidden in `#js-header-actions` |
| Custom-group table view | Visible in `#js-header-actions` |
| Return to main view | Mount returns to `.app-toolbar__actions` |
| State ownership | Vanilla view/navigation code remains authoritative |

## Executable Gates

`S-Tracker/scripts/verify-tend-ui-adapter.mjs` now checks:

- the Tend UI mount and removal of the raw button;
- `Button` and `Download` imports, stable id and test marker;
- absence of `onClick`, `fetch`, location changes, download attributes and toast calls;
- custom-view mount transfer and direct-child toolbar return;
- vanilla ownership of card/table visibility;
- production bundle markers.

`npm.cmd run verify:tend-ui:all` passed:

- Vite transformed modules: `729`;
- single JavaScript chunk: `731,238` bytes raw;
- gzip size: `225,488` bytes;
- package, compensation, adapter, security and bundle gates: passed.

Browser verification passed for card, table, custom-group card/table, no-op click and return to the main toolbar.

## Boundary Decision

F-28 does not compensate an unknown product feature. The archive and S-Tracker specifications define the current download action as a visible no-op, so adding guessed export/file mechanics would change the product contract. A real download flow must be a separate feature task with an explicit data format and product requirement.

No closed corporate source, registry or service was accessed.

## Next Group

```text
F-29: migrate the S-Tracker card/table view switcher to a Tend UI segmented control while preserving vanilla view ownership, dependent-action visibility and custom-view movement.
```
