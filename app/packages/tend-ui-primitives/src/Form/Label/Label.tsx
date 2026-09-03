import React from 'react';
import { useTheme } from '@rovna-ui/theme';
import cn from 'classnames';

import { Root } from './styled';
import { LabelProps, LabelRef } from './types';
import styles from './Label.module.css';

const Label = React.forwardRef<LabelRef, LabelProps>(
  ({ children, required, className, ...props }, ref) => {
    const theme = useTheme();

    return (
      <Root
        {...props}
        ref={ref}
        theme={theme}
        $required={required}
        className={cn([styles['rovna-ui-form-label-root'], className])}
      >
        {children}
      </Root>
    );
  },
);

Label.displayName = 'Form.Label';

export { Label };
