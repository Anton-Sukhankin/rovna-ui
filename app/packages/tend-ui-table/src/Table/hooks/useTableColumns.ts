import React from 'react';

import { useColumnsContext } from '@rovna-internal/table/Table/contexts/ColumnsContext';
import { ColumnConfig } from '@rovna-internal/table/Table/types/Columns';

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
