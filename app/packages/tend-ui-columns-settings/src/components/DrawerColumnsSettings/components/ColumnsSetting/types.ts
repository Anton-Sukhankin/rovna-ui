import React from 'react';

import { Column, ColumnConfig, ColumnPosition } from '../../../../core/interfaces';

export type ColumnsSettingProps<T extends ColumnConfig = ColumnConfig> = {
  column: Column;
  children?: React.ReactNode;
  onColumnVisibilityChange?: (visible: boolean, column: T) => void;
  onColumnPinningChange?: (position: ColumnPosition, column: T) => void;
};
