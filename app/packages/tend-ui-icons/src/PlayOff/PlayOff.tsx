import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const PlayOff = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-play-off-icon' {...props} ref={ref} color={_color}>
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
            d='M2.70711 2.29289C2.31658 1.90237 1.68342 1.90237 1.29289 2.29289C0.902369 2.68342 0.902369 3.31658 1.29289 3.70711L7 9.41421V17.0001C7 17.3636 7.19728 17.6985 7.51523 17.8748C7.83319 18.051 8.22173 18.0408 8.53 17.8481L12.7786 15.1928L20.2929 22.7071C20.6834 23.0976 21.3166 23.0976 21.7071 22.7071C22.0976 22.3166 22.0976 21.6834 21.7071 21.2929L2.70711 2.29289ZM11.3272 13.7414L9 11.4142V15.1959L11.3272 13.7414ZM16.53 12.8481L16.0575 13.1434L9.95991 7.04582L16.53 11.1521C16.8224 11.3349 17 11.6553 17 12.0001C17 12.3449 16.8224 12.6654 16.53 12.8481Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

PlayOff.displayName = 'PlayOff';

export { PlayOff };
