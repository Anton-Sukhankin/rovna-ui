import React, { useCallback } from 'react';
import { Dialog, Toast } from '@rovna-ui/components/primitives';
import { Text } from '@rovna-ui/components/typography';

import { useCurrentModule, useScreen } from '@notifications/app/store/hooks';
import { useModuleSettingsMutation } from '@notifications/api/hooks';

export const useConfirmApplySavingCallback = () => {
  const { setScreen } = useScreen();
  const { currentModule, clearCurrentModule } = useCurrentModule();
  const { performSaveSettings } = useModuleSettingsMutation();

  const handleConfirmSaveSettings = useCallback(() => {
    if (!currentModule) return;

    performSaveSettings(currentModule, {
      onSuccess: () => {
        Toast.success({ message: `Настройки сохранены` });
        setScreen('services');
        clearCurrentModule();
      },
    });
  }, [clearCurrentModule, currentModule, performSaveSettings, setScreen]);

  return useCallback(() => {
    const instance = Dialog.confirm({
      title: 'Сохранить изменения в настройках уведомлений?',
      width: 432,
      content: <Text>{`Вы собираетесь выйти без сохранения настроек.`}</Text>,
      cancelText: 'Отменить',
      okText: 'Да, сохранить',
      onOk: handleConfirmSaveSettings,
      cancelButtonProps: {
        onClick: () => {
          setScreen('services');
          clearCurrentModule();
          instance.destroy();
        },
      },
      onCancel: () => instance.destroy(),
    });
  }, [clearCurrentModule, handleConfirmSaveSettings, setScreen]);
};
