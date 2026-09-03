import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';

import { post } from '@notifications/shared/api';

import { urls } from '../consts';
import { queryKeys } from '../queryKeys';
import type { FiltersPreset } from '../types';
import { mapPresets } from '../utils/mapPresets';

export const useFiltersPresetsMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (presets: Array<FiltersPreset<Dayjs>>) =>
      post<Array<FiltersPreset<string>>>(urls.filtersPresets, {
        filters: mapPresets<Dayjs>(presets),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.filtersPresets());
    },
  });

  return {
    performFiltersPresetsSave: mutate,
    isFiltersPresetsSaving: isLoading,
  };
};
