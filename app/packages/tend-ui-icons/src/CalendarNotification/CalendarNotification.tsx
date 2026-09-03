import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const CalendarNotification = React.forwardRef<
  HTMLSpanElement,
  Omit<IconProps, 'children'>
>(({ color, ...props }, ref) => {
  const _color = useColor(color);

  return (
    <Icon
      data-testid='rovna-ui-calendar-notification-icon'
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
          d='M8 3C8 2.44772 7.55228 2 7 2C6.44772 2 6 2.44772 6 3V4C4.34315 4 3 5.34315 3 7V9V19C3 20.6569 4.34315 22 6 22H13C13.5523 22 14 21.5523 14 21C14 20.4477 13.5523 20 13 20H6C5.44772 20 5 19.5523 5 19V10H19V14C19 14.5523 19.4477 15 20 15C20.5523 15 21 14.5523 21 14V9V7C21 5.34315 19.6569 4 18 4V3C18 2.44772 17.5523 2 17 2C16.4477 2 16 2.44772 16 3V4H8V3ZM7 6H17H18C18.5523 6 19 6.44772 19 7V8H5V7C5 6.44772 5.44772 6 6 6H7ZM20 24C21.6569 24 23 22.6569 23 21C23 19.3431 21.6569 18 20 18C18.3431 18 17 19.3431 17 21C17 22.6569 18.3431 24 20 24Z'
          fill='currentColor'
        />
      </svg>
    </Icon>
  );
});

CalendarNotification.displayName = 'CalendarNotification';

export { CalendarNotification };
