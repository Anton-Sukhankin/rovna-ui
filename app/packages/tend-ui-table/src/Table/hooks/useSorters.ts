import React from 'react';

import { ColumnConfig } from '@rovna-internal/table/Table/types/Columns';
import { SorterConfig } from '@rovna-internal/table/Table/types/SorterConfig';
import { mapColumnToSorter } from '@rovna-internal/table/Table/utils/mapColumnToSorter';

/**
 * @deprecated Не использовать
 */
export const useSorters = <T extends ColumnConfig = ColumnConfig>(columns: T[]) => {
  return React.useMemo<SorterConfig[]>(() => columns.map(mapColumnToSorter), [columns]);
};
