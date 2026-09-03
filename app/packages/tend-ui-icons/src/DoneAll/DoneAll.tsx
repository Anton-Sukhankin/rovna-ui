import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const DoneAll = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-done-all-icon' {...props} ref={ref} color={_color}>
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
            d='M16.7071 7.70711C17.0976 7.31658 17.0976 6.68342 16.7071 6.29289C16.3166 5.90237 15.6834 5.90237 15.2929 6.29289L11.2929 10.2929C10.9024 10.6834 10.9024 11.3166 11.2929 11.7071C11.6834 12.0976 12.3166 12.0976 12.7071 11.7071L16.7071 7.70711ZM3.70711 11.2929C3.31658 10.9024 2.68342 10.9024 2.29289 11.2929C1.90237 11.6834 1.90237 12.3166 2.29289 12.7071L6.29289 16.7071C6.68342 17.0976 7.31658 17.0976 7.70711 16.7071C8.09763 16.3166 8.09763 15.6834 7.70711 15.2929L3.70711 11.2929ZM21.7071 7.70711C22.0976 7.31658 22.0976 6.68342 21.7071 6.29289C21.3166 5.90237 20.6834 5.90237 20.2929 6.29289L12 14.5858L8.70711 11.2929C8.31658 10.9024 7.68342 10.9024 7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071L11.2929 16.7071C11.6834 17.0976 12.3166 17.0976 12.7071 16.7071L21.7071 7.70711Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

DoneAll.displayName = 'DoneAll';

export { DoneAll };
