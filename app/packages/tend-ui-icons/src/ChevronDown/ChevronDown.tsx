import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ChevronDown = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-chevron-down-icon' {...props} ref={ref} color={_color}>
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
            d='M6.29289 9.79289C6.68342 9.40237 7.31658 9.40237 7.70711 9.79289L12 14.0858L16.2929 9.79289C16.6834 9.40237 17.3166 9.40237 17.7071 9.79289C18.0976 10.1834 18.0976 10.8166 17.7071 11.2071L12.7071 16.2071C12.3166 16.5976 11.6834 16.5976 11.2929 16.2071L6.29289 11.2071C5.90237 10.8166 5.90237 10.1834 6.29289 9.79289Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ChevronDown.displayName = 'ChevronDown';

export { ChevronDown };
