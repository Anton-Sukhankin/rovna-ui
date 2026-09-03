import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Door1 = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-door-1-icon' {...props} ref={ref} color={_color}>
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
            d='M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V19H20C20.5523 19 21 19.4477 21 20C21 20.5523 20.5523 21 20 21H19H5H4C3.44772 21 3 20.5523 3 20C3 19.4477 3.44772 19 4 19H5V5ZM7 5H17V19H7V5ZM10 13C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11C9.44771 11 9 11.4477 9 12C9 12.5523 9.44771 13 10 13Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Door1.displayName = 'Door1';

export { Door1 };
