import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Flag = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-flag-icon' {...props} ref={ref} color={_color}>
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
            d='M5 3H19C19.3729 3 19.7148 3.20746 19.887 3.53819C20.0592 3.86892 20.0331 4.26799 19.8192 4.57346L16.7207 9L19.8192 13.4265C20.0331 13.732 20.0592 14.1311 19.887 14.4618C19.7148 14.7925 19.3729 15 19 15H6V20C6 20.5523 5.55228 21 5 21C4.44772 21 4 20.5523 4 20V14V4C4 3.44772 4.44772 3 5 3ZM6 5V13H17.0793L14.6808 9.57346C14.4397 9.22914 14.4397 8.77086 14.6808 8.42654L17.0793 5H6Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Flag.displayName = 'Flag';

export { Flag };
