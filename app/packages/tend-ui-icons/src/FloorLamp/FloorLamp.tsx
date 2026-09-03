import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FloorLamp = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-floor-lamp-icon' {...props} ref={ref} color={_color}>
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
            d='M7.03848 2.72528C7.16114 2.29598 7.55353 2 8.00001 2H16C16.4465 2 16.8389 2.29598 16.9615 2.72528L18.9615 9.72528C19.0477 10.027 18.9873 10.3517 18.7984 10.6022C18.6094 10.8527 18.3138 11 18 11H13V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V11H6.00001C5.68622 11 5.39062 10.8527 5.20166 10.6022C5.0127 10.3517 4.95228 10.027 5.03848 9.72528L7.03848 2.72528ZM16.6743 9H12H7.32574L8.75431 4H15.2457L16.6743 9ZM9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22H15C15.5523 22 16 21.5523 16 21C16 20.4477 15.5523 20 15 20H9Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FloorLamp.displayName = 'FloorLamp';

export { FloorLamp };
