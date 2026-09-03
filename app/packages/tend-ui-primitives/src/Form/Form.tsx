import React from 'react';
import cn from 'classnames';

import { Field } from './Field';
import { Help } from './Help';
import { Label } from './Label';
import { Message } from './Message';
import { Root } from './styled';
import { FormProps, FormRef } from './types';
import styles from './Form.module.css';

const BaseForm = React.forwardRef<FormRef, FormProps>(
  ({ gap = 16, children, className, ...props }, ref) => {
    return (
      <Root
        data-testid='rovna-ui-form'
        {...props}
        ref={ref}
        $gap={gap}
        className={cn([styles['rovna-ui-form-root'], className])}
      >
        {children}
      </Root>
    );
  },
);

export const Form = Object.assign(BaseForm, {
  displayName: 'Form',
  Field,
  Label,
  Message,
  Help,
});
