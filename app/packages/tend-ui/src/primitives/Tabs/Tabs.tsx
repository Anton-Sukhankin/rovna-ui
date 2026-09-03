import React from 'react';

import { useTheme } from '@rovna-internal/components/theme/Theme';
import { useSize } from '@rovna-internal/components/hooks/useSize';

import { More } from './More';
import { Root } from './styled';
import { TabsProps, TabsRef } from './types';

const Tabs = React.forwardRef<TabsRef, TabsProps>(({ moreText, ...props }, ref) => {
  const theme = useTheme();
  const hasMoreIcon = typeof props.moreIcon !== 'undefined';
  const size = useSize(props.size);

  return (
    <Root
      data-testid='rovna-ui-tabs'
      moreIcon={<More>{moreText}</More>}
      {...props}
      ref={ref}
      $customMoreIcon={hasMoreIcon}
      $theme={theme}
      size={size}
    />
  );
});

Tabs.displayName = 'Tabs';

export { Tabs };
