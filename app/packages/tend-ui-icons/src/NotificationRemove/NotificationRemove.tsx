import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const NotificationRemove = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-notification-remove-icon'
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
            d='M12 1C12.5523 1 13 1.44772 13 2V3.07089C16.3923 3.55612 19 6.47353 19 10V18H20C20.5523 18 21 18.4477 21 19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19C3 18.4477 3.44772 18 4 18H5V10C5 6.47353 7.60771 3.55612 11 3.07089V2C11 1.44772 11.4477 1 12 1ZM7 10C7 7.23858 9.23858 5 12 5C14.7614 5 17 7.23858 17 10V18H7V10ZM12 23C10.8954 23 10 22.1046 10 21H14C14 22.1046 13.1046 23 12 23ZM14.5 13C15.0523 13 15.5 12.5523 15.5 12C15.5 11.4477 15.0523 11 14.5 11H9.5C8.94772 11 8.5 11.4477 8.5 12C8.5 12.5523 8.94772 13 9.5 13H14.5Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

NotificationRemove.displayName = 'NotificationRemove';

export { NotificationRemove };
