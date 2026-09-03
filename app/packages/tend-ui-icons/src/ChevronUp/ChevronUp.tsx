import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ChevronUp = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-chevron-up-icon' {...props} ref={ref} color={_color}>
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
            d='M17.7071 14.2071C17.3166 14.5976 16.6834 14.5976 16.2929 14.2071L12 9.91421L7.70711 14.2071C7.31658 14.5976 6.68342 14.5976 6.29289 14.2071C5.90237 13.8166 5.90237 13.1834 6.29289 12.7929L11.2929 7.79289C11.6834 7.40237 12.3166 7.40237 12.7071 7.79289L17.7071 12.7929C18.0976 13.1834 18.0976 13.8166 17.7071 14.2071Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ChevronUp.displayName = 'ChevronUp';

export { ChevronUp };
