import { Box } from '@rovna-ui/components/grid';
import React, { useMemo } from 'react';

import { useNotificationsQuery } from '@notifications/api/hooks';
import { NotificationsActions } from '@notifications/widgets/notifications-actions';
import { NotificationsExplore } from '@notifications/widgets/notifications-explore';
import { NotificationsFilters } from '@notifications/widgets/notifications-filters';
import { NotificationsList } from '@notifications/widgets/notifications-list';
import { NotificationsTabs } from '@notifications/widgets/notifications-tabs';

export const Notifications = () => {
  const { notifications, isNotificationsLoading } = useNotificationsQuery();

  const hasNotifications = useMemo(
    () => Array.isArray(notifications) && notifications.length > 0,
    [notifications],
  );

  return (
    <Box $display={'flex'} $flexDirection={'column'} $height={'100%'}>
      <Box $display='flex' $flexDirection='column' $gap={14} $padding={'0 24px'} $mb={20}>
        <NotificationsExplore />
        <NotificationsTabs />
        <NotificationsFilters />
      </Box>
      {(hasNotifications || isNotificationsLoading) && <NotificationsActions />}
      <NotificationsList />
    </Box>
  );
};
