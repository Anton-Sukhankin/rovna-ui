import React from 'react';
import { useTheme } from '@rovna-ui/theme';
import cn from 'classnames';

import { Root } from './styled';
import { StrongProps, StrongRef } from './types';

const Strong = React.forwardRef<StrongRef, StrongProps>(
  ({ className, ...props }, ref) => {
    const theme = useTheme();

    return (
      <Root
        data-testid='rovna-ui-strong'
        {...props}
        ref={ref}
        theme={theme}
        className={cn(['rovna-ui-typography-string', className])}
      />
    );
  },
);

Strong.displayName = 'Strong';

export { Strong };
