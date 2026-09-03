import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Building2 = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-building-2-icon' {...props} ref={ref} color={_color}>
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
            d='M2 6C2 4.34315 3.34315 3 5 3H11C12.6569 3 14 4.34315 14 6V19H18V16.8293C16.8348 16.4175 16 15.3062 16 14V11C16 9.34315 17.3431 8 19 8C20.6569 8 22 9.34315 22 11V14C22 15.3062 21.1652 16.4175 20 16.8293V19H21C21.5523 19 22 19.4477 22 20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V6ZM12 6V19H9V16C9 15.4477 8.55228 15 8 15C7.44772 15 7 15.4477 7 16V19H4V6C4 5.44772 4.44772 5 5 5H11C11.5523 5 12 5.44772 12 6ZM19 10C18.4477 10 18 10.4477 18 11V14C18 14.5523 18.4477 15 19 15C19.5523 15 20 14.5523 20 14V11C20 10.4477 19.5523 10 19 10ZM6 8C6 7.44772 6.44772 7 7 7H9C9.55228 7 10 7.44772 10 8C10 8.55228 9.55228 9 9 9H7C6.44772 9 6 8.55228 6 8ZM7 10C6.44772 10 6 10.4477 6 11C6 11.5523 6.44772 12 7 12H9C9.55228 12 10 11.5523 10 11C10 10.4477 9.55228 10 9 10H7Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Building2.displayName = 'Building2';

export { Building2 };
