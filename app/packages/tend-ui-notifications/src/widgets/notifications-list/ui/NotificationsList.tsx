import React, { useMemo } from 'react';

import { useNotificationsQuery } from '@notifications/api/hooks';
import { useInfiniteFetch } from '@notifications/shared/hooks';
import {
  NotificationsCard,
  NotificationsCardSuspense,
} from '@notifications/widgets/notifications-card';
import { NotificationsEmpty } from '@notifications/widgets/notifications-empty';

import * as Styled from './NotificationsList.styled';
import { NotificationsListSuspense } from './NotificationsList.suspense';

export const NotificationsList = () => {
  const {
    notifications,
    isNotificationsLoading,
    isNotificationsFetchingNextPage,
    isNotificationsHasNextPage,
    notificationsFetchNextPage,
  } = useNotificationsQuery();

  const { containerRef, fetchNextData } = useInfiniteFetch({
    fetchNextPage: notificationsFetchNextPage,
    isFetchingNextPage: isNotificationsFetchingNextPage,
    hasNextPage: isNotificationsHasNextPage,
  });

  const hasNotifications = useMemo(
    () => Array.isArray(notifications) && notifications.length > 0,
    [notifications],
  );

  if (!hasNotifications && !isNotificationsLoading) {
    return <NotificationsEmpty />;
  }

  return (
    <Styled.Container ref={containerRef} onScroll={fetchNextData}>
      {isNotificationsLoading && <NotificationsListSuspense />}
      {notifications?.map(item => (
        <NotificationsCard key={`notification-${item.id}`} {...item} />
      ))}
      {isNotificationsFetchingNextPage && <NotificationsCardSuspense />}
    </Styled.Container>
  );
};
