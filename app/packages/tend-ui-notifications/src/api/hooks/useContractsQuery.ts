import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { makePaginatedListFetch } from '@notifications/shared/api/utils';

import { urls } from '../consts';
import { queryKeys } from '../queryKeys';
import type { Contract } from '../types';

export const useContractsQuery = () => {
  const queryKey = useMemo(() => queryKeys.contracts(), []);
  const queryFn = useCallback(
    () => makePaginatedListFetch<Contract>(urls.contracts)(),
    [],
  );

  const { data, isLoading } = useQuery({ queryKey, queryFn });

  const contracts = useMemo(
    () => data?.items.map(({ id, number }) => ({ value: id, label: number })),
    [data],
  );

  return {
    contracts,
    contractsLoading: isLoading,
  };
};
