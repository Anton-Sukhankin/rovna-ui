import { Filters } from '@rovna-ui/components/components';
import { Box } from '@rovna-ui/components/grid';
import React from 'react';

import { useFilters } from '@notifications/app/store/hooks';
import type { StoreFilter as TFilters } from '@notifications/app/store/types';
import { ClearFiltersButton } from '@notifications/features/clear-filters';
import { useHeaderShadow } from '@notifications/shared/hooks/useHeaderShadow';

import { useFiltersConfig } from '../hooks/useFiltersConfig';
import * as Styled from './FiltersList.styled';

export const FiltersList = () => {
  const { scrollableRef } = useHeaderShadow();

  const filters = useFilters();
  const { config, onValuesChange } = useFiltersConfig();

  return (
    <Styled.Container ref={scrollableRef}>
      <Box $display='flex' $flexDirection='column' $width='100%'>
        <Filters.Root<TFilters>
          filters={config}
          onFilterValuesChange={onValuesChange}
          value={filters}
        >
          <Filters.Form>
            <Filters.CollapseGroup defaultOpen={['preset', 'date', 'module', 'contract']}>
              <Filters.List gap={16}>
                {config.map(filter => (
                  <Filters.Filter key={filter.id} filter={filter} />
                ))}
              </Filters.List>
            </Filters.CollapseGroup>
          </Filters.Form>
        </Filters.Root>
      </Box>
      <ClearFiltersButton />
    </Styled.Container>
  );
};
