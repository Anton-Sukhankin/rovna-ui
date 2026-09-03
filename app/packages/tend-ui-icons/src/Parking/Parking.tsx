import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Parking = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-parking-icon' {...props} ref={ref} color={_color}>
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
            d='M8 3H13C16.3137 3 19 5.68629 19 9C19 12.3137 16.3137 15 13 15H10V19C10 20.1046 9.10457 21 8 21C6.89543 21 6 20.1046 6 19V5C6 3.89543 6.89543 3 8 3ZM10 11H13C14.1046 11 15 10.1046 15 9C15 7.89543 14.1046 7 13 7H10V11Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Parking.displayName = 'Parking';

export { Parking };
