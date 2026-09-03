import React from 'react';
import { useTheme } from '@rovna-ui/theme';

import { Root } from './styled';

export const NavigationGroupItem = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'li'>) => {
  const theme = useTheme();

  return (
    <Root {...props} theme={theme} className='rovna-ui-stack-navigation-item-group-root'>
      {children}
    </Root>
  );
};
