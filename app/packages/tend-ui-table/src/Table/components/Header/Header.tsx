import React from 'react';
import { Box } from '@rovna-ui/grid';

import { Layout, Root } from './components';

/**
 * Заголовок таблицы
 */
const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box
      $display='flex'
      $alignItems='center'
      $flexWrap='wrap'
      $maxWidth='100%'
      $mb={16}
      $gap={12}
    >
      {children}
    </Box>
  );
};

Header.displayName = 'Header';
Header.Root = Root;
Header.Layout = Layout;

export { Header };
