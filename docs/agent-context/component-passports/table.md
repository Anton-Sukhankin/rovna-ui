# Table Passport

## Component

Table

## Package And Import

Preferred import:

```tsx
import { Table } from '@rovna-ui/components/primitives';
```

Direct import:

```tsx
import { Table } from '@rovna-ui/components/primitives/Table';
```

Status:

```text
artifact verified / focused Storybook behavior verified
```

## Local Source

- Source: `app/packages/tend-ui/src/primitives/Table/index.ts`
- Types: `app/packages/tend-ui/src/primitives/Table/types.ts`
- Story: `app/packages/tend-ui/src/primitives/Table/Table.stories.tsx`
- Docs: `app/packages/tend-ui/src/primitives/Table/Table.mdx`

## Use When

- Replacing simple tabular data display.
- Rendering columns and rows with local data.
- Showing empty state content through `empty`.
- Using Rovna UI size and loading props.

## Avoid When

- The current table has advanced sorting, filtering, grouping, pinning or virtual scrolling that has not been mapped.
- The table is data-service driven and needs query/cache behavior.
- The task expects full feature parity with a complex product grid in one step.
- The consumer project cannot support Ant Design based table mechanics.

## Required States

- default data
- empty data
- loading
- row selection, if used
- custom row class, if used
- horizontal overflow, if columns are wide
- keyboard/focus behavior where interactive cells exist

## Known Dependencies / Risks

- Wraps `antd-core/es/table`.
- Uses local table interfaces and Rovna UI empty state props.
- Advanced table/tree mechanics may involve `@tanstack/*` or separate feature packages.
- Current R-09 evidence confirms Table stories render and pass axe; select-all, responsive/overflow and a 5,000-row performance diagnostic pass.
- Empty/loading/product-grid behavior absent from direct stories remains an explicit migration check.

## Migration Notes

- Start with read-only tables before interactive data grids.
- Preserve row keys, columns, sorting and selection behavior explicitly.
- Do not silently replace complex table features with a simpler static table.
- For advanced cases, split migration into separate table-engine or feature-table task.

## Evidence IDs

- `interaction-matrix:tend-ui-main-primitives-table`
- `interaction-matrix:tend-ui-table-table`
- `component-story-coverage:Table`
- `r07-artifact:@rovna-ui/components`
- Generated passports: `generated/tend-ui-main-primitives-table.md`, `generated/tend-ui-table-table.md`

## Verification Checklist

- Import resolves in the consumer project.
- Table renders inside `RovnaUI` provider.
- Columns and row data match the original product screen.
- Empty and loading states are checked.
- Selection/sorting behavior is preserved if present.
- Wide table and long text behavior are checked.
