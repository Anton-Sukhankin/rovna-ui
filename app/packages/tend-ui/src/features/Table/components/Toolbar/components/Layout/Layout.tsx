import React from 'react';

import { Box } from '@rovna-internal/components/grid/Box';
import { useTourContext } from '@rovna-internal/components/features/Table/contexts/TourContext';

import { LayoutProps } from './types';

const Layout = ({ children }: LayoutProps) => {
  const context = useTourContext();

  return (
    <Box
      ref={context?.ui?.toolbar}
      $display='flex'
      $alignItems='center'
      $justifyContent='flex-end'
      $flex='1'
      $gap={8}
    >
      {children}
    </Box>
  );
};

Layout.displayName = 'Table.Toolbar.Layout';

export { Layout };
