import React from 'react';
import { useTheme } from '@rovna-ui/theme';
import cn from 'classnames';

import { Root } from './styled';
import { HelpProps, HelpRef } from './types';
import styles from './Help.module.css';

const Help = React.forwardRef<HelpRef, HelpProps>(
  ({ children, className, ...props }, ref) => {
    const theme = useTheme();

    return (
      <Root
        {...props}
        ref={ref}
        theme={theme}
        className={cn([styles['rovna-ui-form-help-root'], className])}
      >
        {children}
      </Root>
    );
  },
);

Help.displayName = 'Form.Help';

export { Help };
