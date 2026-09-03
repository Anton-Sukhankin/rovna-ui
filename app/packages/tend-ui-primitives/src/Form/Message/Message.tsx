import React from 'react';
import { Error } from '@rovna-ui/icons/Error';
import { useTheme } from '@rovna-ui/theme';
import cn from 'classnames';

import { Root } from './styled';
import { MessageProps, MessageRef } from './types';
import styles from './Message.module.css';

const Message = React.forwardRef<MessageRef, MessageProps>(
  ({ children, className, ...props }, ref) => {
    const theme = useTheme();

    return (
      <Root
        {...props}
        ref={ref}
        theme={theme}
        role={props.role ?? 'alert'}
        className={cn([styles['rovna-ui-form-message-root'], className])}
      >
        <Error size={16} />
        {children}
      </Root>
    );
  },
);

Message.displayName = 'Form.Message';

export { Message };
