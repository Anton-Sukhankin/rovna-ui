import React from 'react';
import { Box } from '@rovna-ui/grid/Box';

import { LayoutProps } from './types';

/**
 * @deprecated
 * Используйте просто `Table.Header`
 *
 * @example
 * ```
 * <Table.Root>
 *  ...
 *  <Table.Header>
 *    ...
 *  </Table.Header>
 *  ...
 * </Table.Root>
 * ```
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box $display='flex' $alignItems='center' $mb={8}>
      {children}
    </Box>
  );
};

Layout.displayName = 'Table.Header.Layout';

export { Layout };
