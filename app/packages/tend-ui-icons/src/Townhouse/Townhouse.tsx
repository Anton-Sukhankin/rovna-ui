import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Townhouse = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-townhouse-icon' {...props} ref={ref} color={_color}>
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
            d='M9.4453 3.16795C9.7812 2.94402 10.2188 2.94402 10.5547 3.16795L16.5547 7.16795C16.8329 7.35342 17 7.66565 17 8V12.0001H19C20.1046 12.0001 21 12.8956 21 14.0001V20.0001C21 20.5524 20.5523 21.0001 20 21.0001H15H12.0099L12 21.0002H4C3.44772 21.0002 3 20.5525 3 20.0002V8C3 7.66565 3.1671 7.35342 3.4453 7.16795L9.4453 3.16795ZM16 19.0001V17.0001C16 16.4478 15.5523 16.0001 15 16.0001C14.4477 16.0001 14 16.4478 14 17.0001V19.0001H11V14.0001H19V19.0001H16ZM15 8.53518V12.0001H11C9.89543 12.0001 9 12.8956 9 14.0001V19.0001V19.0002H5V8.53518L10 5.20185L15 8.53518Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Townhouse.displayName = 'Townhouse';

export { Townhouse };
