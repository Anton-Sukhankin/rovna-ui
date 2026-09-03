import React from 'react';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { Root } from './styled';
import { TdProps, TdRef } from './types';
import { useTableContext } from '../contexts';

const Td = React.forwardRef<TdRef, TdProps>(({ textAlign, ...props }, ref) => {
  const theme = useTheme();
  const config = useTableContext();

  return (
    <Root {...props} ref={ref} theme={theme} $size={config.size} $textAlign={textAlign} />
  );
});

Td.displayName = 'SimpleTable.Td';

export { Td };
