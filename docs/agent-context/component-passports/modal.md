# Modal Passport

## Component

Modal

## Package And Import

Preferred import:

```tsx
import { Modal } from '@rovna-ui/components/primitives';
```

Direct import:

```tsx
import { Modal } from '@rovna-ui/components/primitives/Modal';
```

Status:

```text
artifact verified / Storybook verified
```

## Local Source

- Source: `app/packages/tend-ui/src/primitives/Modal/index.ts`
- Types: `app/packages/tend-ui/src/primitives/Modal/types.ts`
- Story: `app/packages/tend-ui/src/primitives/Modal/Modal.stories.tsx`
- Docs: `app/packages/tend-ui/src/primitives/Modal/Modal.mdx`

## Use When

- Replacing modal dialogs.
- Showing confirmation, form or focused task content in an overlay.
- Using Rovna UI button props for ok/cancel actions.
- Choosing modal size: large, medium or small.

## Avoid When

- The UI is a full side panel; check `Drawer`.
- The flow needs a lightweight confirmation pattern; check `Dialog` first.
- Focus trapping, keyboard close and scroll behavior cannot be verified for the target task.

## Required States

- closed
- open
- focus inside modal
- close by button/icon
- cancel action
- confirm action
- scroll: window/body, if content is long
- disabled/loading action buttons, if used through button props

## Known Dependencies / Risks

- Wraps `antd-core/es/modal/Modal`.
- Uses Rovna UI Button and Tooltip props.
- Current R-09 evidence confirms Modal stories render and pass axe; focused open/close, keyboard, portal and focus-return checks pass in Chromium/WebKit evidence.
- Long-content/product-specific flows and Firefox-provider behavior remain task-specific checks.

## Migration Notes

- Preserve open/close state ownership from the product code.
- Preserve cancel/confirm semantics and analytics hooks where present.
- Do not move business logic into the modal component during visual migration.
- Check long content and mobile/viewport behavior before considering migration complete.

## Evidence IDs

- `interaction-matrix:tend-ui-main-primitives-modal`
- `component-story-coverage:Modal`
- `r07-artifact:@rovna-ui/components`
- Generated passport: `generated/tend-ui-main-primitives-modal.md`

## Verification Checklist

- Import resolves in the consumer project.
- Modal renders inside `RovnaUI` provider.
- Open/close behavior works.
- Focus, Escape key and overlay interactions are checked.
- Confirm/cancel actions preserve existing behavior.
- Long content scroll behavior is checked.
