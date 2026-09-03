import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const SliderHorizontal = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-slider-horizontal-icon'
        {...props}
        ref={ref}
        color={_color}
      >
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
            d='M6 5C6 3.89543 6.89543 3 8 3H16C17.1046 3 18 3.89543 18 5V6H20C21.1046 6 22 6.89543 22 8V16C22 17.1046 21.1046 18 20 18H18V19C18 20.1046 17.1046 21 16 21H8C6.89543 21 6 20.1046 6 19V18H4C2.89543 18 2 17.1046 2 16V8C2 6.89543 2.89543 6 4 6H6V5ZM6 8H4V16H6V8ZM18 16V8H20V16H18ZM16 5H8V19H16V5Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

SliderHorizontal.displayName = 'SliderHorizontal';

export { SliderHorizontal };
