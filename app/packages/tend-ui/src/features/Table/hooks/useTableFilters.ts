import React from 'react';

import { useFiltersContext } from '@rovna-internal/components/features/Table/contexts/FiltersContext';

export const useTableFilters = () => {
  const { filters, clear, reset } = useFiltersContext();

  const api = React.useMemo(
    () => ({
      filters,
      clear,
      reset,
    }),
    [clear, filters, reset],
  );

  return api;
};
