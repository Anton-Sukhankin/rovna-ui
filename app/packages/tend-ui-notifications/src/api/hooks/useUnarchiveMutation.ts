import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patch } from '@notifications/shared/api';

import { urls } from '../consts';
import { queryKeys } from '../queryKeys';
import type { Notification } from '../types';

export const useUnarchiveMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (ids: number[]) =>
      patch<Notification[]>(urls.unarchive, {
        notifications_id: ids,
        archive_all: false,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.unreadCount());
      queryClient.invalidateQueries(queryKeys.listBase());
    },
  });

  return {
    performUnarchive: mutate,
    isUnarchiving: isLoading,
  };
};
