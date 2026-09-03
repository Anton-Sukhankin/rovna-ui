import React from 'react';

import { FilterConfig } from '@rovna-internal/components/components/Filters';
import { createScopedConfig } from '@rovna-internal/components/features/Table/tools/createScopedConfig';
import { Scope } from '@rovna-internal/components/features/Table/consts/Scope';

export const useScopedFilters = (filters: FilterConfig[]) => {
  const scoped = React.useMemo<FilterConfig[]>(
    () => filters.map(createScopedConfig(Scope.Filters)),
    [filters],
  );

  return scoped;
};
