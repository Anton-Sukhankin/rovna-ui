import { Alert } from '@rovna-ui/components/primitives';
import React, { useMemo } from 'react';

import { useCurrentModule } from '@notifications/app/store/hooks';

export const SettingsDisabledAlert = () => {
  const { currentModule } = useCurrentModule();

  const disabledSendersOrNotificationsTypes = useMemo(() => {
    const disabledSender = !/\btrue\b/.test(
      JSON.stringify(currentModule?.profile_notification_settings.sender_types),
    );
    const disabledNotifications = !/\btrue\b/.test(
      JSON.stringify(currentModule?.profile_notification_settings.notification_types),
    );

    return disabledSender || disabledNotifications;
  }, [currentModule]);

  if (!disabledSendersOrNotificationsTypes) return null;

  return (
    <Alert
      mt={12}
      description='Для получения уведомлений, выберите способ и тип'
      type='error'
    />
  );
};
