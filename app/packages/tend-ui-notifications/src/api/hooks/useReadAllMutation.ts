import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNotificationsType } from '@notifications/app/store/hooks';
import { patch } from '@notifications/shared/api';

import { urls } from '../consts';
import { queryKeys } from '../queryKeys';

export const useReadAllMutation = () => {
  const type = useNotificationsType();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      patch<Notification[]>(`${urls.read}?notification_type=${type}`, {
        read_all: true,
        notifications_id: [],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.unreadCount());
      queryClient.invalidateQueries(queryKeys.list({ type }));
    },
  });

  return {
    performReadAll: mutate,
    isReadingAll: isLoading,
  };
};
