import React from 'react';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { Root } from './styled';
import { ThProps, ThRef } from './types';
import { useTableContext } from '../contexts';

const Th = React.forwardRef<ThRef, ThProps>(({ textAlign, ...props }, ref) => {
  const theme = useTheme();
  const config = useTableContext();

  return (
    <Root {...props} ref={ref} theme={theme} $size={config.size} $textAlign={textAlign} />
  );
});

Th.displayName = 'SimpleTable.Th';

export { Th };
