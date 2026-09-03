import React from 'react';
import { ColumnPosition } from '@rovna-internal/components/components/ColumnsSettings/types';

export type PinProps = {
  disabled?: boolean;
  pinned?: boolean;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onChange?: (position: ColumnPosition) => void;
};
