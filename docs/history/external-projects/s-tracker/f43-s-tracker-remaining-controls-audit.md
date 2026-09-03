# F-43 S-Tracker Remaining Controls Audit

Date: 2026-07-26

Status: `[x]`.

## Objective

Inventory remaining legacy controls outside completed column settings and define the next bounded Tend UI migration wave without combining unrelated interaction mechanics.

## Executable Inventory

Added to S-Tracker:

```text
scripts/audit-remaining-tend-ui-controls.mjs
npm run audit:tend-ui:remaining
```

The audit is part of `npm run verify:tend-ui:all`.

## Results

| Area | Native/composite controls | Inline SVG | Priority |
| --- | --- | ---: | --- |
| Filter drawer | 6 buttons, 4 inputs, 8 multi-select widgets | 18 | First |
| System overlay | 3 buttons, 1 input | 5 | After filters |
| Dynamic task/table actions | 2 button templates | Component-owned | Later wave |
| Bookmark action | 1 button template | Component-owned | After lifecycle check |
| Column settings | 0 native controls | 0 | Complete |

## Risk Classification

- Filter Close/Reset/Apply: low risk and stable vanilla hooks.
- Money range: medium risk because text inputs, range thumbs, presets, clamping and formatting are coupled.
- Multi-select: high risk because options are data-dependent and tags, clear, selection, cross-filter option narrowing and open state share one lifecycle.
- System overlay: medium risk because its controls move inside a separate detailed-view lifecycle.
- Dynamic task/bookmark actions: require focused row and persistence verification.

## F-44 Acceptance Contract

F-44 is limited to filter-drawer Close, Reset All and Apply actions.

Browser baseline:

- each current action exists exactly once;
- changing a money preset sets the drawer count to `1` without rerendering the task list;
- Close hides the drawer and preserves its draft;
- reopen restores `Выполнено настроек: 1`;
- Apply closes the drawer and changes the selected queue count `134 -> 27`;
- Reset sets the drawer count to `0`, keeps the drawer open and leaves the filtered list unchanged;
- Reset plus Apply restores the selected queue count `27 -> 134`;
- browser application errors are `0`.

Tend UI will own presentation only. Vanilla code retains drawer visibility, values, counts, reset, Apply, task rendering and pagination/queue/sidebar side effects.

## Provisional Sequence

1. F-44: filter Close/Reset/Apply.
2. F-45: money-range fields and preset actions, with an explicit range-thumb decision.
3. F-46: filter multi-select controls.
4. F-47: system-overlay local controls.
5. F-48: dynamic task/table actions.
6. F-49: bookmark delete after lifecycle verification.

The sequence after F-44 remains provisional and will be re-audited after each wave.

## Verification

- aggregate S-Tracker gate passes;
- Vite transforms `943` modules;
- bundle remains `952,144` raw / `293,900` gzip bytes;
- no release package export changed;
- no closed corporate source was accessed.

## Decision

F-43 is complete.

Next group:

```text
F-44: migrate filter-drawer Close, Reset All and Apply actions to Tend UI while preserving drawer lifecycle, draft values, counts, reset and apply behavior.
```
