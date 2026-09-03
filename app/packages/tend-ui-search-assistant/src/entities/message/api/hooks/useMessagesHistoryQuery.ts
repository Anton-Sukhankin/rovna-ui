import { useCallback, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { get } from '@search-assistant/shared/api';

import { urls } from '../consts';
import { queryKeys } from '../queryKeys';
import type { MessageTransaction } from '../types';

export const useMessagesHistoryQuery = () => {
  const queryKey = queryKeys.history();

  const queryFn = useCallback(
    ({ pageParam = 1 }) =>
      getMessagesHistory({
        day_number: pageParam,
      }),
    [],
  );

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey,
    queryFn,
    enabled: true,
    getNextPageParam: (previousDayMessages, allDaysMessages) => {
      if (previousDayMessages.day_number < previousDayMessages.total_day_with_answers)
        return allDaysMessages.length + 1;

      return;
    },
  });

  const historyMessages = useMemo(() => {
    return data?.pages.at(-1)?.requests;
  }, [data?.pages]);

  return {
    historyMessages: historyMessages,
    historyFetching: isFetching,
    fetchPrevDayMessages: fetchNextPage,
    hasPreviousDay: hasNextPage,
  };
};

type GetMessagesHistoryParams = {
  day_number?: number;
};

type DaysTransactionsPagination = {
  total_day_with_answers: number;
  day_number: number;
  requests: MessageTransaction[];
};

const getMessagesHistory = (
  params: GetMessagesHistoryParams,
): Promise<DaysTransactionsPagination> => get(urls.history, params);
