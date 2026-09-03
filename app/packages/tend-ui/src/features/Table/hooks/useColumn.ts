import React from 'react';
import groupBy from 'lodash/groupBy';

import { ColumnConfig } from '@rovna-internal/components/features/Table/types/Columns';

/**
 * Groups `column` by `id` and returns single `column` by the given unique `id`
 * @returns tuple `[Column]`
 * @param columns - колонки
 */
export const useColumn = <T extends ColumnConfig = ColumnConfig>(
  columns: T[],
  /**
   * `Column` id
   */
  id: string,
) => {
  const column = React.useMemo(() => groupBy(columns, 'id')[id] || [], [columns, id]);

  return column;
};
