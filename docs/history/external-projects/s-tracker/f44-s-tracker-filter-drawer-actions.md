# F-44 S-Tracker Filter Drawer Actions

Status: `[x]`.

Checked on: 2026-07-26.

## Scope

F-44 migrates only the stable filter-drawer actions:

- Close;
- Reset All;
- Apply.

Money-range fields, preset actions, native range thumbs and multi-select mechanics remain outside this group.

## Implementation

S-Tracker adds:

```text
src/integrations/tend-ui/filter-drawer-actions.jsx
```

The adapter mounts Tend UI `Button` controls into two stable hosts and uses the packaged Tend UI `Close` icon. It preserves the delegated selectors `.js-filter-close`, `.js-filter-reset` and `.js-filter-apply`.

React owns button presentation and accessible naming only. The existing vanilla filter feature remains the owner of drawer lifecycle, draft values, active-filter counts, reset, Apply, pagination reset, queue counts and task rerendering.

## Executable Gates

Static verification confirms:

- two F-44 mount points;
- three built Tend UI action markers;
- no native Close/Reset/Apply action buttons;
- no filter-state or product-side-effect ownership in the React adapter;
- a remaining filter-drawer baseline of three buttons, four inputs, eight composite multi-selects and 17 inline SVG elements.

The aggregate gate passes:

```text
Vite transformed modules: 944
JavaScript bundle raw: 953,065 bytes
JavaScript bundle gzip: 293,999 bytes
```

The change stays within the F-44 incremental bundle budget. It does not change Tend UI exports, public tarballs or the 15-package release bundle.

## Browser Regression

The local S-Tracker runtime at `http://127.0.0.1:5175/` confirms:

- Close, Reset and Apply render once through Tend UI;
- Close discards no draft and applies nothing;
- reopening restores the draft and its count;
- Apply commits a money-range draft and changes the selected queue from `134` to `27`;
- Reset clears the draft count while leaving the drawer open;
- Reset followed by Apply restores the queue to `134`;
- no direct legacy action remains;
- browser application errors are zero.

## Source Policy

No closed corporate registry, GitLab, Nexus, Figma or internal service was accessed or requested.

## Decision

F-44 is complete. The three stable actions are migrated without transferring product filter ownership to React.

## Next Group

```text
F-45: migrate filter money-range text fields and preset buttons to Tend UI while preserving native range thumbs, clamping, formatting, active preset, reset and Apply behavior.
```
