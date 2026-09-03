import React from 'react';

import { NavigationProps } from '@rovna-internal/header/core';

export type DrawerBurgerMenuProps = {
  title?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (payload: boolean) => void;
  /**
   * Свойства навигации
   */
  navigation?: NavigationProps;
  onClose?: () => void;
};
