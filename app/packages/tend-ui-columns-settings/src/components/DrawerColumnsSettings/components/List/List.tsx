import React from 'react';
import { SortableContext } from '@dnd-kit/sortable';
import { Box } from '@rovna-ui/grid';

import { ColumnConfig } from '@rovna-internal/columns-settings/core/interfaces';

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
