import React from 'react';

import { ColumnConfig as ColumnType } from '@rovna-internal/columns-settings/core/interfaces';

export type ListProps<T extends ColumnType = ColumnType> = {
  columns: T[];
  children?: React.ReactNode;
  gap?: number;
};
