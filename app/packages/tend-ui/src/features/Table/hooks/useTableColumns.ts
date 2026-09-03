import React from 'react';

import { useColumnsContext } from '@rovna-internal/components/features/Table/contexts/ColumnsContext';
import { ColumnConfig } from '@rovna-internal/components/features/Table/types/Columns';

export const useTableColumns = <TColumn extends ColumnConfig = ColumnConfig>() => {
  const { columns, pin, display } = useColumnsContext<TColumn>();

  const api = React.useMemo(
    () => ({
      columns,
      pin,
      display,
    }),
    [columns, display, pin],
  );

  return api;
};
