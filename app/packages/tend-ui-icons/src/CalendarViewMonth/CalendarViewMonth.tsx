import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const CalendarViewMonth = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-calendar-view-month-icon'
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
            d='M5 4C3.34315 4 2 5.34315 2 7V17C2 18.6569 3.34315 20 5 20H19C20.6569 20 22 18.6569 22 17V13V11V7C22 5.34315 20.6569 4 19 4H5ZM20 7V11L16 11V6H19C19.5523 6 20 6.44772 20 7ZM20 13H16V18H19C19.5523 18 20 17.5523 20 17V13ZM14 6V11H10V6H14ZM8 6V11H4V7C4 6.44772 4.44772 6 5 6H8ZM8 13H4V17C4 17.5523 4.44772 18 5 18H8V13ZM10 18H14V13H10V18Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

CalendarViewMonth.displayName = 'CalendarViewMonth';

export { CalendarViewMonth };
