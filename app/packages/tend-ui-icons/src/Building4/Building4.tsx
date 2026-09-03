import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Building4 = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-building-4-icon' {...props} ref={ref} color={_color}>
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
            d='M2 6C2 4.34315 3.34315 3 5 3H9C10.6569 3 12 4.34315 12 6V7H19C20.6569 7 22 8.34315 22 10V20C22 20.5523 21.5523 21 21 21H11H3C2.44772 21 2 20.5523 2 20V6ZM10 19V8V6C10 5.44772 9.55228 5 9 5H5C4.44772 5 4 5.44772 4 6V19H10ZM12 19H20V10C20 9.44772 19.5523 9 19 9H12V19ZM6 8C6 7.44772 6.44772 7 7 7C7.55228 7 8 7.44772 8 8C8 8.55228 7.55228 9 7 9C6.44772 9 6 8.55228 6 8ZM7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13C7.55228 13 8 12.5523 8 12C8 11.4477 7.55228 11 7 11ZM6 16C6 15.4477 6.44772 15 7 15C7.55228 15 8 15.4477 8 16C8 16.5523 7.55228 17 7 17C6.44772 17 6 16.5523 6 16ZM14 11C13.4477 11 13 11.4477 13 12C13 12.5523 13.4477 13 14 13H18C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11H14ZM13 16C13 15.4477 13.4477 15 14 15H18C18.5523 15 19 15.4477 19 16C19 16.5523 18.5523 17 18 17H14C13.4477 17 13 16.5523 13 16Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Building4.displayName = 'Building4';

export { Building4 };
