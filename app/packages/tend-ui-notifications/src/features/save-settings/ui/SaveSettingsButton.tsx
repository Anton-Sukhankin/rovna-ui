import { Button, Toast } from '@rovna-ui/components/primitives';
import React, { useCallback } from 'react';

import { useModuleSettingsMutation } from '@notifications/api/hooks';
import { useCurrentModule, useScreen } from '@notifications/app/store/hooks';

export const SaveSettingsButton = () => {
  const { setScreen } = useScreen();
  const { currentModule, clearCurrentModule } = useCurrentModule();
  const { performSaveSettings, isSavingSettings } = useModuleSettingsMutation();

  const handleConfirmSaveSettings = useCallback(() => {
    if (!currentModule) return;

    if (!/\btrue\b/.test(JSON.stringify(currentModule.profile_notification_settings))) {
      currentModule.is_enabled = false;
    }

    performSaveSettings(currentModule, {
      onSuccess: () => {
        Toast.success({ message: `Настройки сохранены` });
        setScreen('services');
        clearCurrentModule();
      },
    });
  }, [currentModule, performSaveSettings, setScreen, clearCurrentModule]);

  return (
    <Button
      onClick={handleConfirmSaveSettings}
      loading={isSavingSettings}
      disabled={!currentModule}
    >
      Сохранить
    </Button>
  );
};
