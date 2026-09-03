import React from 'react';

import { Box } from '@rovna-internal/components/grid/Box';

const Section = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box $display='flex' $alignItems='center' $gap={4}>
      {children}
    </Box>
  );
};

Section.displayName = 'Layout.Header.Section';

export { Section };
