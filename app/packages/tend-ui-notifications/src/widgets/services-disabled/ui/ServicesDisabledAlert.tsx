import { Alert } from '@rovna-ui/components/primitives';
import React, { useMemo } from 'react';

import { useModulesSettingsQuery } from '@notifications/api/hooks/useModulesSettingsQuery';

export const ServicesDisabledAlert = () => {
  const { settings } = useModulesSettingsQuery();

  const allDisabled = useMemo(() => {
    if (!settings) return false;

    return settings?.every(item => !item.is_enabled);
  }, [settings]);

  if (!allDisabled) return null;

  return (
    <Alert
      message='Уведомления полностью отключены'
      description='Вы можете пропустить важную информацию'
      type='error'
    />
  );
};
