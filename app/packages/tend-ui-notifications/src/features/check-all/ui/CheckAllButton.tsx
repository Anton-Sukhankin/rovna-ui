import { Checkbox } from '@rovna-ui/components/primitives';
import React, { useCallback } from 'react';

import { useNotificationsQuery } from '@notifications/api/hooks';
import { useNotificationsToggleCheckedAll } from '@notifications/app/store/hooks';

import { useCheckState } from '../hooks/useCheckState';

export const CheckAllButton = () => {
  const { notifications } = useNotificationsQuery();
  const { isChecked, isIndeterminate } = useCheckState();

  const toggleCheckedAll = useNotificationsToggleCheckedAll();

  const handleChange = useCallback(
    () => toggleCheckedAll((notifications || []).map(({ id }) => id)),
    [notifications, toggleCheckedAll],
  );

  return (
    <Checkbox indeterminate={isIndeterminate} checked={isChecked} onChange={handleChange}>
      Выбрать все
    </Checkbox>
  );
};
