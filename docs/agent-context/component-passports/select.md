# Select Passport

## Component

Select

## Package And Import

Preferred import:

```tsx
import { Select } from '@rovna-ui/components/primitives';
```

Direct import:

```tsx
import { Select } from '@rovna-ui/components/primitives/Select';
```

Status:

```text
artifact verified / Storybook verified
```

## Local Source

- Source: `app/packages/tend-ui/src/primitives/Select/index.ts`
- Types: `app/packages/tend-ui/src/primitives/Select/types.ts`
- Story: `app/packages/tend-ui/src/primitives/Select/Select.stories.tsx`
- Docs: `app/packages/tend-ui/src/primitives/Select/Select.mdx`

## Use When

- Replacing a basic dropdown/select field.
- Migrating option selection with local data.
- Using width or full-width layout through Rovna UI props.
- Showing option descriptions where supported.

## Avoid When

- Options must be loaded from an API; check `AsyncSelect`.
- The existing field has custom search, grouping or remote pagination that is not yet mapped.
- The migration needs states beyond the currently verified open/select interaction.
- The consumer project cannot support Ant Design based select mechanics.

## Required States

- default
- hover
- focus
- open/closed dropdown
- selected value
- disabled
- error/invalid, if provided by form logic
- empty options
- clearable state, if enabled

## Known Dependencies / Risks

- Wraps `antd-core/es/select`.
- Uses `BaseInputProps` from local Rovna UI types.
- Current R-09 evidence confirms Select stories render and pass axe; focused open/select, keyboard and overlay paths pass in the supported browser matrix.
- Advanced filtering, custom option rendering and Firefox-only behavior remain task-specific checks.

## Migration Notes

- Start with local static options before remote data.
- Preserve existing `value`, `defaultValue`, `onChange`, `options`, `placeholder`, `disabled` and form wiring.
- Do not replace custom async behavior with `Select` silently; use `AsyncSelect` only after service strategy is known.
- If option descriptions are used, verify visual density and long text behavior later in Storybook.

## Evidence IDs

- `interaction-matrix:tend-ui-main-primitives-select`
- `component-story-coverage:Select`
- `r07-artifact:@rovna-ui/components`
- Generated passport: `generated/tend-ui-main-primitives-select.md`

## Verification Checklist

- Import resolves in the consumer project.
- Select renders inside `RovnaUI` provider.
- Dropdown opens and closes.
- Keyboard navigation and focus behavior work.
- Selected value and `onChange` payload match the original behavior.
- Empty, disabled and error states are checked.
