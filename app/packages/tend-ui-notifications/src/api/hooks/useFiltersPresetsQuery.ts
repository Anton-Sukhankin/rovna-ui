import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { get } from '@notifications/shared/api';

import { urls } from '../consts';
import { queryKeys } from '../queryKeys';
import type { FiltersPreset } from '../types';
import { mapPresets } from '../utils/mapPresets';

export const useFiltersPresetsQuery = () => {
  const queryKey = useMemo(() => queryKeys.filtersPresets(), []);
  const queryFn = useCallback(
    () => get<Array<FiltersPreset<string>>>(urls.filtersPresets),
    [],
  );

  const { data, isLoading } = useQuery({ queryKey, queryFn });

  const presets = useMemo(() => (data ? mapPresets<string>(data) : []), [data]);

  return {
    presets,
    presetsLoading: isLoading,
  };
};
