import React from 'react';

import { Notifications } from '@rovna-ui/notifications';

import { AuthProvider } from './providers/AuthProvider';

export const NotificationsApp = () => (
  <AuthProvider>
    <Notifications />
  </AuthProvider>
);
