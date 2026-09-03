import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patch } from '@notifications/shared/api';

import { urls } from '../consts';
import { queryKeys } from '../queryKeys';

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (ids: number[]) =>
      patch<{ notifications_id: number }[]>(urls.delete, {
        notifications_id: ids,
        delete_all: false,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.list({ type: 'ARCHIVE' }));
    },
  });

  return {
    performDelete: mutate,
    isDeleting: isLoading,
  };
};
