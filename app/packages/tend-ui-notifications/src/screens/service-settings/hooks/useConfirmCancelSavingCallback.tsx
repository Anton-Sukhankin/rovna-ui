import React, { useCallback } from 'react';
import { Dialog } from '@rovna-ui/components/primitives';
import { Text } from '@rovna-ui/components/typography';

import { useCurrentModule, useScreen } from '@notifications/app/store/hooks';

export const useConfirmCancelSavingCallback = () => {
  const { setScreen } = useScreen();
  const { clearCurrentModule } = useCurrentModule();

  const onOkClickHandler = useCallback(() => {
    clearCurrentModule();
    setScreen('services');
  }, [clearCurrentModule, setScreen]);

  return useCallback(() => {
    Dialog.confirm({
      title: 'Вы действительно хотите отменить настройки в уведомлениях?',
      width: 432,
      content: <Text>{`Изменения не сохранятся.`}</Text>,
      cancelText: 'Нет',
      okText: 'Да, отменить',
      onOk: onOkClickHandler,
      okButtonProps: { preset: 'danger' },
    });
  }, [onOkClickHandler]);
};
