import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patch } from '@notifications/shared/api';

import { urls } from '../consts';
import { queryKeys } from '../queryKeys';

export const useRestoreMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (ids: number[]) => patch(urls.undelete, { notifications_id: ids }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.unreadCount());
      queryClient.invalidateQueries(queryKeys.list({ type: 'ARCHIVE' }));
    },
  });

  return {
    performRestore: mutate,
    isRestoring: isLoading,
  };
};
