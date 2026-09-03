import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Door2 = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-door-2-icon' {...props} ref={ref} color={_color}>
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
            d='M4 5C4 3.89543 4.89543 3 6 3H12H18C19.1046 3 20 3.89543 20 5V19C20.5523 19 21 19.4477 21 20C21 20.5523 20.5523 21 20 21H12H4C3.44772 21 3 20.5523 3 20C3 19.4477 3.44772 19 4 19V5ZM13 19H18V5H13V19ZM6 5H11V19H6V5ZM16 12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12ZM9 13C9.55229 13 10 12.5523 10 12C10 11.4477 9.55229 11 9 11C8.44771 11 8 11.4477 8 12C8 12.5523 8.44771 13 9 13Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Door2.displayName = 'Door2';

export { Door2 };
