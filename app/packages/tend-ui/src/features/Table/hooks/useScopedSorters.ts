import React from 'react';

import { SorterConfig } from '@rovna-internal/components/features/Table/types';
import { Scope } from '@rovna-internal/components/features/Table/consts/Scope';
import { createScopedConfig } from '@rovna-internal/components/features/Table/tools/createScopedConfig';

export const useScopedSorters = (sorters: SorterConfig[]) => {
  const scoped = React.useMemo<SorterConfig[]>(
    () => sorters.map(createScopedConfig(Scope.Sorters)),
    [sorters],
  );

  return scoped;
};
