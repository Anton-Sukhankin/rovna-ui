import { Box } from '@rovna-ui/components/grid';
import { Close } from '@rovna-ui/components/icons';
import { Text } from '@rovna-ui/components/typography';
import React, { useCallback } from 'react';

import { useFilters, useSetFilters } from '@notifications/app/store/hooks';
import type { StoreFilter } from '@notifications/app/store/types';
import { ClearFiltersIconButton } from '@notifications/features/clear-filters';
import { SavePresetButton } from '@notifications/features/save-preset';
import { useFiltersValues } from '@notifications/shared/hooks/useFiltersValues';

import * as Styled from './NotificationsFilters.styled';

export const NotificationsFilters = () => {
  const filters = useFilters();
  const setFilters = useSetFilters();

  const filtersValues = useFiltersValues();

  const handleRemoveFilter = useCallback(
    (key: keyof StoreFilter) => {
      setFilters({ ...filters, preset: undefined, [key]: undefined });
    },
    [filters, setFilters],
  );

  if (!filtersValues.length) return null;

  return (
    <Box $display='grid' $gridTemplateColumns='1fr 72px' $gap={8} $mt={2}>
      <Box $display='flex' $gap={8} $flexWrap='wrap'>
        {filtersValues.map(({ key, label, value }) => {
          if (!value) return null;

          return (
            <Styled.Chips key={key}>
              <Text color='gray650'>{label}:</Text>
              <Text color='gray900'>{value}</Text>
              <Close onClick={() => handleRemoveFilter(key)} />
            </Styled.Chips>
          );
        })}
      </Box>
      <Box $display='flex' $justifyContent='flex-end' $gap={8}>
        {!filters.preset && <SavePresetButton />}
        <ClearFiltersIconButton />
      </Box>
    </Box>
  );
};
