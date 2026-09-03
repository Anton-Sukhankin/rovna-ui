import React from 'react';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { ScrollableProps, ScrollableRef } from './types';
import { Root } from './styled';

const Scrollable = React.forwardRef<ScrollableRef, ScrollableProps>(
  ({ maxHeight = '200px', className, tabIndex = 0, ...props }, ref) => {
    const theme = useTheme();

    return (
      <Root
        {...props}
        ref={ref}
        $theme={theme}
        $maxHeight={maxHeight}
        tabIndex={tabIndex}
        className={['rovna-ui-scrollable', className].filter(Boolean).join(' ')}
      />
    );
  },
);

Scrollable.displayName = 'Scrollable';

export { Scrollable };
