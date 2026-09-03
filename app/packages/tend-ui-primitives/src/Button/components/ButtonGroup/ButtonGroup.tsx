import React from 'react';
import cn from 'classnames';

import { Root } from './styled';
import { ButtonGroupProps, ButtonGroupRef } from './types';

const ButtonGroup = React.forwardRef<ButtonGroupRef, ButtonGroupProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Root
        data-testid='rovna-ui-button-group'
        {...props}
        ref={ref}
        role='group'
        className={cn(['rovna-ui-button-group-root', className])}
      >
        {children}
      </Root>
    );
  },
);

ButtonGroup.displayName = 'ButtonGroup';

export { ButtonGroup };
