import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Pin = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-pin-icon' {...props} ref={ref} color={_color}>
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
            d='M7 3C7 3.55228 7.44772 4 8 4L8 10.6972L6.16795 13.4453C5.96338 13.7522 5.94431 14.1467 6.11833 14.4719C6.29235 14.797 6.63121 15 7 15H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V15H17C17.3688 15 17.7077 14.797 17.8817 14.4719C18.0557 14.1467 18.0366 13.7522 17.8321 13.4453L16 10.6972L16 4C16.5523 4 17 3.55228 17 3C17 2.44772 16.5523 2 16 2H15H9H8C7.44772 2 7 2.44772 7 3ZM10 11V4H14V11C14 11.1974 14.0584 11.3904 14.168 11.5547L15.1315 13H8.86852L9.83205 11.5547C9.94156 11.3904 10 11.1974 10 11Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Pin.displayName = 'Pin';

export { Pin };
