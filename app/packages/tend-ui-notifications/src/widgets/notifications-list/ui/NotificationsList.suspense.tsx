import React, { memo } from 'react';

import { NotificationsCardSuspense } from '../../notifications-card';

export const NotificationsListSuspense = memo(() => (
  <>
    {Array(5)
      .fill('')
      .map((_, i) => (
        <NotificationsCardSuspense key={`notification-card-suspense-${i.toString()}`} />
      ))}
  </>
));
