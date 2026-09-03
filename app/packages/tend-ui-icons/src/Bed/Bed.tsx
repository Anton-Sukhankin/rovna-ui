import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Bed = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-bed-icon' {...props} ref={ref} color={_color}>
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
            d='M3 8C3 6.34315 4.34315 5 6 5H10C10.7684 5 11.4692 5.28885 12 5.7639C12.5308 5.28885 13.2316 5 14 5H18C19.6569 5 21 6.34315 21 8V10.7639C21.6137 11.3132 22 12.1115 22 13V16V18C22 18.5523 21.5523 19 21 19C20.4477 19 20 18.5523 20 18V17H4V18C4 18.5523 3.55228 19 3 19C2.44772 19 2 18.5523 2 18V16V13C2 12.1115 2.38625 11.3132 3 10.7639V8ZM19 12H13H11H5C4.44772 12 4 12.4477 4 13V15H20V13C20 12.4477 19.5523 12 19 12ZM11 10V8C11 7.44772 10.5523 7 10 7H6C5.44772 7 5 7.44772 5 8V10H11ZM13 8V10H19V8C19 7.44772 18.5523 7 18 7H14C13.4477 7 13 7.44772 13 8Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Bed.displayName = 'Bed';

export { Bed };
