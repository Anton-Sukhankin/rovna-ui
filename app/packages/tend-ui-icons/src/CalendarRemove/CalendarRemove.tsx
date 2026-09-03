import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const CalendarRemove = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-calendar-remove-icon'
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
            d='M8 3C8 2.44772 7.55228 2 7 2C6.44772 2 6 2.44772 6 3V4C4.34315 4 3 5.34315 3 7V9V19C3 20.6569 4.34315 22 6 22H12C12.5523 22 13 21.5523 13 21C13 20.4477 12.5523 20 12 20H6C5.44772 20 5 19.5523 5 19V10H19V16C19 16.5523 19.4477 17 20 17C20.5523 17 21 16.5523 21 16V9V7C21 5.34315 19.6569 4 18 4V3C18 2.44772 17.5523 2 17 2C16.4477 2 16 2.44772 16 3V4H8V3ZM7 6H17H18C18.5523 6 19 6.44772 19 7V8H5V7C5 6.44772 5.44772 6 6 6H7ZM23 22C23.5523 22 24 21.5523 24 21C24 20.4477 23.5523 20 23 20H17C16.4477 20 16 20.4477 16 21C16 21.5523 16.4477 22 17 22H23Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

CalendarRemove.displayName = 'CalendarRemove';

export { CalendarRemove };
