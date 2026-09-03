import React from 'react';
import { Box } from '@rovna-ui/grid/Box';

import { ListProps } from './types';

const List: React.FC<ListProps> = ({ children, gap = 8 }) => {
  return (
    <Box
      data-testid='rovna-ui-filters-list'
      $display='flex'
      $flexDirection='column'
      $gap={gap}
    >
      {children}
    </Box>
  );
};

List.displayName = 'Filters.List';

export { List };
