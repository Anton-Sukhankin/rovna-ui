import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const UserOff = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-user-off-icon' {...props} ref={ref} color={_color}>
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
            d='M2.70711 2.29289C2.31658 1.90237 1.68342 1.90237 1.29289 2.29289C0.902369 2.68342 0.902369 3.31658 1.29289 3.70711L10.6352 13.0494C7.85777 13.2553 6.08612 14.0623 5.13193 14.6594C4.31691 15.1694 4 16.0497 4 16.8284V18C4 19.1046 4.89543 20 6 20H17.5858L20.2929 22.7071C20.6834 23.0976 21.3166 23.0976 21.7071 22.7071C22.0976 22.3166 22.0976 21.6834 21.7071 21.2929L2.70711 2.29289ZM15.5858 18L12.596 15.0103C12.4029 15.0035 12.2042 15 12 15C8.80975 15 6.98359 15.86 6.19282 16.3548C6.10852 16.4076 6 16.5463 6 16.8284V18H15.5858ZM14.2332 11.319C15.299 10.6005 16 9.3821 16 8C16 5.79086 14.2091 4 12 4C10.6179 4 9.39953 4.70096 8.68098 5.76676L10.1508 7.23663C10.4508 6.51076 11.1658 6 12 6C13.1046 6 14 6.89543 14 8C14 8.83423 13.4892 9.54917 12.7634 9.84915L14.2332 11.319ZM20 17.0858V16.8284C20 16.0497 19.6831 15.1694 18.8681 14.6594C18.3462 14.3329 17.5799 13.9435 16.5383 13.6241L20 17.0858Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

UserOff.displayName = 'UserOff';

export { UserOff };
