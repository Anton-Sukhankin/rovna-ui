import React from 'react';

import { useSortersContext } from '@rovna-internal/components/features/Table/contexts/SortersContext';

export const useTableSorters = () => {
  const { sorters } = useSortersContext();

  const model = React.useMemo(
    () => ({
      sorters,
    }),
    [sorters],
  );

  return model;
};
