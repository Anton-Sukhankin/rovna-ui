import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Save = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-save-icon' {...props} ref={ref} color={_color}>
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
            d='M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H16H8H6C4.34315 21 3 19.6569 3 18V6ZM9 19H15V14H9V19ZM17 19V14C17 12.8954 16.1046 12 15 12H9C7.89543 12 7 12.8954 7 14V19H6C5.44772 19 5 18.5523 5 18V6C5 5.44772 5.44772 5 6 5H8V6C8 7.10457 8.89543 8 10 8H14C15.1046 8 16 7.10457 16 6V5H18C18.5523 5 19 5.44772 19 6V18C19 18.5523 18.5523 19 18 19H17Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Save.displayName = 'Save';

export { Save };
