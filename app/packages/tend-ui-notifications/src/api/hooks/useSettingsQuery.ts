import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { get } from '@notifications/shared/api';

import { urls } from '../consts';
import type { SettingsResponse } from '../types';
import { queryKeys } from '../queryKeys';

export const useSettingsQuery = () => {
  const queryKey = useMemo(() => queryKeys.settings(), []);
  const queryFn = useCallback(() => get<SettingsResponse>(urls.settings), []);

  const { data, isLoading } = useQuery({ queryKey, queryFn });

  return {
    settings: data?.settings,
    settingsLoading: isLoading,
  };
};
