import React from 'react';
import { useTheme } from '@rovna-ui/theme';

import { Root } from './styled';

export const Button = ({
  children,
  selected,
  ...props
}: React.ComponentPropsWithoutRef<'button'> & { selected?: boolean }) => {
  const theme = useTheme();

  return (
    <Root {...props} theme={theme} $selected={selected}>
      {children}
    </Root>
  );
};
