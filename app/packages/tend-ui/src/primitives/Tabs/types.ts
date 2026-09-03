import React from 'react';
import AntTabs from 'antd-core/es/tabs';

import { Size } from '@rovna-internal/components/types/Size';

export type AntTabsProps = React.ComponentPropsWithoutRef<typeof AntTabs>;
export type TabsRef = React.ElementRef<typeof AntTabs>;
export type TabsProps = Omit<AntTabsProps, 'size'> & {
  moreText?: string;
  size?: Size;
};
