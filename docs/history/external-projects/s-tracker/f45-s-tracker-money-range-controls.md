# F-45 S-Tracker Money Range Controls

Status: `[x]`.

Checked on: 2026-07-26.

## Scope

F-45 migrates:

- the lower money-range text field;
- the upper money-range text field;
- three money-range preset actions.

The two native range thumbs remain intentionally local.

## Implementation

S-Tracker adds:

```text
src/integrations/tend-ui/money-range-controls.jsx
```

The adapter renders two Tend UI `Input` controls and portals three Tend UI `Button` presets into stable hosts. It preserves `.js-money-range-input`, `.js-money-range-preset`, `data-type`, `data-from` and `data-to`.

React owns presentation and accessible naming only. The existing vanilla filter feature remains the owner of parsing, Russian currency formatting, `10,000` rounding, clamping, crossed-boundary resolution, active preset, track fill, range thumbs, counts, Reset and Apply.

## Native Thumb Decision

The local Tend UI source includes `RangeInput`, but its contract is a pair of numeric input fields. It is not a dual-thumb slider.

Replacing the native thumbs with `RangeInput` would duplicate the fields migrated in F-45 and remove direct drag behavior. The two `input[type="range"]` elements are therefore an intentional product-mechanics boundary, not an unresolved dependency.

## Executable Gates

Static verification confirms:

- two money-range mount points;
- two built Tend UI Input markers;
- three built Tend UI preset Button markers;
- no native text fields or preset buttons in `index.html`;
- exactly two native range thumbs;
- no event handler, filter state or product rerender in the React adapter;
- a remaining filter-drawer baseline of zero buttons, two inputs, eight composite multi-selects and 17 inline SVG elements.

The aggregate gate passes:

```text
Vite transformed modules: 945
JavaScript bundle raw: 954,359 bytes
JavaScript bundle gzip: 294,319 bytes
```

The change stays within the F-45 incremental bundle budget. It does not change Tend UI exports, public tarballs or the 15-package release bundle.

## Browser Regression

The local S-Tracker runtime at `http://127.0.0.1:5175/` confirms:

- both Tend UI fields and all three Tend UI presets render once;
- typed values round to the `10,000` step;
- crossed boundaries align without creating an invalid range;
- preset selection formats both values, moves both thumbs and sets the active state;
- native thumb movement updates Tend UI fields and clears the active preset;
- Close preserves a draft without changing the queue;
- Apply with `до 500 тыс.` changes the selected queue `134 -> 27`;
- Reset clears the fields, thumbs, preset and draft count;
- Reset followed by Apply restores `27 -> 134`;
- visual alignment and text fit pass;
- browser application errors are zero.

## Source Policy

No closed corporate registry, GitLab, Nexus, Figma or internal service was accessed or requested.

## Decision

F-45 is complete. Tend UI owns the money-range fields and presets, while vanilla code retains all range state and mechanics.

## Next Group

```text
F-46: audit filter multi-select triggers, option controls and inline icons, then define the first bounded Tend UI migration wave.
```
