import React from 'react';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { Root } from './styled';
import { TheadProps, TheadRef } from './types';

const Thead = React.forwardRef<TheadRef, TheadProps>((props, ref) => {
  const theme = useTheme();

  return <Root {...props} ref={ref} theme={theme} />;
});

Thead.displayName = 'SimpleTable.Thead';

export { Thead };
