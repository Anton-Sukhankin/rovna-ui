import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const NotificationsNew = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-notifications-new-icon'
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
            d='M12 1C12.5523 1 13 1.44772 13 2V3.07089C16.3923 3.55612 19 6.47353 19 10V14C19 14.5523 18.5523 15 18 15C17.4477 15 17 14.5523 17 14V10C17 7.23858 14.7614 5 12 5C9.23858 5 7 7.23858 7 10V18H13.5C14.0523 18 14.5 18.4477 14.5 19C14.5 19.5523 14.0523 20 13.5 20H4C3.44772 20 3 19.5523 3 19C3 18.4477 3.44772 18 4 18H5V10C5 6.47353 7.60771 3.55612 11 3.07089V2C11 1.44772 11.4477 1 12 1ZM12 23C10.8954 23 10 22.1046 10 21H14C14 22.1046 13.1046 23 12 23ZM20 24C21.6569 24 23 22.6569 23 21C23 19.3431 21.6569 18 20 18C18.3431 18 17 19.3431 17 21C17 22.6569 18.3431 24 20 24Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

NotificationsNew.displayName = 'NotificationsNew';

export { NotificationsNew };
