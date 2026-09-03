import React from 'react';
import groupBy from 'lodash/groupBy';
import { FilterConfig } from '@rovna-ui/filters';

/**
 * @returns tuple `[Filter]` or `[]`
 * @description Groups `filters` by `id` and returns single `filter` by the given unique `id`
 */
export const useFilter = (filters: FilterConfig[], id: string) => {
  const config = React.useMemo(() => groupBy(filters, 'id')[id] || [], [filters, id]);

  return config;
};
