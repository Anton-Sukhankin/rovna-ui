import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const MailOff = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-mail-off-icon' {...props} ref={ref} color={_color}>
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
            d='M2.70711 2.29289C2.31658 1.90237 1.68342 1.90237 1.29289 2.29289C0.902369 2.68342 0.902369 3.31658 1.29289 3.70711L2.68165 5.09586C2.25572 5.61383 2 6.27705 2 7V17C2 18.6569 3.34315 20 5 20H17.5858L20.2929 22.7071C20.6834 23.0976 21.3166 23.0976 21.7071 22.7071C22.0976 22.3166 22.0976 21.6834 21.7071 21.2929L2.70711 2.29289ZM15.5858 18L7.34339 9.7576L4 7.25006V17C4 17.5523 4.44772 18 5 18H15.5858ZM18.3334 6L12.951 10.0368L14.3796 11.4654L20 7.25006V17C20 17.0278 19.9989 17.0553 19.9967 17.0824L21.5289 18.6146C21.8271 18.1485 22 17.5944 22 17V7C22 5.34315 20.6569 4 19 4H6.91421L8.91421 6H18.3334Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

MailOff.displayName = 'MailOff';

export { MailOff };
