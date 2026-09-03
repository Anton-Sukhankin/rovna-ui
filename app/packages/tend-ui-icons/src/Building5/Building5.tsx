import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Building5 = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-building-5-icon' {...props} ref={ref} color={_color}>
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
            d='M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V6ZM6 5C5.44772 5 5 5.44772 5 6V19H19V6C19 5.44772 18.5523 5 18 5H6ZM7 8C7 7.44772 7.44772 7 8 7H10C10.5523 7 11 7.44772 11 8C11 8.55228 10.5523 9 10 9H8C7.44772 9 7 8.55228 7 8ZM14 7C13.4477 7 13 7.44772 13 8C13 8.55228 13.4477 9 14 9H16C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7H14ZM7 12C7 11.4477 7.44772 11 8 11H10C10.5523 11 11 11.4477 11 12C11 12.5523 10.5523 13 10 13H8C7.44772 13 7 12.5523 7 12ZM14 11C13.4477 11 13 11.4477 13 12C13 12.5523 13.4477 13 14 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H14ZM7 16C7 15.4477 7.44772 15 8 15H10C10.5523 15 11 15.4477 11 16C11 16.5523 10.5523 17 10 17H8C7.44772 17 7 16.5523 7 16ZM14 15C13.4477 15 13 15.4477 13 16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16C17 15.4477 16.5523 15 16 15H14Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Building5.displayName = 'Building5';

export { Building5 };
