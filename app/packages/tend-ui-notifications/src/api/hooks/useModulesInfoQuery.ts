import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { makePaginatedListFetch } from '@notifications/shared/api/utils';

import { urls } from '../consts';
import type { SettingsModule } from '../types';
import { queryKeys } from '../queryKeys';

export const useModulesInfoQuery = () => {
  const queryKey = queryKeys.modules();
  const queryFn = () => makePaginatedListFetch<SettingsModule>(urls.modules)();

  const { data, isLoading } = useQuery({ queryKey, queryFn });

  const modules = useMemo(
    () => data?.items.map(i => ({ label: i.title, value: i.sfb })),
    [data],
  );

  return {
    modules,
    modulesLoading: isLoading,
  };
};
