# Input Passport

## Component

Input

## Package And Import

Preferred import:

```tsx
import { Input } from '@rovna-ui/components/primitives';
```

Direct import:

```tsx
import { Input } from '@rovna-ui/components/primitives/Input';
```

Status:

```text
artifact verified / Storybook verified
```

## Local Source

- Source: `app/packages/tend-ui/src/primitives/Input/index.ts`
- Types: `app/packages/tend-ui/src/primitives/Input/types.ts`, re-exporting from `app/packages/tend-ui-primitives/src/Input/types.ts`
- Story: `app/packages/tend-ui-primitives/src/Input/Input.stories.tsx`
- Docs: `app/packages/tend-ui-primitives/src/Input/Input.mdx`

## Use When

- Replacing a basic text input.
- Migrating form fields that need Rovna UI size, spacing and theme styles.
- Using clearable input behavior through `allowClear`.
- Adding clear icon tooltip behavior through `clearIconTooltip`.

## Avoid When

- The field is numeric; check `InputNumber`.
- The field is multi-line; check `TextArea`.
- The field is a search box with search-specific behavior; check `Search`.
- The field requires service-backed autocomplete; check `Select` or `AsyncSelect`.

## Required States

- default
- hover
- focus
- disabled
- error/invalid, if provided by surrounding form logic
- clearable state, if `allowClear` is used
- size variants: large, medium, small

## Known Dependencies / Risks

- Wraps `antd-core/es/input/Input`.
- Uses Rovna UI styling dimensions, margins and padding.
- Clear icon tooltip depends on local Tooltip props.
- Current R-09 evidence confirms Input stories render and pass axe; focused text-entry and keyboard paths pass.
- Disabled/validation variants not represented by a direct story remain explicit target-task checks.

## Migration Notes

- Preserve controlled/uncontrolled behavior from the original input.
- Keep existing `value`, `defaultValue`, `onChange`, `placeholder`, `disabled`, `name` and form wiring.
- Do not introduce service behavior during basic input migration.
- If the old field has validation text, keep that in the form layer unless Rovna UI Form is explicitly introduced.

## Evidence IDs

- `interaction-matrix:tend-ui-primitives-input`
- `component-story-coverage:Input`
- `r07-artifact:@rovna-ui/primitives`
- Generated passport: `generated/tend-ui-primitives-input.md`

## Verification Checklist

- Import resolves in the consumer project.
- Input renders inside `RovnaUI` provider.
- Typing, focus, disabled and clear behavior work.
- Existing form submission still receives the same value.
- Error state remains visible through the chosen form pattern.
