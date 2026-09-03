import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const SortAscendingAlt = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-sort-ascending-alt-icon'
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
            d='M3 17C3 17.5523 3.44772 18 4 18H20C20.5523 18 21 17.5523 21 17C21 16.4477 20.5523 16 20 16H4C3.44772 16 3 16.4477 3 17ZM3 12C3 12.5523 3.44772 13 4 13H14C14.5523 13 15 12.5523 15 12C15 11.4477 14.5523 11 14 11H4C3.44772 11 3 11.4477 3 12ZM4 8C3.44772 8 3 7.55229 3 7C3 6.44771 3.44772 6 4 6H6C6.55228 6 7 6.44771 7 7C7 7.55229 6.55228 8 6 8H4Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

SortAscendingAlt.displayName = 'SortAscendingAlt';

export { SortAscendingAlt };
