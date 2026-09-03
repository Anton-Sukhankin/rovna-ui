import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const AlarmAdd = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-alarm-add-icon' {...props} ref={ref} color={_color}>
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
            d='M5.29289 2.29289C5.68342 1.90237 6.31658 1.90237 6.70711 2.29289C7.09763 2.68342 7.09763 3.31658 6.70711 3.70711L3.70711 6.70711C3.31658 7.09763 2.68342 7.09763 2.29289 6.70711C1.90237 6.31658 1.90237 5.68342 2.29289 5.29289L5.29289 2.29289ZM17.2929 2.29289C17.6834 1.90237 18.3166 1.90237 18.7071 2.29289L21.7071 5.29289C22.0976 5.68342 22.0976 6.31658 21.7071 6.70711C21.3166 7.09763 20.6834 7.09763 20.2929 6.70711L17.2929 3.70711C16.9024 3.31658 16.9024 2.68342 17.2929 2.29289ZM12 6C8.13401 6 5 9.13401 5 13C5 16.866 8.13401 20 12 20C15.866 20 19 16.866 19 13C19 9.13401 15.866 6 12 6ZM3 13C3 8.02944 7.02944 4 12 4C16.9706 4 21 8.02944 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13ZM12 9C12.5523 9 13 9.44772 13 10V12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V14H9C8.44772 14 8 13.5523 8 13C8 12.4477 8.44772 12 9 12H11V10C11 9.44772 11.4477 9 12 9Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

AlarmAdd.displayName = 'AlarmAdd';

export { AlarmAdd };
