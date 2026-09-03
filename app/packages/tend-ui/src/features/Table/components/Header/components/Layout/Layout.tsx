import React from 'react';

import { Box } from '@rovna-internal/components/grid/Box';

import { LayoutProps } from './types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box $display='flex' $alignItems='center' $mb={8}>
      {children}
    </Box>
  );
};

Layout.displayName = 'Table.Header.Layout';

export { Layout };
