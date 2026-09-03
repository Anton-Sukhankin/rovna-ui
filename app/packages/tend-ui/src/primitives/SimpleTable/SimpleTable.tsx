import React from 'react';
import { extractMarginProps } from '@rovna-ui/styling';

import { useTheme } from '@rovna-internal/components/theme/Theme';
import { Spinner } from '@rovna-internal/components/primitives/Spinner';

import { Root } from './styled';
import { SimpleTableProps, SimpleTableRef } from './types';
import { Tbody } from './Tbody';
import { Thead } from './Thead';
import { Tr } from './Tr';
import { Th } from './Th';
import { Td } from './Td';
import { TableContext } from './contexts';

const BaseTable = React.forwardRef<SimpleTableRef, SimpleTableProps>(
  ({ size = 'medium', loading = false, ...props }, ref) => {
    const { rest, ...marginProps } = extractMarginProps(props);
    const theme = useTheme();

    return (
      <TableContext value={React.useMemo(() => ({ size }), [size])}>
        <Spinner color={theme.colors.blue600} size='small' loading={loading}>
          <Root {...rest} {...marginProps} ref={ref} theme={theme} />
        </Spinner>
      </TableContext>
    );
  },
);

export const SimpleTable = Object.assign(BaseTable, {
  displayName: 'SimpleTable',
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
});
