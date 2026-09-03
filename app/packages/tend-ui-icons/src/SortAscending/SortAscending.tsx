import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const SortAscending = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-sort-ascending-icon' {...props} ref={ref} color={_color}>
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
            d='M21 17C21 17.5523 20.5523 18 20 18H4C3.44772 18 3 17.5523 3 17C3 16.4477 3.44772 16 4 16H20C20.5523 16 21 16.4477 21 17ZM18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12ZM13 8C13.5523 8 14 7.55229 14 7C14 6.44771 13.5523 6 13 6H11C10.4477 6 10 6.44771 10 7C10 7.55229 10.4477 8 11 8H13Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

SortAscending.displayName = 'SortAscending';

export { SortAscending };
