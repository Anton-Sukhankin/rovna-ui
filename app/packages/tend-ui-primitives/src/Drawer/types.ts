import React from 'react';

import { RootProps } from './components/Root/types';

export type DrawerPushConfig = {
  distance?: number | string;
};
export type DrawerSize = 'large' | 'medium' | 'small';
export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DrawerProps = RootProps & {
  title?: string;
  description?: string;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  placement?: DrawerPlacement;
  footer?: React.ReactNode;
};
