import { Button, Toast } from '@rovna-ui/components/primitives';
import React, { useCallback } from 'react';

import { useArchiveMutation, useUnarchiveMutation } from '@notifications/api/hooks';
import {
  useNotificationsChecked,
  useNotificationsToggleCheckedAll,
  useNotificationsType,
} from '@notifications/app/store/hooks';
import { NotificationsTypes } from '@notifications/shared/consts/notifications-types';

import { confirmationMessage } from '../lib/utils';

export const ArchiveCheckedButton = () => {
  const type = useNotificationsType();

  const checked = useNotificationsChecked();
  const toggleCheckedAll = useNotificationsToggleCheckedAll();

  const { performArchive, isArchiving } = useArchiveMutation();
  const { performUnarchive, isUnarchiving } = useUnarchiveMutation();

  const handleClick = useCallback(() => {
    const fn = type === NotificationsTypes.ARCHIVE ? performUnarchive : performArchive;
    const ids = Array.from(checked);

    fn(ids, {
      onSuccess: () => {
        toggleCheckedAll(ids);
        Toast.success({
          message: confirmationMessage(checked.size, type === NotificationsTypes.ARCHIVE),
        });
      },
    });
  }, [performArchive, performUnarchive, type, toggleCheckedAll, checked]);

  if (!checked.size) return null;

  return (
    <Button
      variant='secondary'
      size='small'
      onClick={handleClick}
      loading={isArchiving || isUnarchiving}
    >
      {type === NotificationsTypes.ARCHIVE ? 'Вернуть из архива' : 'Поместить в архив'}
    </Button>
  );
};
