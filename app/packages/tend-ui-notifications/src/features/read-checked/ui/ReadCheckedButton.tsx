import { Button, Toast } from '@rovna-ui/components/primitives';
import React, { useCallback, useMemo } from 'react';

import { useNotificationsQuery, useReadMutation } from '@notifications/api/hooks';
import {
  useNotificationsChecked,
  useNotificationsToggleCheckedAll,
} from '@notifications/app/store/hooks';

import { confirmationMessage } from '../lib/utils';

export const ReadCheckedButton = () => {
  const checked = useNotificationsChecked();
  const toggleCheckedAll = useNotificationsToggleCheckedAll();

  const { notifications } = useNotificationsQuery();
  const { performRead, isReading } = useReadMutation();

  const idsToRead = useMemo(() => {
    const idSet = new Set(
      notifications?.filter(item => !item.dt_read).map(item => item.id),
    );

    return Array.from(checked).filter(id => idSet.has(id));
  }, [checked, notifications]);

  const handleClick = useCallback(() => {
    performRead(idsToRead, {
      onSuccess: () => {
        toggleCheckedAll(Array.from(checked));
        Toast.success({ message: confirmationMessage(idsToRead.length) });
      },
    });
  }, [performRead, toggleCheckedAll, checked, idsToRead]);

  if (!checked.size || !idsToRead.length) return null;

  return (
    <Button variant='secondary' size='small' onClick={handleClick} loading={isReading}>
      Прочитать
    </Button>
  );
};
