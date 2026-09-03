import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Archive = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-archive-icon' {...props} ref={ref} color={_color}>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9 14C9 13.4477 9.44772 13 10 13H14C14.5523 13 15 13.4477 15 14C15 14.5523 14.5523 15 14 15H10C9.44772 15 9 14.5523 9 14Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M4.00698 10.8318C2.83814 10.4219 2 9.30882 2 8V6C2 4.34315 3.34315 3 5 3H19C20.6569 3 22 4.34315 22 6V8C22 9.30883 21.1619 10.4219 19.993 10.8318C19.9976 10.8872 20 10.9433 20 11V18C20 19.6569 18.6569 21 17 21H7C5.34315 21 4 19.6569 4 18V11C4 10.9433 4.00236 10.8872 4.00698 10.8318ZM5 5H19C19.5523 5 20 5.44771 20 6V8C20 8.55228 19.5523 9 19 9H5C4.44772 9 4 8.55229 4 8V6C4 5.44772 4.44772 5 5 5ZM6 11V18C6 18.5523 6.44772 19 7 19H17C17.5523 19 18 18.5523 18 18V11H6Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Archive.displayName = 'Archive';

export { Archive };
