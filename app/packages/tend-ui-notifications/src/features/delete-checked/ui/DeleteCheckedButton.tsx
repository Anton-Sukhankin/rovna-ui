import { Button, Dialog, Toast } from '@rovna-ui/components/primitives';
import React, { useCallback } from 'react';

import { useDeleteMutation } from '@notifications/api/hooks';
import {
  useNotificationsChecked,
  useNotificationsToggleCheckedAll,
  useNotificationsType,
} from '@notifications/app/store/hooks';
import { NotificationsTypes } from '@notifications/shared/consts/notifications-types';

import { confirmationText, dialogContent } from '../lib/utils';
// import { RestoreDeletedButton } from './RestoreDeletedButton';

export const DeleteCheckedButton = () => {
  // const [toast, contextHolder] = Toast.useToast();
  const type = useNotificationsType();

  const checked = useNotificationsChecked();
  const toggleCheckedAll = useNotificationsToggleCheckedAll();

  const { performDelete, isDeleting } = useDeleteMutation();

  const handleClick = useCallback(() => {
    const ids = Array.from(checked);

    performDelete(ids, {
      onSuccess: () => {
        toggleCheckedAll(ids);
        Toast.success({
          message: confirmationText(checked.size),
          // footer: [
          //   <RestoreDeletedButton
          //     key={`notification-restore-button-${ids.toString()}`}
          //     ids={ids}
          //     onSuccess={() => toast.destroy()}
          //   />,
          // ],
        });
      },
    });
  }, [performDelete, toggleCheckedAll, checked]);

  const handleDialog = useCallback(() => {
    Dialog.confirm({
      title: `Вы действительно хотите удалить уведомления?`,
      content: dialogContent(checked.size),
      okText: 'Удалить',
      onOk: handleClick,
      okButtonProps: { preset: 'danger' },
    });
  }, [handleClick, checked.size]);

  if (type !== NotificationsTypes.ARCHIVE || !checked.size) return null;

  return (
    // <>
    //   {contextHolder}
    <Button
      variant='ghost'
      preset='danger'
      size='small'
      onClick={handleDialog}
      loading={isDeleting}
    >
      Удалить
    </Button>
    // </>
  );
};
