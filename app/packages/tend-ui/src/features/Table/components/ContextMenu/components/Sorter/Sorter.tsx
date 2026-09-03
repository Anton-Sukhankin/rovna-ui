import React from 'react';

import { useColumnContext } from '../../contexts/ColumnContext';
import { Root } from './components/Root';
import { ToggleSorter } from './components/ToggleSorter';

const Sorter = () => {
  const column = useColumnContext();

  return (
    <Root column={column}>
      <ToggleSorter>
        <ToggleSorter.Layout>
          <ToggleSorter.Descending />
          <ToggleSorter.Ascending />
        </ToggleSorter.Layout>
      </ToggleSorter>
    </Root>
  );
};

Sorter.displayName = 'ContextMenu.Sorter';
Sorter.Root = Root;
Sorter.ToggleSorter = ToggleSorter;

export { Sorter };
