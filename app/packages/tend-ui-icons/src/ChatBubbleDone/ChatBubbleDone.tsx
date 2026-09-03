import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ChatBubbleDone = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-chat-bubble-done-icon'
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
          <g clipPath='url(#clip0_324_11530)'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M6 3C3.79086 3 2 4.79086 2 7V15C2 17.2091 3.79086 19 6 19V21C6 21.3788 6.214 21.725 6.55279 21.8944C6.89157 22.0638 7.29698 22.0273 7.6 21.8L11.3333 19H13C13.5523 19 14 18.5523 14 18C14 17.4477 13.5523 17 13 17H11C10.7836 17 10.5731 17.0702 10.4 17.2L8 19V17H6C4.89543 17 4 16.1046 4 15V7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V11C20 11.5523 20.4477 12 21 12C21.5523 12 22 11.5523 22 11V7C22 4.79086 20.2091 3 18 3H6ZM23.7071 16.7071C24.0976 16.3166 24.0976 15.6834 23.7071 15.2929C23.3166 14.9024 22.6834 14.9024 22.2929 15.2929L19 18.5858L17.7071 17.2929C17.3166 16.9024 16.6834 16.9024 16.2929 17.2929C15.9024 17.6834 15.9024 18.3166 16.2929 18.7071L17.9393 20.3536C18.5251 20.9393 19.4749 20.9393 20.0607 20.3536L23.7071 16.7071Z'
              fill='currentColor'
            />
          </g>
          <defs>
            <clipPath id='clip0_324_11530'>
              <rect width='24' height='24' fill='currentColor' />
            </clipPath>
          </defs>
        </svg>
      </Icon>
    );
  },
);

ChatBubbleDone.displayName = 'ChatBubbleDone';

export { ChatBubbleDone };
