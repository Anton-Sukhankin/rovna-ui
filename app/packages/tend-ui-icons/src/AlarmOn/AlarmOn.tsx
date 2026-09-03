import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const AlarmOn = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-alarm-on-icon' {...props} ref={ref} color={_color}>
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
            d='M6.70711 2.29289C6.31658 1.90237 5.68342 1.90237 5.29289 2.29289L2.29289 5.29289C1.90237 5.68342 1.90237 6.31658 2.29289 6.70711C2.68342 7.09763 3.31658 7.09763 3.70711 6.70711L6.70711 3.70711C7.09763 3.31658 7.09763 2.68342 6.70711 2.29289ZM18.7071 2.29289C18.3166 1.90237 17.6834 1.90237 17.2929 2.29289C16.9024 2.68342 16.9024 3.31658 17.2929 3.70711L20.2929 6.70711C20.6834 7.09763 21.3166 7.09763 21.7071 6.70711C22.0976 6.31658 22.0976 5.68342 21.7071 5.29289L18.7071 2.29289ZM5 13C5 9.13401 8.13401 6 12 6C15.866 6 19 9.13401 19 13C19 16.866 15.866 20 12 20C8.13401 20 5 16.866 5 13ZM12 4C7.02944 4 3 8.02944 3 13C3 17.9706 7.02944 22 12 22C16.9706 22 21 17.9706 21 13C21 8.02944 16.9706 4 12 4ZM15.7071 11.7071C16.0976 11.3166 16.0976 10.6834 15.7071 10.2929C15.3166 9.90237 14.6834 9.90237 14.2929 10.2929L11 13.5858L9.70711 12.2929C9.31658 11.9024 8.68342 11.9024 8.29289 12.2929C7.90237 12.6834 7.90237 13.3166 8.29289 13.7071L10.2929 15.7071C10.6834 16.0976 11.3166 16.0976 11.7071 15.7071L15.7071 11.7071Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

AlarmOn.displayName = 'AlarmOn';

export { AlarmOn };
