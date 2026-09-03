import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Calendar = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-calendar-icon' {...props} ref={ref} color={_color}>
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
            d='M7 2C7.55228 2 8 2.44772 8 3V4H16V3C16 2.44772 16.4477 2 17 2C17.5523 2 18 2.44772 18 3V4C19.6569 4 21 5.34315 21 7V9V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V9V7C3 5.34315 4.34315 4 6 4V3C6 2.44772 6.44772 2 7 2ZM17 6H7H6C5.44772 6 5 6.44772 5 7V8H19V7C19 6.44772 18.5523 6 18 6H17ZM5 10H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V10Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Calendar.displayName = 'Calendar';

export { Calendar };
