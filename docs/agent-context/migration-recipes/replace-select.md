# Recipe: Replace Select

## Goal

Replace a product select/dropdown with Rovna UI `Select` without losing data or form behavior.

## Context Packet

Use:

- `docs/agent-context/import-rules.md`
- `docs/agent-context/component-passports/select.md`

## Steps

1. Identify whether options are local or remote.
2. Use `Select` only for local/basic option selection.
3. Preserve `value`, `defaultValue`, `onChange`, `options`, `placeholder`, `disabled` and form wiring.
4. Do not collapse async search, remote pagination or service-backed behavior into a basic Select.
5. Import `Select` from `@rovna-ui/components/primitives`.
6. Use the QG-13 render/a11y/open-select/keyboard evidence as baseline, then verify empty options, error state and custom filtering for the target task.

## Status Note

Select depends on Ant Design mechanics through `antd-core`. Its artifact, catalog runtime/a11y and focused Storybook interaction are verified; advanced states remain task-specific.
