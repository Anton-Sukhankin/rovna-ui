import { ColumnConfig } from '@rovna-internal/components/features/Table/types/Columns';

/**
 * @deprecated Устарело
 */
export const mapColumnToSorter = <T extends ColumnConfig = ColumnConfig>(column: T) => {
  return {
    key: `rovna-ui-table-sorter-${column.key}`,
    id: column.id,
    name: column.id,
    label: column.label || column.title,
  };
};
