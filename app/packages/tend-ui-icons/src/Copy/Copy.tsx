import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Copy = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-copy-icon' {...props} ref={ref} color={_color}>
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
            d='M10 2C8.34315 2 7 3.34315 7 5V7H5C3.34315 7 2 8.34315 2 10V19C2 20.6569 3.34315 22 5 22H14C15.6569 22 17 20.6569 17 19V17H19C20.6569 17 22 15.6569 22 14V5C22 3.34315 20.6569 2 19 2H10ZM17 15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7H14C15.6569 7 17 8.34315 17 10V15ZM4 10C4 9.44772 4.44772 9 5 9H14C14.5523 9 15 9.44772 15 10V19C15 19.5523 14.5523 20 14 20H5C4.44772 20 4 19.5523 4 19V10Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Copy.displayName = 'Copy';

export { Copy };
