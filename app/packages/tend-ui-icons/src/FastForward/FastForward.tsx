import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FastForward = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-fast-forward-icon' {...props} ref={ref} color={_color}>
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
            d='M5.0547 7.16795C4.74784 6.96338 4.3533 6.94431 4.02814 7.11833C3.70298 7.29235 3.5 7.63121 3.5 8V16C3.5 16.3688 3.70298 16.7077 4.02814 16.8817C4.3533 17.0557 4.74784 17.0366 5.0547 16.8321L11.0547 12.8321C11.3329 12.6466 11.5 12.3344 11.5 12C11.5 11.6656 11.3329 11.3534 11.0547 11.168L5.0547 7.16795ZM5.5 14.1315V9.86852L8.69722 12L5.5 14.1315ZM14.0547 7.16795C13.7478 6.96338 13.3533 6.94431 13.0281 7.11833C12.703 7.29235 12.5 7.63121 12.5 8V16C12.5 16.3688 12.703 16.7077 13.0281 16.8817C13.3533 17.0557 13.7478 17.0366 14.0547 16.8321L20.0547 12.8321C20.3329 12.6466 20.5 12.3344 20.5 12C20.5 11.6656 20.3329 11.3534 20.0547 11.168L14.0547 7.16795ZM14.5 14.1315V9.86852L17.6972 12L14.5 14.1315Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FastForward.displayName = 'FastForward';

export { FastForward };
