import React from 'react';
import { useTheme } from '@rovna-ui/theme';

import { Root } from './styled';
import { InputProps } from './types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const theme = useTheme();

  return <Root {...props} theme={theme} ref={ref} />;
});
