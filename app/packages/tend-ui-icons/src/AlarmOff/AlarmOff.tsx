import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const AlarmOff = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-alarm-off-icon' {...props} ref={ref} color={_color}>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect width='24' height='24' fill='transparent' />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M2.70711 2.29289C2.31658 1.90237 1.68342 1.90237 1.29289 2.29289C0.902369 2.68342 0.902369 3.31658 1.29289 3.70711L2.58579 5L2.29289 5.29289C1.90237 5.68342 1.90237 6.31658 2.29289 6.70711C2.68342 7.09763 3.31658 7.09763 3.70711 6.70711L4 6.41421L4.9681 7.38231C3.73647 8.92199 3 10.875 3 13C3 17.9706 7.02944 22 12 22C14.125 22 16.078 21.2635 17.6177 20.0319L20.2929 22.7071C20.6834 23.0976 21.3166 23.0976 21.7071 22.7071C22.0976 22.3166 22.0976 21.6834 21.7071 21.2929L2.70711 2.29289ZM16.1922 18.6064L6.39362 8.80783C5.5184 9.97641 5 11.4277 5 13C5 16.866 8.13401 20 12 20C13.5723 20 15.0236 19.4816 16.1922 18.6064ZM7.90014 4.98593L9.40927 6.49506C10.2106 6.17564 11.0848 6 12 6C15.866 6 19 9.13401 19 13C19 13.9152 18.8244 14.7894 18.5049 15.5907L20.0141 17.0999C20.6444 15.8703 21 14.4767 21 13C21 8.02944 16.9706 4 12 4C10.5233 4 9.12971 4.35563 7.90014 4.98593ZM17.2929 2.29289C17.6834 1.90237 18.3166 1.90237 18.7071 2.29289L21.7071 5.29289C22.0976 5.68342 22.0976 6.31658 21.7071 6.70711C21.3166 7.09763 20.6834 7.09763 20.2929 6.70711L17.2929 3.70711C16.9024 3.31658 16.9024 2.68342 17.2929 2.29289Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

AlarmOff.displayName = 'AlarmOff';

export { AlarmOff };
