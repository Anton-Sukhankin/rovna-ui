import React from 'react';

export interface AntdTableColumn {
  id: string;
  title?: React.ReactNode;
  visible?: boolean;
  pinnable?: boolean;
  draggable?: boolean;
  fixed?: 'left' | 'right';
}
