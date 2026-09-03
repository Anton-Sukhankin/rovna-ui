import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const SortDescendingAlt = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-sort-descending-alt-icon'
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
            d='M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM3 12C3 11.4477 3.44772 11 4 11H14C14.5523 11 15 11.4477 15 12C15 12.5523 14.5523 13 14 13H4C3.44772 13 3 12.5523 3 12ZM4 16C3.44772 16 3 16.4477 3 17C3 17.5523 3.44772 18 4 18H6C6.55228 18 7 17.5523 7 17C7 16.4477 6.55228 16 6 16H4Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

SortDescendingAlt.displayName = 'SortDescendingAlt';

export { SortDescendingAlt };
