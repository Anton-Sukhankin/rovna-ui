# Recipe: Replace Button

## Goal

Replace a product button with Rovna UI `Button` while preserving behavior.

## Context Packet

Use:

- `docs/agent-context/import-rules.md`
- `docs/agent-context/component-passports/button.md`

## Steps

1. Identify the existing button purpose: submit, cancel, navigation, destructive action or secondary action.
2. Preserve existing handlers, form type, disabled logic, loading logic and text.
3. Import `Button` from `@rovna-ui/components/primitives`.
4. Map visual intent to `variant`, `preset`, `size`, `before`, `after`, `fullWidth`, `loading`, `disabled`.
5. Keep routing links as links unless the UI truly behaves like a button.
6. Use the QG-13 runtime/a11y/visual evidence and consumer matrix as baseline, then verify the target screen's default, hover, focus, active, disabled and loading states.

## Status Note

The package, current Storybook stories, focused states and registry-free Button consumer are verified. Target-screen behavior and visual parity remain task-specific.
