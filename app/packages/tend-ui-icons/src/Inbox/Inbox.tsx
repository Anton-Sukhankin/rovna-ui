import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Inbox = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-inbox-icon' {...props} ref={ref} color={_color}>
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
            d='M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM5 6C5 5.44772 5.44772 5 6 5H18C18.5523 5 19 5.44772 19 6V14H16H15C14.7912 14 14.5973 14.064 14.4369 14.1735C14.1521 14.3549 13.9219 14.655 13.7555 14.959C13.4159 15.5793 12.7571 16 12 16C11.2429 16 10.5841 15.5793 10.2445 14.959C10.078 14.655 9.84791 14.3549 9.56307 14.1735C9.4027 14.064 9.20882 14 9 14H8H5V6ZM5 16V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V16H15.4649C14.7733 17.1956 13.4806 18 12 18C10.5194 18 9.22675 17.1956 8.53513 16H5Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Inbox.displayName = 'Inbox';

export { Inbox };
