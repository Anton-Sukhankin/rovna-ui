import { useQuery } from '@tanstack/react-query';

import { get } from '@notifications/shared/api';

import { urls } from '../consts';
import type { Module } from '../types';
import { queryKeys } from '../queryKeys';

export const useModulesSettingsQuery = () => {
  const queryKey = queryKeys.settings();
  const queryFn = () => get<Module[]>(urls.modules_notifications_settings);

  const { data, isLoading } = useQuery({ queryKey, queryFn });

  return {
    settings: data,
    settingsLoading: isLoading,
  };
};
