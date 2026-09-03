import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const MailNotification = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-mail-notification-icon'
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
            d='M2 7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7V13C22 13.5523 21.5523 14 21 14C20.4477 14 20 13.5523 20 13V7.25006L13.8 11.9001C12.7333 12.7001 11.2667 12.7001 10.2 11.9001L4 7.25006V17C4 17.5523 4.44772 18 5 18H15C15.5523 18 16 18.4477 16 19C16 19.5523 15.5523 20 15 20H5C3.34315 20 2 18.6569 2 17V7ZM5.66659 6H18.3334L12.6 10.3001C12.2444 10.5667 11.7556 10.5667 11.4 10.3001L5.66659 6ZM21 22C22.6569 22 24 20.6569 24 19C24 17.3431 22.6569 16 21 16C19.3431 16 18 17.3431 18 19C18 20.6569 19.3431 22 21 22Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

MailNotification.displayName = 'MailNotification';

export { MailNotification };
