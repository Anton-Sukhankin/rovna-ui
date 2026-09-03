import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { get } from '@notifications/shared/api';

import { urls } from '../consts';
import { queryKeys } from '../queryKeys';
import type { NotificationsCount } from '../types';

export const useUnreadCountQuery = () => {
  const queryFn = useCallback(() => get<NotificationsCount>(urls.unreadCount), []);
  const queryKey = useMemo(() => queryKeys.unreadCount(), []);

  const { data } = useQuery({ queryKey, queryFn });

  return { counters: data };
};
