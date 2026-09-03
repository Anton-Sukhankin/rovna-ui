import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Repeat = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-repeat-icon' {...props} ref={ref} color={_color}>
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
            d='M7.20711 2.79289C7.59763 3.18342 7.59763 3.81658 7.20711 4.20711L6.41421 5H17C19.2091 5 21 6.79086 21 9V11C21 11.5523 20.5523 12 20 12C19.4477 12 19 11.5523 19 11V9C19 7.89543 18.1046 7 17 7H6.41421L7.20711 7.79289C7.59763 8.18342 7.59763 8.81658 7.20711 9.20711C6.81658 9.59763 6.18342 9.59763 5.79289 9.20711L3.29289 6.70711C2.90237 6.31658 2.90237 5.68342 3.29289 5.29289L5.79289 2.79289C6.18342 2.40237 6.81658 2.40237 7.20711 2.79289ZM5 13V15C5 16.1046 5.89543 17 7 17H17.5858L16.7929 16.2071C16.4024 15.8166 16.4024 15.1834 16.7929 14.7929C17.1834 14.4024 17.8166 14.4024 18.2071 14.7929L20.7071 17.2929C21.0976 17.6834 21.0976 18.3166 20.7071 18.7071L18.2071 21.2071C17.8166 21.5976 17.1834 21.5976 16.7929 21.2071C16.4024 20.8166 16.4024 20.1834 16.7929 19.7929L17.5858 19H7C4.79086 19 3 17.2091 3 15V13C3 12.4477 3.44772 12 4 12C4.55228 12 5 12.4477 5 13Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Repeat.displayName = 'Repeat';

export { Repeat };
