import { useMemo } from 'react';

import { useNotificationsQuery } from '@notifications/api/hooks';
import { useNotificationsChecked } from '@notifications/app/store/hooks';

export const useCheckState = () => {
  const { notifications } = useNotificationsQuery();

  const checked = useNotificationsChecked();

  const isChecked = useMemo(
    () => checked.size > 0 && checked.size === notifications?.length,
    [checked, notifications],
  );

  const isIndeterminate = useMemo(
    () => checked.size > 0 && checked.size !== notifications?.length,
    [checked, notifications],
  );

  return { isChecked, isIndeterminate };
};
