import React from 'react';
import groupBy from 'lodash/groupBy';

import { SorterConfig } from '@rovna-internal/table/Table/types/SorterConfig';

/**
 * @returns tuple `[SorterConfig]`
 * @description Groups `SorterConfig` by `id` and returns single `SorterConfig` by the given unique `id`
 */
export const useSorter = (
  sorters: SorterConfig[],
  /**
   * @description `Column` id
   */
  id: string,
) => {
  const sorter = React.useMemo(() => groupBy(sorters, 'id')[id] || [], [sorters, id]);

  return sorter;
};
