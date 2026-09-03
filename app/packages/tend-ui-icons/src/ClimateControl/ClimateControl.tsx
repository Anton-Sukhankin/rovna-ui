import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ClimateControl = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-climate-control-icon'
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
            d='M2 5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V11C22 12.1046 21.1046 13 20 13H17H7H4C2.89543 13 2 12.1046 2 11V5ZM20 11H18V8C18 7.44772 17.5523 7 17 7H7C6.44772 7 6 7.44772 6 8V11H4V5H20V11ZM8 9V11H16V9H8ZM13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V16ZM16 15C16.5523 15 17 15.4477 17 16C17 17.6569 18.3431 19 20 19C20.5523 19 21 19.4477 21 20C21 20.5523 20.5523 21 20 21C17.2386 21 15 18.7614 15 16C15 15.4477 15.4477 15 16 15ZM7 16C7 15.4477 7.44772 15 8 15C8.55228 15 9 15.4477 9 16C9 18.7614 6.76142 21 4 21C3.44772 21 3 20.5523 3 20C3 19.4477 3.44772 19 4 19C5.65685 19 7 17.6569 7 16Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ClimateControl.displayName = 'ClimateControl';

export { ClimateControl };
