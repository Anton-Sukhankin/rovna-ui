import React from 'react';
import groupBy from 'lodash/groupBy';

import { ColumnConfig } from '@rovna-internal/table/Table/types/Columns';
import { SorterConfig } from '@rovna-internal/table/Table/types/SorterConfig';

export const useLabeledSorters = <
  S extends SorterConfig = SorterConfig,
  T extends ColumnConfig = ColumnConfig,
>(
  sorters: S[],
  columns: T[],
): S[] => {
  const grouped = React.useMemo(() => groupBy(columns, 'id'), [columns]);

  return React.useMemo(() => {
    return sorters.map(sorter => {
      const [column] = grouped[sorter.id] || [];
      const label = sorter?.label || column?.label || column?.title;

      return { ...sorter, label };
    });
  }, [grouped, sorters]);
};
