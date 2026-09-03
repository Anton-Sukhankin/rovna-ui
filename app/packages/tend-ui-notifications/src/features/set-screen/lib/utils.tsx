import { ButtonProps } from '@rovna-ui/components/primitives';
import { FilterAlt, Settings } from '@rovna-ui/components/icons';
import React from 'react';

import type { Screen } from '@notifications/app/store/types';

export const getScreenProps = (
  view: Screen | null,
): Pick<ButtonProps, 'before' | 'children' | 'variant'> | undefined => {
  switch (view) {
    case 'filters':
      return {
        before: <FilterAlt />,
        children: 'Фильтры',
        variant: 'secondary',
      };
    case 'services':
      return {
        before: <Settings />,
        children: 'Настройки',
        variant: 'ghost',
      };
    default:
      break;
  }
};
