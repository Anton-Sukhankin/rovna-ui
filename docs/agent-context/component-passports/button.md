# Button Passport

## Component

Button

## Package And Import

Preferred import:

```tsx
import { Button } from '@rovna-ui/components/primitives';
```

Direct import:

```tsx
import { Button } from '@rovna-ui/components/primitives/Button';
```

Status:

```text
artifact verified / Storybook verified / release-consumer verified
```

## Local Source

- Source: `app/packages/tend-ui/src/primitives/Button/index.ts`
- Types: `app/packages/tend-ui/src/primitives/Button/types.ts`, re-exporting from `app/packages/tend-ui-primitives/src/Button/types.ts`
- Story: `app/packages/tend-ui-primitives/src/Button/Button.stories.tsx`
- Docs: `app/packages/tend-ui-primitives/src/Button/Button.mdx`

## Use When

- Replacing product action buttons.
- Rendering primary, secondary, ghost or link-style actions.
- Adding icon/content before or after button text.
- Using loading, disabled, full-width or size variants.

## Avoid When

- The existing element is a navigation link with routing semantics and no button behavior.
- The action requires a complex menu or multi-action dropdown; check `ActionsButton` or `Dropdown` instead.
- The task requires visual parity for states outside the current Storybook/runtime evidence.

## Required States

- default
- hover
- active/pressed
- focus
- disabled
- loading
- skeleton, if used
- fullWidth, if layout requires it

## Known Dependencies / Risks

- Uses Rovna UI styling and theme model.
- Depends on `@rovna-ui/styling` through the underlying primitives package.
- Current R-09 evidence confirms Button stories render and pass axe; focused keyboard/state checks and the visual baseline pass.
- Button rendered through all three registry-free consumers and React 17/18/19 compatibility builds.
- Deprecated `danger` prop exists; prefer `preset="danger"` when migration needs a danger action.

## Migration Notes

- Start migration with simple buttons before complex forms or overlays.
- Preserve the original button semantic type: submit/reset/button.
- Prefer `variant`, `size`, `preset`, `before`, `after`, `loading`, `disabled`.
- Do not use `UNSTABLE_styling` in production migration unless explicitly required.

## Evidence IDs

- `interaction-matrix:tend-ui-primitives-button`
- `component-story-coverage:Button`
- `r07-artifact:@rovna-ui/primitives`
- Generated passport: `generated/tend-ui-primitives-button.md`

## Verification Checklist

- Import resolves in the consumer project.
- Button renders inside `RovnaUI` provider.
- Text, icon placement and spacing match the target UI.
- Hover, focus, active, disabled and loading states are checked against the current Storybook/Q baseline and the target screen.
- Submit behavior is preserved for form buttons.
