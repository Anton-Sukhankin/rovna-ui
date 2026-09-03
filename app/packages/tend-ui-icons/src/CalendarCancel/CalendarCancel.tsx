import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const CalendarCancel = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-calendar-cancel-icon'
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
            d='M7 2C7.55228 2 8 2.44772 8 3V4H16V3C16 2.44772 16.4477 2 17 2C17.5523 2 18 2.44772 18 3V4C19.6569 4 21 5.34315 21 7V9V14C21 14.5523 20.5523 15 20 15C19.4477 15 19 14.5523 19 14V10H5V19C5 19.5523 5.44772 20 6 20H13C13.5523 20 14 20.4477 14 21C14 21.5523 13.5523 22 13 22H6C4.34315 22 3 20.6569 3 19V9V7C3 5.34315 4.34315 4 6 4V3C6 2.44772 6.44772 2 7 2ZM17 6H7H6C5.44772 6 5 6.44772 5 7V8H19V7C19 6.44772 18.5523 6 18 6H17ZM21.4143 21L22.7071 22.2928C23.0976 22.6833 23.0976 23.3165 22.7071 23.707C22.3165 24.0975 21.6834 24.0975 21.2929 23.707L20 22.4142L18.7071 23.7071C18.3166 24.0976 17.6835 24.0976 17.2929 23.7071C16.9024 23.3165 16.9024 22.6834 17.2929 22.2929L18.5858 21L17.2929 19.707C16.9024 19.3165 16.9024 18.6833 17.2929 18.2928C17.6834 17.9023 18.3166 17.9023 18.7071 18.2928L20 19.5857L21.2929 18.2929C21.6834 17.9024 22.3166 17.9024 22.7071 18.2929C23.0976 18.6834 23.0976 19.3166 22.7071 19.7071L21.4143 21Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

CalendarCancel.displayName = 'CalendarCancel';

export { CalendarCancel };
