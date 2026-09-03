import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patch } from '@notifications/shared/api';
import { useNotificationsType } from '@notifications/app/store/hooks';

import { urls } from '../consts';
import type { Notification } from '../types';
import { queryKeys } from '../queryKeys';

export const useReadMutation = () => {
  const type = useNotificationsType();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (ids: number[]) =>
      patch<Notification[]>(urls.read, { notifications_id: ids }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.unreadCount());
      queryClient.invalidateQueries(queryKeys.list({ type }));
    },
  });

  return {
    performRead: mutate,
    isReading: isLoading,
  };
};
