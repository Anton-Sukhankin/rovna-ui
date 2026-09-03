import React from 'react';

import { useDefaultValueContext } from '../contexts/DefaultValueContext';

export const useTableDefaultValue = (id: string) => {
  const value = useDefaultValueContext();

  return React.useMemo(
    () => ({ filter: value?.filters?.[id], sorter: value?.sorters?.[id] }),
    [value?.filters, value?.sorters, id],
  );
};
