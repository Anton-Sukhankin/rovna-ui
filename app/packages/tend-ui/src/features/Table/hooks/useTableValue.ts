import React from 'react';

import { useValueContext } from '../contexts/ValueContext';

export const useTableValue = (id: string) => {
  const value = useValueContext();

  return React.useMemo(
    () => ({ filter: value?.filters?.[id], sorter: value?.sorters?.[id] }),
    [value?.filters, value?.sorters, id],
  );
};
