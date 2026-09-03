import React from 'react';
import cn from 'classnames';
import { useTheme } from '@rovna-ui/theme';

import { Root } from './styled';
import { FieldProps, FieldRef } from './types';
import styles from './Field.module.css';
import { FieldProvider } from '../contexts';

const Field = React.forwardRef<FieldRef, FieldProps>(
  ({ children, className, status, ...props }, ref) => {
    const theme = useTheme();

    return (
      <FieldProvider status={status}>
        <Root
          {...props}
          theme={theme}
          ref={ref}
          className={cn([styles['rovna-ui-form-field-root'], className], {
            'rovna-ui-form-field-root-has-error': status === 'error',
            'rovna-ui-form-field-root-has-warning': status === 'warning',
          })}
        >
          {children}
        </Root>
      </FieldProvider>
    );
  },
);

Field.displayName = 'Form.Field';

export { Field };
