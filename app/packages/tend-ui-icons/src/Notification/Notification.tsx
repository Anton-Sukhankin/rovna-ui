import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Notification = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-notification-icon' {...props} ref={ref} color={_color}>
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
            d='M13 2C13 1.44772 12.5523 1 12 1C11.4477 1 11 1.44772 11 2V3.07089C7.60771 3.55612 5 6.47353 5 10V18H4C3.44772 18 3 18.4477 3 19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19C21 18.4477 20.5523 18 20 18H19V10C19 6.47353 16.3923 3.55612 13 3.07089V2ZM12 5C9.23858 5 7 7.23858 7 10V18H17V10C17 7.23858 14.7614 5 12 5ZM10 21C10 22.1046 10.8954 23 12 23C13.1046 23 14 22.1046 14 21H10Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Notification.displayName = 'Notification';

export { Notification };
