import React from 'react';

import { ColumnConfig, ColumnPosition } from '@rovna-internal/components/components/ColumnsSettings/types';

export type ColumnsSettingProps<T extends ColumnConfig = ColumnConfig> = {
  column: T;
  children?: React.ReactNode;
  onColumnVisibilityChange?: (visible: boolean, column: T) => void;
  onColumnPinningChange?: (position: ColumnPosition, column: T) => void;
};
