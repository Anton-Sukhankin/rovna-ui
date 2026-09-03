import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const NotificationError = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-notification-error-icon'
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
            d='M13 2C13 1.44772 12.5523 1 12 1C11.4477 1 11 1.44772 11 2V3.07089C7.60771 3.55612 5 6.47353 5 10V18H4C3.44772 18 3 18.4477 3 19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19C21 18.4477 20.5523 18 20 18H19V10C19 6.47353 16.3923 3.55612 13 3.07089V2ZM12 5C9.23858 5 7 7.23858 7 10V18H17V10C17 7.23858 14.7614 5 12 5ZM10 21C10 22.1046 10.8954 23 12 23C13.1046 23 14 22.1046 14 21H10ZM11 15C11 14.4477 11.4477 14 12 14C12.5523 14 13 14.4477 13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15ZM12 8C11.4477 8 11 8.44771 11 9V12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12V9C13 8.44772 12.5523 8 12 8Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

NotificationError.displayName = 'NotificationError';

export { NotificationError };
