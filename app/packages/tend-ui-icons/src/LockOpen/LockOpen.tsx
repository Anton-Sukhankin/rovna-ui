import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const LockOpen = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-lock-open-icon' {...props} ref={ref} color={_color}>
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
            d='M12 3C10.3431 3 9 4.34315 9 6V8H17C18.6569 8 20 9.34315 20 11V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V11C4 9.34315 5.34315 8 7 8V6C7 3.23858 9.23858 1 12 1C14.3312 1 16.2874 2.59442 16.8424 4.75074C16.9801 5.28559 16.6581 5.83078 16.1232 5.96844C15.5884 6.1061 15.0432 5.78411 14.9055 5.24926C14.5725 3.95512 13.3965 3 12 3ZM7 10H8H17C17.5523 10 18 10.4477 18 11V19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V11C6 10.4477 6.44772 10 7 10ZM13 13C13 12.4477 12.5523 12 12 12C11.4477 12 11 12.4477 11 13V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

LockOpen.displayName = 'LockOpen';

export { LockOpen };
