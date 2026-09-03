# Recipe: Replace Table

## Goal

Replace a simple product table with Rovna UI `Table` while preserving data display and state behavior.

## Context Packet

Use:

- `docs/agent-context/import-rules.md`
- `docs/agent-context/component-passports/table.md`

## Steps

1. Classify the current table as simple display or complex data grid.
2. Use `Table` first only for simple/read-only or lightly interactive tables.
3. Preserve row keys, columns, data source, loading state, empty state and selection if present.
4. Do not silently drop sorting, filtering, grouping, pinning, virtual scroll or row actions.
5. Import `Table` from `@rovna-ui/components/primitives`.
6. Use the QG-13 render/a11y/select-all/responsive/performance evidence as baseline, then verify empty/loading states and product-specific selection/sorting for the target task.

## Status Note

Table depends on Ant Design mechanics and may overlap with more complex Rovna UI table features. The main import, catalog runtime/a11y, focused Table behavior and 5,000-row diagnostic are verified; advanced states remain task-specific.
