import React from 'react';
import { useTheme } from '@rovna-ui/theme';

import { Root } from './styled';
import { FooterProps } from './types';

const Footer: React.FC<FooterProps> = ({ children, className, ...props }) => {
  const theme = useTheme();

  return (
    <Root
      {...props}
      className={['rovna-ui-layout-footer', className].filter(Boolean).join(' ')}
      theme={theme}
    >
      {children}
    </Root>
  );
};

Footer.displayName = 'Layout.Footer';

export { Footer };
