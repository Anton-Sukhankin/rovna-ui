import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const SortAltOff = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-sort-alt-off-icon' {...props} ref={ref} color={_color}>
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
            d='M2.70711 2.29289C2.31658 1.90237 1.68342 1.90237 1.29289 2.29289C0.902369 2.68342 0.902369 3.31658 1.29289 3.70711L3.64909 6.0633C3.2699 6.20542 3 6.57119 3 7C3 7.55228 3.44772 8 4 8H5.58579L8.58579 11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H10.5858L20.2929 22.7071C20.6834 23.0976 21.3166 23.0976 21.7071 22.7071C22.0976 22.3166 22.0976 21.6834 21.7071 21.2929L2.70711 2.29289ZM9.41421 6L11.4142 8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H9.41421ZM4 16C3.44772 16 3 16.4477 3 17C3 17.5523 3.44772 18 4 18H6C6.55228 18 7 17.5523 7 17C7 16.4477 6.55228 16 6 16H4Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

SortAltOff.displayName = 'SortAltOff';

export { SortAltOff };
