import React from 'react';
import { useTheme } from '@rovna-ui/theme';

import { Root } from './styled';
import { SiderProps } from './types';

const Sider: React.FC<SiderProps> = ({ className, ...props }) => {
  const theme = useTheme();

  return (
    <Root
      {...props}
      theme={theme}
      className={['rovna-ui-layout-sider', className].filter(Boolean).join(' ')}
    />
  );
};

Sider.displayName = 'Layout.Sider';

export { Sider };
