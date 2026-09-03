import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const SidebarOpen = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-sidebar-open-icon' {...props} ref={ref} color={_color}>
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
            d='M16.5 3C17.0523 3 17.5 3.44772 17.5 4V20C17.5 20.5523 17.0523 21 16.5 21C15.9477 21 15.5 20.5523 15.5 20V4C15.5 3.44772 15.9477 3 16.5 3Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L10.5858 12L6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289C6.68342 5.90237 7.31658 5.90237 7.70711 6.29289L12.7071 11.2929C13.0976 11.6834 13.0976 12.3166 12.7071 12.7071L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

SidebarOpen.displayName = 'SidebarOpen';

export { SidebarOpen };
