import { useCallback } from 'react';

import { useCurrentModule, useScreen } from '@notifications/app/store/hooks';
import { useModuleSettingsMutation } from '@notifications/api/hooks';
import type { Module } from '@notifications/api/types';

export const useServiceItemHandlers = (settings: Module[] | undefined) => {
  const { setScreen } = useScreen();
  const { setCurrentModule } = useCurrentModule();
  const { performSaveSettings } = useModuleSettingsMutation();

  const onClickItemHandler = useCallback(
    id => {
      const currentModule = settings?.find(item => item.id === id);
      if (currentModule) setCurrentModule(currentModule);
      setScreen('service-settings');
    },
    [settings, setCurrentModule, setScreen],
  );

  const onChangeNotificationToggle = useCallback(
    (id, val) => {
      const currentModule = settings?.find(item => item.id === id);
      if (currentModule) {
        let notificationSettings = currentModule.profile_notification_settings;
        const stringSettings = JSON.stringify(notificationSettings);

        if (!/\btrue\b/.test(stringSettings)) {
          notificationSettings = JSON.parse(stringSettings.replace(/false/g, 'true'));
        }

        performSaveSettings({
          ...currentModule,
          is_enabled: val,
          profile_notification_settings: notificationSettings,
        });
      }
    },
    [settings, performSaveSettings],
  );

  return {
    onClickItemHandler,
    onChangeNotificationToggle,
  };
};
