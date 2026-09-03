import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ChevronLeft = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-chevron-left-icon' {...props} ref={ref} color={_color}>
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
            d='M14.2071 6.29289C14.5976 6.68342 14.5976 7.31658 14.2071 7.70711L9.91421 12L14.2071 16.2929C14.5976 16.6834 14.5976 17.3166 14.2071 17.7071C13.8166 18.0976 13.1834 18.0976 12.7929 17.7071L7.79289 12.7071C7.40237 12.3166 7.40237 11.6834 7.79289 11.2929L12.7929 6.29289C13.1834 5.90237 13.8166 5.90237 14.2071 6.29289Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ChevronLeft.displayName = 'ChevronLeft';

export { ChevronLeft };
