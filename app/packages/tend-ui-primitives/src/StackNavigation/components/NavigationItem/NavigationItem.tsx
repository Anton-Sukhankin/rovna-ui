import React from 'react';
import { useTheme } from '@rovna-ui/theme';

import { Root } from './styled';
import { NavigationItemProps } from './types';

export const NavigationItem = ({
  children,
  borderRadius,
  ...props
}: NavigationItemProps) => {
  const theme = useTheme();

  return (
    <Root
      {...props}
      theme={theme}
      className='rovna-ui-stack-navigation-item-root'
      $borderRadius={borderRadius}
    >
      {children}
    </Root>
  );
};
