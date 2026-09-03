import { Tabs } from '@rovna-ui/components/primitives';
import React from 'react';

import { useTabs } from '../hooks/useTabs';

export const NotificationsTabs = () => {
  const tabsProps = useTabs();

  return <Tabs {...tabsProps} tabBarStyle={{ marginBottom: 0 }} />;
};
