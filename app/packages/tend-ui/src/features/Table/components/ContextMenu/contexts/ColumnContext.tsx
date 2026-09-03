import { contextFactory } from '@rovna-ui/factories';
import React from 'react';

import { ColumnConfig } from '@rovna-internal/components/features/Table/types';

const [_ColumnsContext, _useColumnContext] = contextFactory<ColumnConfig>();

const ColumnsContext = ({
  value,
  children,
}: React.PropsWithChildren<{ value: ColumnConfig }>) => {
  return (
    <_ColumnsContext value={React.useMemo(() => value, [value])}>
      {children}
    </_ColumnsContext>
  );
};

const useColumnContext = <T extends ColumnConfig = ColumnConfig>() => {
  return _useColumnContext() as T;
};

export { ColumnsContext, useColumnContext };
