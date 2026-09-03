import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { post } from '@notifications/shared/api';
import { omit } from '@notifications/shared/lib/utils/omit';

import { urls } from '../consts';
import { queryKeys } from '../queryKeys';
import type { Module, ModuleToBackend } from '../types';

const changeDataToBackend = (module: Module): ModuleToBackend => ({
  ...omit({ ...module }, ['id', 'profile_notification_settings']),
  module_id: module.id,
  notification_settings: module.profile_notification_settings,
});

const changeDataFromBackend = (module: ModuleToBackend): Module => ({
  ...omit({ ...module }, ['module_id', 'notification_settings']),
  id: module.module_id,
  profile_notification_settings: module.notification_settings,
});

export const useModuleSettingsMutation = () => {
  const queryClient = useQueryClient();

  const onSuccessHandler = useCallback(
    (data: ModuleToBackend) => {
      queryClient.setQueryData<Module[]>(queryKeys.settings(), prevState => {
        if (prevState) {
          const updatedState: Module[] = [...prevState];
          const updatedIndex = updatedState.findIndex(item => item.id === data.module_id);
          if (updatedIndex >= 0) {
            updatedState[updatedIndex] = {
              ...changeDataFromBackend(data),
              name: updatedState[updatedIndex].name,
              description: updatedState[updatedIndex].description,
            };
          }

          return updatedState;
        }
      });
    },
    [queryClient],
  );

  const { mutate, isLoading } = useMutation({
    mutationFn: (updatedModule: Module) =>
      post<ModuleToBackend>(urls.module_update, {
        ...changeDataToBackend(updatedModule),
      }),
    onSuccess: onSuccessHandler,
  });

  return {
    performSaveSettings: mutate,
    isSavingSettings: isLoading,
  };
};
