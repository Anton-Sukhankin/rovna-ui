# G-08 + G-09 Component Coverage And Runtime Audit

Updated: 2026-07-29.

## Result

- `G-08`: `[x]` - component-to-story coverage is generated from the supported package scope, TypeScript public exports and the current Storybook index.
- `G-09`: `[x]` - nine key component groups load in the current static Storybook; selected interactions pass and a clean browser session has zero warning/error console entries.
- Overall result: `passed-with-documented-gaps`.
- Closed corporate sources, external consumers and S-Tracker were not used.

## G-08 Coverage

Command from `app/`:

```powershell
node scripts/audit-component-story-coverage.js
```

Current result:

| Metric | Value |
| --- | ---: |
| Packages classified | 29 |
| Story groups | 112 |
| Stories | 938 |
| Docs | 215 |
| Public visual exports | 969 |
| Direct-story coverage | 92 |
| Cross-package story coverage | 34 |
| Package-collection coverage | 804 |
| Documented direct-story gaps | 39 |
| Unclassified Storybook groups | 0 |

The complete matrices are stored in:

- `docs/component-story-coverage.md`;
- `docs/component-story-coverage.json`.

## G-09 Runtime Matrix

The audit used the static Storybook served at `http://127.0.0.1:3000/`. Every row was opened through its concrete `iframe.html?id=...` URL in the in-app browser.

| Component | Story ID | Runtime | Interaction proof |
| --- | --- | --- | --- |
| Button | `tend-ui-primitives-button--primary` | Passed | Visible button rendered with stable dimensions. |
| Input | `tend-ui-primitives-input--play` | Passed | Filled with `Tend UI G-09`; DOM value matched. |
| Select | `tend-ui-main-primitives-select--large` | Passed | Opened list, selected `Option 1`, list collapsed and selected text updated. |
| Modal | `tend-ui-main-primitives-modal--large` | Passed | Opened one dialog and closed it; closed dialog became non-visible. |
| Table | `tend-ui-table-table--default` | Passed | Rendered 51 rows; Select all changed all 51 checkboxes to checked. |
| DrawerColumnsSettings | `tend-ui-columns-settings-drawercolumnssettings--visible` | Passed | Opened settings dialog and enabled the `Номер` switch. |
| Filters | `tend-ui-filters-filters--default` | Passed with story-state note | Opened the filter dialog. The controlled `Предложение` checkbox dispatches a click but this story does not persist the checked state. |
| Tree | `tend-ui-tree-tree--checkable` | Passed | Filled search with `Астрид`; the value and matching node remained visible. |
| UploadArea | `tend-ui-upload-uploadarea--default` | Passed | Removed the existing `hello_world.txt` list item. |

A clean second browser tab then opened all nine stories again. Result: `9/9` loaded, `0` Storybook render errors, `0` console warnings/errors.

## Runtime Fix

The first complex-component run exposed this shared error:

```text
TypeError: Cannot set properties of undefined (setting 'exports')
```

The local `classnames` compensation was entering the browser chunk through its CommonJS file. It is now a proper dual package:

- browser/import consumers resolve the local ESM entry;
- CommonJS consumers resolve `index.cjs`;
- Storybook has an explicit ESM alias for deterministic browser bundling.

After a fresh static Storybook build, the error disappeared for all audited stories.

## Documented Gaps

These are coverage improvements, not runtime blockers for the audited default scenarios:

- Input has no dedicated disabled and validation stories in the static evidence.
- Select interaction was proved in G-09, but the source story has no explicit interaction declaration.
- Table has no dedicated empty/loading story.
- Filters default is controlled and does not persist the tested checkbox state; a stateful interaction story should be added later.
- 39 public visual exports have documented direct-story gaps; every gap remains listed in the JSON matrix.

## Visual Evidence

Diagnostic screenshots were inspected locally:

- `tmp/g09-uploadarea.png`;
- `tmp/g09-table.png`.

They are disposable QA artifacts and are not part of the release contract.

## Build Binding

The machine-readable audit in `docs/component-runtime-audit.json` is bound to the current `storybook-static/index.json` SHA-256. The DS-only quality gate treats a hash mismatch as a stale runtime result.

## Next Group

Completed by `G-10 + G-11`; consumer and documentation follow-up also passed in `G-12 + G-14`. The active next group is `G-15`.
