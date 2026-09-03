import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Building1 = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-building-1-icon' {...props} ref={ref} color={_color}>
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
            d='M9 4C9 3.44772 9.44771 3 10 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13H12H10C9.44772 21 9 20.5523 9 20V16H7V20C7 20.5523 6.55228 21 6 21H3C2.44772 21 2 20.5523 2 20V12C2 11.6962 2.13809 11.4089 2.3753 11.2191L7.37531 7.21913C7.74052 6.92696 8.25948 6.92696 8.62469 7.21913L9 7.51938V4ZM20 19H14V12C14 11.6962 13.8619 11.4089 13.6247 11.2191L11 9.11938V5H20V19ZM4 12.4806V19H5V15C5 14.4477 5.44772 14 6 14H10C10.5523 14 11 14.4477 11 15V19H12V12.4806L8 9.28062L4 12.4806ZM18 7H16V9H18V7ZM16 11H18V13H16V11ZM18 15H16V17H18V15Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Building1.displayName = 'Building1';

export { Building1 };
