import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Sync = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-sync-icon' {...props} ref={ref} color={_color}>
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
            d='M12 5C8.13401 5 5 8.13401 5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 7.02944 7.02944 3 12 3C14.3057 3 16.4083 3.8673 18 5.29188V4C18 3.44772 18.4477 3 19 3C19.5523 3 20 3.44772 20 4V8C20 8.55228 19.5523 9 19 9H18.9489C18.9367 9.00022 18.9246 9.00022 18.9125 9H15C14.4477 9 14 8.55228 14 8C14 7.44772 14.4477 7 15 7H16.8992C15.636 5.76201 13.9066 5 12 5ZM20 11C20.5523 11 21 11.4477 21 12C21 16.9706 16.9706 21 12 21C9.69428 21 7.59169 20.1327 6 18.7081L6 20C6 20.5523 5.55228 21 5 21C4.44772 21 4 20.5523 4 20L4 16.001C4 16.0007 4 16.0003 4 16C4 15.4477 4.44772 15 5 15H5.05111C5.06327 14.9998 5.07541 14.9998 5.08754 15H9C9.55228 15 10 15.4477 10 16C10 16.5523 9.55228 17 9 17H7.10082C8.36405 18.238 10.0934 19 12 19C15.866 19 19 15.866 19 12C19 11.4477 19.4477 11 20 11Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Sync.displayName = 'Sync';

export { Sync };
