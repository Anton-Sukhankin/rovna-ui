import React from 'react';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { Root } from './styled';
import { TrProps, TrRef } from './types';

const Tr = React.forwardRef<TrRef, TrProps>(({ selected = false, ...props }, ref) => {
  const theme = useTheme();

  return <Root {...props} ref={ref} theme={theme} $selected={selected} />;
});

Tr.displayName = 'SimpleTable.Tr';

export { Tr };
