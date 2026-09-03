import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const TV = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-tv-icon' {...props} ref={ref} color={_color}>
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
            d='M2 6C2 4.34315 3.34315 3 5 3H19C20.6569 3 22 4.34315 22 6V15C22 16.6569 20.6569 18 19 18H18.3874L18.9487 19.6838C19.1233 20.2077 18.8401 20.7741 18.3162 20.9487C17.7923 21.1234 17.2259 20.8402 17.0513 20.3163L16.2792 18H7.7208L6.94871 20.3163C6.77406 20.8402 6.20774 21.1234 5.6838 20.9487C5.15986 20.7741 4.8767 20.2077 5.05134 19.6838L5.61261 18H5C3.34315 18 2 16.6569 2 15V6ZM17.0221 16C17.0075 15.9997 16.9928 15.9997 16.9781 16H7.0219C7.00719 15.9997 6.99251 15.9997 6.97787 16H5C4.44772 16 4 15.5523 4 15V6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6V15C20 15.5523 19.5523 16 19 16H17.0221Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

TV.displayName = 'TV';

export { TV };
