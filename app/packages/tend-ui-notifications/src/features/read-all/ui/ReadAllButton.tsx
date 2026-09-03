import { Button, Dialog, Toast } from '@rovna-ui/components/primitives';
import React, { useCallback } from 'react';

import { useReadAllMutation, useUnreadCountQuery } from '@notifications/api/hooks';
import {
  useNotificationsChecked,
  useNotificationsType,
} from '@notifications/app/store/hooks';
import { NotificationsTypes } from '@notifications/shared/consts/notifications-types';
import { useFiltersValues } from '@notifications/shared/hooks/useFiltersValues';

import { dialogContent } from '../lib/utils';

export const ReadAllButton = () => {
  const filtersValues = useFiltersValues();
  const checked = useNotificationsChecked();
  const type = useNotificationsType();

  const { counters } = useUnreadCountQuery();
  const { performReadAll, isReadingAll } = useReadAllMutation();

  const handleReadAll = useCallback(() => {
    performReadAll(undefined, {
      onSuccess: () => {
        Toast.success({ message: 'Уведомления прочитаны' });
      },
    });
  }, [performReadAll]);

  const handleClick = useCallback(() => {
    if (type === 'ARCHIVE' || !counters?.[type] || checked.size) return;

    Dialog.confirm({
      title: `Пометить все сообщения как\u00A0прочитанные?`,
      content: dialogContent(counters[type]),
      onOk: handleReadAll,
      cancelText: 'Отменить',
      okText: 'Да, пометить',
    });
  }, [handleReadAll, counters, type, checked.size]);

  if (
    type === NotificationsTypes.ARCHIVE ||
    !counters?.[type] ||
    checked.size ||
    !!filtersValues.length
  ) {
    return null;
  }

  return (
    <Button variant='ghost' size='small' onClick={handleClick} loading={isReadingAll}>
      Прочитать все
    </Button>
  );
};
