import React from 'react';

import { Root } from './styled';
import { TooltipProps, TooltipRef } from './types';

const Tooltip = React.forwardRef<TooltipRef, TooltipProps>(
  ({ lineBreak, mouseEnterDelay = 0.5, ...props }, ref) => {
    return (
      <Root
        data-testid='rovna-ui-tooltip'
        {...props}
        ref={ref}
        $lineBreak={lineBreak}
        mouseEnterDelay={mouseEnterDelay}
      />
    );
  },
);

Tooltip.displayName = 'Tooltip';

export { Tooltip };
