import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { Root } from './styled';
import { ListProps } from './types';

const List = ({ children, items, onScroll }: ListProps) => {
  return (
    <SortableContext items={items} strategy={verticalListSortingStrategy}>
      <Root onScroll={onScroll} className='rovna-ui-tree-list'>
        {children}
      </Root>
    </SortableContext>
  );
};

List.displayName = 'Tree.List';

export { List };
