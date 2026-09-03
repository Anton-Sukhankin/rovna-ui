import React from 'react';

import { QueryProvider } from './app/providers';
import { App, NotificationAppProps } from './app/App';

export const Notifications = (props: NotificationAppProps) => {
  return (
    <QueryProvider>
      <App {...props} />
    </QueryProvider>
  );
};
