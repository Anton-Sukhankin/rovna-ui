import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import {
  useFilters,
  useNotificationsSearch,
  useNotificationsType,
} from '@notifications/app/store/hooks';
import { get } from '@notifications/shared/api/methods';
import type { ApiPaginatedListResponse } from '@notifications/shared/api/types';
import { NotificationsTypes } from '@notifications/shared/consts/notifications-types';

import { urls } from '../consts';
import { queryKeys } from '../queryKeys';
import type { Notification, NotificationsQueryOptions } from '../types';

export const useNotificationsQuery = () => {
  const type = useNotificationsType();
  const search = useNotificationsSearch();
  const filters = useFilters();

  const queryKey = useMemo(
    () => queryKeys.list({ type, ...(search && { search }), ...filters }),
    [type, search, filters],
  );

  const queryFn = useCallback(
    ({ pageParam: page = 1 }) =>
      notificationsGet({
        type,
        page,
        ...(search && { search }),
        ...(filters.module && { module: filters.module }),
        ...(filters.contract && { contract: filters.contract }),
        ...(filters.date && {
          dtStart: filters.date[0].format('DD.MM.YYYY'),
          dtEnd: filters.date[1].format('DD.MM.YYYY'),
        }),
      }),
    [type, search, filters],
  );

  const {
    data,
    isFetching,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.pages > lastPage.page ? allPages.length + 1 : undefined,
  });

  const notifications = useMemo(
    () => data?.pages.flatMap(page => page.items),
    [data?.pages],
  );

  return {
    notifications,
    isNotificationsLoading: isLoading,
    isNotificationsFetching: isFetching,
    isNotificationsError: isError,

    isNotificationsHasNextPage: hasNextPage,
    isNotificationsFetchingNextPage: isFetchingNextPage,
    notificationsFetchNextPage: fetchNextPage,
  };
};

const notificationsGet = (
  params: NotificationsQueryOptions,
): Promise<ApiPaginatedListResponse<Notification>> => {
  const options = {
    page: params.page,
    size: 10,
    notification_type:
      params.type !== NotificationsTypes.ARCHIVE && !params.search
        ? params.type
        : undefined,
    in_archive: params.type === NotificationsTypes.ARCHIVE ? true : undefined,
    module_name: params.module,
    search: params.search,
    dt_start: params.dtStart,
    dt_end: params.dtEnd,
    contract: params.contract,
  };

  return get(urls.notifications, options);
};
