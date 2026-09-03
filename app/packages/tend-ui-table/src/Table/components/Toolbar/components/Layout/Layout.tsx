import React from 'react';
import { Box } from '@rovna-ui/grid/Box';
import { INTERNAL_RovnaUILogger as RovnaUILogger } from '@rovna-ui/utils';

import { useTourContext } from '@rovna-internal/table/Table/contexts/TourContext';

import { LayoutProps } from './types';

const Layout = ({ children }: LayoutProps) => {
  if (process.env.NODE_ENV === 'development') {
    RovnaUILogger.warning([
      '<Table.Toolbar.FiltersButton /> устарел и более не поддерживается.',
      '',
      'Используйте <Table.ControlPanel />.',
    ]);
  }

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
