import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const CalendarOutgoing = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-calendar-outgoing-icon'
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
          <g clipPath='url(#clip0_324_11480)'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M7 1C7.55228 1 8 1.44772 8 2V3H16V2C16 1.44772 16.4477 1 17 1C17.5523 1 18 1.44772 18 2V3C19.6569 3 21 4.34315 21 6V8V12C21 12.5523 20.5523 13 20 13C19.4477 13 19 12.5523 19 12V9H5V18C5 18.5523 5.44772 19 6 19H11C11.5523 19 12 19.4477 12 20C12 20.5523 11.5523 21 11 21H6C4.34315 21 3 19.6569 3 18V8V6C3 4.34315 4.34315 3 6 3V2C6 1.44772 6.44772 1 7 1ZM17 5H7H6C5.44772 5 5 5.44772 5 6V7H19V6C19 5.44772 18.5523 5 18 5H17ZM15 20C15 19.4477 15.4477 19 16 19H19.5858L18.2929 17.7071C17.9024 17.3166 17.9024 16.6834 18.2929 16.2929C18.6834 15.9024 19.3166 15.9024 19.7071 16.2929L22.7071 19.2929C23.0976 19.6834 23.0976 20.3166 22.7071 20.7071L19.7071 23.7071C19.3166 24.0976 18.6834 24.0976 18.2929 23.7071C17.9024 23.3166 17.9024 22.6834 18.2929 22.2929L19.5858 21H16C15.4477 21 15 20.5523 15 20Z'
              fill='currentColor'
            />
          </g>
          <defs>
            <clipPath id='clip0_324_11480'>
              <rect width='24' height='24' fill='currentColor' />
            </clipPath>
          </defs>
        </svg>
      </Icon>
    );
  },
);

CalendarOutgoing.displayName = 'CalendarOutgoing';

export { CalendarOutgoing };
