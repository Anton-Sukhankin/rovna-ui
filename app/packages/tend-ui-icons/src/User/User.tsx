import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const User = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-user-icon' {...props} ref={ref} color={_color}>
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
            d='M10 8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8C14 9.10457 13.1046 10 12 10C10.8954 10 10 9.10457 10 8ZM12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4ZM12 13C8.42669 13 6.23403 13.9698 5.13193 14.6594C4.31691 15.1694 4 16.0497 4 16.8284V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V16.8284C20 16.0497 19.6831 15.1694 18.8681 14.6594C17.766 13.9698 15.5733 13 12 13ZM6.19282 16.3548C6.98359 15.86 8.80975 15 12 15C15.1902 15 17.0164 15.86 17.8072 16.3548C17.8915 16.4076 18 16.5463 18 16.8284V18H6V16.8284C6 16.5463 6.10852 16.4076 6.19282 16.3548Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

User.displayName = 'User';

export { User };
