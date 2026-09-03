import React from 'react';
import { Box } from '@rovna-ui/grid/Box';

import { useTableSorters } from '@rovna-internal/table/Table/hooks/useTableSorters';
import { useSorter } from '@rovna-internal/table/Table/hooks/useSorter';
import { useFilter } from '@rovna-internal/table/Table/hooks/useFilter';
import { useTableFilters } from '@rovna-internal/table/Table/hooks/useTableFilters';
import { useColumn } from '@rovna-internal/table/Table/hooks/useColumn';
import { useTableColumns } from '@rovna-internal/table/Table/hooks/useTableColumns';

import { CellTitleProps } from './types';
import { FilterIndicator, SorterIndicator } from './components';

const BaseCellTitle: React.FC<CellTitleProps> = ({ id, children }) => {
  const [sorter] = useSorter(useTableSorters().sorters, id);
  const [filter] = useFilter(useTableFilters().filters, id);
  const [column] = useColumn(useTableColumns().columns, id);

  if (!sorter && !filter) return <>{children}</>;

  const justifyContent = (() => {
    if (column?.align === 'left') return 'flex-start';
    if (column?.align === 'right') return 'flex-end';

    return undefined;
  })();

  return (
    <Box $display='flex' $alignItems='center' $gap={4} $justifyContent={justifyContent}>
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
