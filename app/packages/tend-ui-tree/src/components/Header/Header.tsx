import React from 'react';
import { Search } from '@rovna-ui/components/components';
import { Button } from '@rovna-ui/primitives';
import { FilterAlt } from '@rovna-ui/icons';
import { Box } from '@rovna-ui/grid';

import { TreeData } from '@rovna-internal/tree/core';

import { HeaderProps } from './types';

const Header = <T extends TreeData = TreeData>({
  placeholder,
  table,
  filtersButtonProps,
  showFiltersButton,
  onSearch,
}: HeaderProps<T>) => {
  return (
    <Box
      $display='flex'
      $gap={8}
      data-testid='rovna-ui-tree-header'
      className='rovna-ui-tree-header'
    >
      {table.getHeaderGroups().map(headerGroup => {
        const header = headerGroup.headers[0];

        return (
          <Search
            // Ширина колонки TreeStatusColumn + margin
            width='calc(100% - 12px)'
            data-testid='rovna-ui-tree-search'
            key={header.id}
            value={header.column.getFilterValue() as string}
            onSearch={search => {
              onSearch?.(search);
              header.column.setFilterValue(search);
            }}
            aria-label='Поиск по дереву'
            placeholder={placeholder}
          />
        );
      })}
      {showFiltersButton && (
        <Button
          aria-label='Открыть фильтры'
          {...filtersButtonProps}
          variant='secondary'
          before={<FilterAlt />}
        />
      )}
    </Box>
  );
};

Header.displayName = 'Tree.Header';

export { Header };
