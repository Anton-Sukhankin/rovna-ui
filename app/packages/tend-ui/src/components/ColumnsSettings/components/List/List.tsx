import React from 'react';
import { SortableContext } from '@dnd-kit/sortable';

import { Box } from '@rovna-internal/components/grid/Box';
import { ColumnConfig } from '@rovna-internal/components/components/ColumnsSettings/core/interfaces';

import { ListProps } from './types';

const List = <T extends ColumnConfig = ColumnConfig>({
  columns,
  children,
  gap = 8,
}: ListProps<T>) => {
  return (
    <SortableContext items={columns}>
      <Box
        data-testid='rovna-ui-columns-settings-list'
        $display='flex'
        $flexDirection='column'
        $gap={gap}
      >
        {children}
      </Box>
    </SortableContext>
  );
};

export { List };
