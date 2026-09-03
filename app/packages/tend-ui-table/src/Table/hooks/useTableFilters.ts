import React from 'react';

import { useFiltersContext } from '@rovna-internal/table/Table/contexts/FiltersContext';

export const useTableFilters = () => {
  const {
    filters,
    hotFilters,
    clear,
    reset,
    onFilterValuesChange,
    onFilterValuesFinish,
  } = useFiltersContext();

  const api = React.useMemo(
    () => ({
      filters,
      hotFilters,
      clear,
      reset,
      onFilterValuesChange,
      onFilterValuesFinish,
    }),
    [clear, filters, hotFilters, onFilterValuesChange, onFilterValuesFinish, reset],
  );

  return api;
};
