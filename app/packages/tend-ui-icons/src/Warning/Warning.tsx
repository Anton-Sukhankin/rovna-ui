import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Warning = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-warning-icon' {...props} ref={ref} color={_color}>
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
            d='M13.7431 4.05915C12.9785 2.69984 11.0214 2.69985 10.2568 4.05915L2.96667 17.0194C2.21674 18.3526 3.18016 19.9999 4.70982 19.9999H19.2901C20.8198 19.9999 21.7832 18.3526 21.0333 17.0194L13.7431 4.05915ZM12 5.03967L19.2901 17.9999L4.70982 17.9999L12 5.03967ZM12 9C12.5523 9 13 9.44772 13 10V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V10C11 9.44772 11.4477 9 12 9ZM13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Warning.displayName = 'Warning';

export { Warning };
