import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Login = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-login-icon' {...props} ref={ref} color={_color}>
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
            d='M21 6C21 4.34315 19.6569 3 18 3H13C12.4477 3 12 3.44772 12 4C12 4.55228 12.4477 5 13 5H18C18.5523 5 19 5.44772 19 6V18C19 18.5523 18.5523 19 18 19H13C12.4477 19 12 19.4477 12 20C12 20.5523 12.4477 21 13 21H18C19.6569 21 21 19.6569 21 18V6ZM3 12C3 12.5523 3.44772 13 4 13L11.5858 13L9.29289 15.2929C8.90237 15.6834 8.90237 16.3166 9.29289 16.7071C9.68342 17.0976 10.3166 17.0976 10.7071 16.7071L14.7071 12.7071C15.0976 12.3166 15.0976 11.6834 14.7071 11.2929L10.7071 7.29289C10.3166 6.90237 9.68342 6.90237 9.29289 7.29289C8.90237 7.68342 8.90237 8.31658 9.29289 8.70711L11.5858 11L4 11C3.44772 11 3 11.4477 3 12Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Login.displayName = 'Login';

export { Login };
