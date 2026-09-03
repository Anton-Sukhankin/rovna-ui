import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Plan = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-plan-icon' {...props} ref={ref} color={_color}>
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
            d='M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H7C7.55228 21 8 20.5523 8 20C8 19.4477 7.55228 19 7 19H5L5 11L12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9L5 9V5H19V9H17C16.4477 9 16 9.44772 16 10C16 10.5523 16.4477 11 17 11H19V19H13L13 14C13 13.4477 12.5523 13 12 13C11.4477 13 11 13.4477 11 14L11 20C11 20.5523 11.4477 21 12 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Plan.displayName = 'Plan';

export { Plan };
