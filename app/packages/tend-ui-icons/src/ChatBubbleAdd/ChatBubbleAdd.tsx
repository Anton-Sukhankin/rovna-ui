import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ChatBubbleAdd = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-chat-bubble-add-icon'
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
            d='M2 7C2 4.79086 3.79086 3 6 3H18C20.2091 3 22 4.79086 22 7V10C22 10.5523 21.5523 11 21 11C20.4477 11 20 10.5523 20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V15C4 16.1046 4.89543 17 6 17H8V19L10.4 17.2C10.5731 17.0702 10.7836 17 11 17H12C12.5523 17 13 17.4477 13 18C13 18.5523 12.5523 19 12 19H11.3333L7.6 21.8C7.29698 22.0273 6.89157 22.0638 6.55279 21.8944C6.214 21.725 6 21.3788 6 21V19C3.79086 19 2 17.2091 2 15V7ZM16 18C16 17.4477 16.4477 17 17 17H19V15C19 14.4477 19.4477 14 20 14C20.5523 14 21 14.4477 21 15V17H23C23.5523 17 24 17.4477 24 18C24 18.5523 23.5523 19 23 19H21V21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21V19H17C16.4477 19 16 18.5523 16 18Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ChatBubbleAdd.displayName = 'ChatBubbleAdd';

export { ChatBubbleAdd };
