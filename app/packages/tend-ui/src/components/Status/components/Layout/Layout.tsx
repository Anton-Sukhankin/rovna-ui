import React from 'react';

import { Box } from '@rovna-internal/components/grid/Box';

export const Layout: React.FC = ({ children }) => {
  return (
    <Box
      $position='relative'
      $display='flex'
      $justifyContent='center'
      $alignItems='center'
      $width='100%'
      $height='100%'
      $gap={64}
    >
      {children}
    </Box>
  );
};
