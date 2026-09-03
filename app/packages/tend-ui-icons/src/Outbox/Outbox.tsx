import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Outbox = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-outbox-icon' {...props} ref={ref} color={_color}>
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
            d='M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6ZM6 5C5.44772 5 5 5.44772 5 6V14H8H9C9.20882 14 9.4027 14.064 9.56307 14.1735C9.84791 14.3549 10.078 14.655 10.2445 14.959C10.5841 15.5793 11.2429 16 12 16C12.7571 16 13.4159 15.5793 13.7555 14.959C13.9219 14.655 14.1521 14.3549 14.4369 14.1735C14.5973 14.064 14.7912 14 15 14H16H19V6C19 5.44772 18.5523 5 18 5H6ZM5 18V16H8.53513C9.22675 17.1956 10.5194 18 12 18C13.4806 18 14.7733 17.1956 15.4649 16H19V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18ZM8.29289 9.29289C7.90237 9.68342 7.90237 10.3166 8.29289 10.7071C8.68342 11.0976 9.31658 11.0976 9.70711 10.7071L11 9.41421L11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13L13 9.41421L14.2929 10.7071C14.6834 11.0976 15.3166 11.0976 15.7071 10.7071C16.0976 10.3166 16.0976 9.68342 15.7071 9.29289L12.7075 6.29325L12.7071 6.29289C12.5607 6.14645 12.3801 6.05492 12.191 6.01831C11.8758 5.95729 11.537 6.04882 11.2929 6.29289L8.29289 9.29289Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Outbox.displayName = 'Outbox';

export { Outbox };
