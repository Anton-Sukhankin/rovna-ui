import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Cafe = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-cafe-icon' {...props} ref={ref} color={_color}>
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
            d='M4 4C4 3.44772 4.44772 3 5 3H17H20C21.1046 3 22 3.89543 22 5V8C22 9.10457 21.1046 10 20 10H18V12C18 14.7614 15.7614 17 13 17H9C6.23858 17 4 14.7614 4 12V4ZM18 8H20V5H18V8ZM6 5V12C6 13.6569 7.34315 15 9 15H13C14.6569 15 16 13.6569 16 12V9V5H6ZM4 20C4 19.4477 4.44772 19 5 19H19C19.5523 19 20 19.4477 20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Cafe.displayName = 'Cafe';

export { Cafe };
