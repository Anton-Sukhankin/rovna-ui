import React from 'react';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { Root } from './styled';
import { TbodyProps, TbodyRef } from './types';

const Tbody = React.forwardRef<TbodyRef, TbodyProps>((props, ref) => {
  const theme = useTheme();

  return <Root {...props} ref={ref} theme={theme} />;
});

Tbody.displayName = 'SimpleTable.Tbody';

export { Tbody };
