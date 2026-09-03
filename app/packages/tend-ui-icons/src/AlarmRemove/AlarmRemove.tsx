import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const AlarmRemove = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-alarm-remove-icon' {...props} ref={ref} color={_color}>
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
            d='M6.70711 2.29289C6.31658 1.90237 5.68342 1.90237 5.29289 2.29289L2.29289 5.29289C1.90237 5.68342 1.90237 6.31658 2.29289 6.70711C2.68342 7.09763 3.31658 7.09763 3.70711 6.70711L6.70711 3.70711C7.09763 3.31658 7.09763 2.68342 6.70711 2.29289ZM18.7071 2.29289C18.3166 1.90237 17.6834 1.90237 17.2929 2.29289C16.9024 2.68342 16.9024 3.31658 17.2929 3.70711L20.2929 6.70711C20.6834 7.09763 21.3166 7.09763 21.7071 6.70711C22.0976 6.31658 22.0976 5.68342 21.7071 5.29289L18.7071 2.29289ZM5 13C5 9.13401 8.13401 6 12 6C15.866 6 19 9.13401 19 13C19 16.866 15.866 20 12 20C8.13401 20 5 16.866 5 13ZM12 4C7.02944 4 3 8.02944 3 13C3 17.9706 7.02944 22 12 22C16.9706 22 21 17.9706 21 13C21 8.02944 16.9706 4 12 4ZM15 14C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12H9C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H15Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

AlarmRemove.displayName = 'AlarmRemove';

export { AlarmRemove };
