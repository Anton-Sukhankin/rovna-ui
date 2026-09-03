import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ChatBubbleNotification = React.forwardRef<
  HTMLSpanElement,
  Omit<IconProps, 'children'>
>(({ color, ...props }, ref) => {
  const _color = useColor(color);

  return (
    <Icon
      data-testid='rovna-ui-chat-bubble-notification-icon'
      {...props}
      ref={ref}
      color={_color}
    >
      <svg
        width='1em'
        height='1em'
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M6 3C3.79086 3 2 4.79086 2 7V15C2 17.2091 3.79086 19 6 19V21C6 21.3788 6.214 21.725 6.55279 21.8944C6.89157 22.0638 7.29698 22.0273 7.6 21.8L11.3333 19H14C14.5523 19 15 18.5523 15 18C15 17.4477 14.5523 17 14 17H11C10.7836 17 10.5731 17.0702 10.4 17.2L8 19V17H6C4.89543 17 4 16.1046 4 15V7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V11C20 11.5523 20.4477 12 21 12C21.5523 12 22 11.5523 22 11V7C22 4.79086 20.2091 3 18 3H6ZM21 21C22.6569 21 24 19.6569 24 18C24 16.3431 22.6569 15 21 15C19.3431 15 18 16.3431 18 18C18 19.6569 19.3431 21 21 21Z'
          fill='currentColor'
        />
      </svg>
    </Icon>
  );
});

ChatBubbleNotification.displayName = 'ChatBubbleNotification';

export { ChatBubbleNotification };
