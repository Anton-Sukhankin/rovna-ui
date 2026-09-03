import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const AccountBox = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-account-box-icon' {...props} ref={ref} color={_color}>
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
            d='M2 5C2 3.34314 3.34314 2 5 2H19C20.6569 2 22 3.34314 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34314 22 2 20.6569 2 19V5ZM5 4C4.44772 4 4 4.44771 4 5V18.4501C6.00555 16.3258 8.84796 15 12 15C15.152 15 17.9944 16.3258 20 18.4501V5C20 4.44771 19.5523 4 19 4H5ZM18.7083 20C17.0604 18.1588 14.6655 17 12 17C9.3345 17 6.93964 18.1588 5.29169 20H18.7083ZM12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8ZM8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

AccountBox.displayName = 'AccountBox';

export { AccountBox };
