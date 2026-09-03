import React from 'react';
import { useTheme } from '@rovna-ui/theme';
import cn from 'classnames';

import { Root } from './styled';
import { EmProps, EmRef } from './types';

const Em = React.forwardRef<EmRef, EmProps>(({ className, ...props }, ref) => {
  return (
    <Root
      data-testid='rovna-ui-em'
      {...props}
      ref={ref}
      theme={useTheme()}
      className={cn(['rovna-ui-typography-em', className])}
    />
  );
});

Em.displayName = 'Em';

export { Em };
