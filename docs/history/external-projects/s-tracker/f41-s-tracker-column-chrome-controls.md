# F-41 S-Tracker Column Chrome Controls

Date: 2026-07-26

Status: `[x]`.

## Objective

Replace the remaining generated drag-handle and preset-delete presentation in S-Tracker with packaged Tend UI controls without moving drag ordering, preset storage or fallback mechanics into React.

## Implementation

- extended `src/integrations/tend-ui/column-row-controls.jsx` with packaged `DragIndicator` portals;
- added `src/integrations/tend-ui/preset-delete-actions.jsx` with Tend UI `Button` and packaged `Delete` portals;
- replaced generated inline SVG/button markup with stable mount points;
- retained delegated `.js-preset-delete` handling and all native row drag listeners in `columns-drawer.js`;
- extended executable source, artifact and incremental bundle gates.

## Ownership Boundary

Tend UI/React owns presentation, icons and accessible names only. S-Tracker vanilla code owns:

- row `draggable` state and `dragstart`, `dragover`, `dragend` behavior;
- DOM-order draft collection;
- preset data deletion;
- committed and draft active-preset fallback to `base`;
- base-state restoration and Apply behavior.

No product event handler or column/preset state is implemented in either React adapter.

## Verification

| Check | Result |
| --- | --- |
| Tend UI drag icons | `18/18` rows |
| Legacy direct drag SVGs | `0` |
| Tend UI preset delete action/icon | `1/1` for the test preset |
| Legacy direct preset-delete buttons | `0` |
| Active preset deletion | Passed |
| Fallback label | `Базовое отображение` |
| Base draft restoration | `Система` checked; Save disabled |
| Drag executable contract | DOM order plus all three listeners retained |
| Aggregate gate | Passed |
| Vite modules | `943` |
| Bundle | `952,144` raw / `293,900` gzip bytes |
| Browser application errors | `0` |
| Closed corporate sources | Not used |

The browser driver has no pointer drag API. Pointer movement is therefore protected by unchanged vanilla ownership and executable source assertions; all supported preset and visual interactions pass in the browser.

## Release Impact

No Tend UI package export changed. S-Tracker consumes existing `Button`, `DragIndicator` and `Delete` exports, so the 15-package registry-neutral release bundle remains current.

## Decision

F-41 is complete. The next group is F-42: run a column-settings migration completion audit, remove any remaining safe legacy controls and verify the full drawer lifecycle as one regression suite.
