import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FilterAlt = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-filter-alt-icon' {...props} ref={ref} color={_color}>
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
            d='M5.00001 4C4.61807 4 4.2695 4.21755 4.10169 4.56065C3.93389 4.90375 3.97617 5.31246 4.21066 5.61394L10 13.0574V19C10 19.5523 10.4477 20 11 20H13C13.5523 20 14 19.5523 14 19V13.0574L19.7894 5.61394C20.0238 5.31246 20.0661 4.90375 19.8983 4.56065C19.7305 4.21755 19.3819 4 19 4H5.00001ZM12 12.3712L7.04465 6H16.9554L12 12.3712Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FilterAlt.displayName = 'FilterAlt';

export { FilterAlt };
