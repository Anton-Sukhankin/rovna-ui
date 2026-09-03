import React from 'react';

import { Box } from '@rovna-internal/components/grid/Box';
import { useScopedFilters } from '@rovna-internal/components/features/Table/hooks/useScopedFilters';
import { useTableSorters } from '@rovna-internal/components/features/Table/hooks/useTableSorters';
import { useScopedSorters } from '@rovna-internal/components/features/Table/hooks/useScopedSorters';
import { useSorter } from '@rovna-internal/components/features/Table/hooks/useSorter';
import { useFilter } from '@rovna-internal/components/features/Table/hooks/useFilter';
import { useTableFilters } from '@rovna-internal/components/features/Table/hooks/useTableFilters';

import { CellTitleProps } from './types';
import { FilterIndicator, SorterIndicator } from './components';

const BaseCellTitle: React.FC<CellTitleProps> = ({ id, children }) => {
  const [sorter] = useScopedSorters(useSorter(useTableSorters().sorters, id));
  const [filter] = useScopedFilters(useFilter(useTableFilters().filters, id));

  if (!sorter && !filter) return <>{children}</>;

  return (
    <Box $display='flex' $alignItems='center' $gap={4}>
      {children}
      {filter && <FilterIndicator id={id} />}
      {sorter && <SorterIndicator id={id} />}
    </Box>
  );
};

const CellTitle = Object.assign(BaseCellTitle, {
  displayName: 'Table.CellTitle',
  FilterIndicator,
  SorterIndicator,
});

export { CellTitle };
