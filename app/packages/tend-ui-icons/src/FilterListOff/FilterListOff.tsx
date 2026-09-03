import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FilterListOff = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-filter-list-off-icon'
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
            d='M2.70711 2.29289C2.31658 1.90237 1.68342 1.90237 1.29289 2.29289C0.902369 2.68342 0.902369 3.31658 1.29289 3.70711L3.64909 6.0633C3.2699 6.20542 3 6.57119 3 7C3 7.55228 3.44772 8 4 8H5.58579L8.58579 11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H10.5858L20.2929 22.7071C20.6834 23.0976 21.3166 23.0976 21.7071 22.7071C22.0976 22.3166 22.0976 21.6834 21.7071 21.2929L2.70711 2.29289ZM14.4142 11L16.4142 13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H14.4142ZM9.41421 6L11.4142 8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H9.41421ZM11 16C10.4477 16 10 16.4477 10 17C10 17.5523 10.4477 18 11 18H13C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16H11Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FilterListOff.displayName = 'FilterListOff';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
FilterListOff.__DEPRECATED = 'SortOff';

export { FilterListOff };
