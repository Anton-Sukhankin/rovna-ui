import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Group1 = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-group-1-icon' {...props} ref={ref} color={_color}>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M7 8C7 7.44772 7.44772 7 8 7H10C10.5523 7 11 7.44772 11 8V10C11 10.5523 10.5523 11 10 11H8C7.44772 11 7 10.5523 7 10V8Z'
            fill='currentColor'
          />
          <path
            d='M8 13C7.44772 13 7 13.4477 7 14V16C7 16.5523 7.44772 17 8 17H10C10.5523 17 11 16.5523 11 16V14C11 13.4477 10.5523 13 10 13H8Z'
            fill='currentColor'
          />
          <path
            d='M13 8C13 7.44772 13.4477 7 14 7H16C16.5523 7 17 7.44772 17 8V10C17 10.5523 16.5523 11 16 11H14C13.4477 11 13 10.5523 13 10V8Z'
            fill='currentColor'
          />
          <path
            d='M14 13C13.4477 13 13 13.4477 13 14V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V14C17 13.4477 16.5523 13 16 13H14Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M7 3C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V7C21 4.79086 19.2091 3 17 3H7ZM17 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19H17C18.1046 19 19 18.1046 19 17V7C19 5.89543 18.1046 5 17 5Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Group1.displayName = 'Group1';

export { Group1 };
