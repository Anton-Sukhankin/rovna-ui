import React from 'react';
import { useTheme } from '@rovna-ui/theme';

import { Root } from './styled';

export const NavigationList = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'ul'>) => {
  const theme = useTheme();

  return (
    <Root {...props} theme={theme} className='rovna-ui-stack-navigation-list-root'>
      {children}
    </Root>
  );
};
