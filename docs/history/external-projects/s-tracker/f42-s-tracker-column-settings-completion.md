# F-42 S-Tracker Column-Settings Completion

Date: 2026-07-26

Status: `[x]`.

## Objective

Complete the Tend UI audit of S-Tracker column settings, remove any safe legacy control residue and verify the drawer as one product workflow.

## Audit Decision

No safe legacy control remained to migrate.

- the static drawer and preset dialog contain only Tend UI mount points;
- generated templates contain no native control tags or inline SVG;
- listbox/options, layout containers and event hooks remain intentionally vanilla-owned;
- replacing those remaining structures would change semantics or product-state ownership rather than improve Tend UI coverage.

## Executable Completion Gate

Added:

```text
S-Tracker/scripts/verify-column-settings-completion.mjs
```

The gate is part of `npm run verify:tend-ui:all` and verifies:

| Contract | Result |
| --- | --- |
| Static Tend UI mounts | `11` |
| Column-settings adapters | `7` |
| Built control markers | `19` |
| Native controls/inline SVG in drawer templates | `0` |
| Draft ownership | Retained |
| Drag ownership | Retained |
| Library ownership | Retained |
| Preset fallback ownership | Retained |
| Apply ownership | Retained |

## Full Browser Regression

| Scenario | Result |
| --- | --- |
| Baseline row/Checkbox/drag counts | `18 / 18 / 18` |
| Close without Apply | Draft discarded |
| Hide `Система` plus Apply | Column removed |
| Default before Apply | Table unchanged |
| Default plus Apply | Column restored |
| Library add | Row `18 -> 19`, table unchanged before Apply |
| Library add plus Apply | Column rendered |
| Main-row return plus Apply | Column removed, row `19 -> 18` |
| Library reset | Draft membership and filtered add action restored |
| Preset create/replay | Passed |
| Active preset delete | Base label and base draft restored |
| Visual two-pane drawer | No overlap |
| Browser application errors | `0` |

Pointer drag remains covered by unchanged vanilla code and executable source assertions because the browser driver has no pointer drag API.

## Build And Boundary

- Vite transforms `943` modules;
- JavaScript remains one direct-file-compatible bundle;
- bundle is `952,144` raw / `293,900` gzip bytes;
- local compensation security gate passes;
- no Tend UI package export changed;
- the 15-package registry-neutral release bundle remains current;
- no closed corporate source was accessed.

## Decision

F-42 is complete. Column settings are now protected by both granular adapter checks and a dedicated completion gate.

Next group:

```text
F-43: audit remaining legacy controls outside column settings and define the next bounded Tend UI migration wave, starting with the filter drawer.
```
