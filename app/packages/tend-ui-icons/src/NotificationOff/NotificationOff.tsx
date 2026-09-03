import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const NotificationOff = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-notification-off-icon'
        {...props}
        ref={ref}
        color={_color}
      >
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
            d='M5.36097 7.77518L1.29289 3.70711C0.902369 3.31658 0.902369 2.68342 1.29289 2.29289C1.68342 1.90237 2.31658 1.90237 2.70711 2.29289L21.7071 21.2929C22.0976 21.6834 22.0976 22.3166 21.7071 22.7071C21.3166 23.0976 20.6834 23.0976 20.2929 22.7071L17.5858 20H4C3.44772 20 3 19.5523 3 19C3 18.4477 3.44772 18 4 18H5V10C5 9.22225 5.12684 8.47412 5.36097 7.77518ZM15.5858 18H7V10C7 9.81231 7.01034 9.62703 7.03049 9.4447L15.5858 18ZM17 10V14.0858L19 16.0858V10C19 6.47353 16.3923 3.55612 13 3.07089V2C13 1.44772 12.5523 1 12 1C11.4477 1 11 1.44772 11 2V3.07089C9.69107 3.25812 8.49896 3.80745 7.52838 4.61417L8.95107 6.03686C9.79495 5.38668 10.8523 5 12 5C14.7614 5 17 7.23858 17 10ZM10 21C10 22.1046 10.8954 23 12 23C13.1046 23 14 22.1046 14 21H10Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

NotificationOff.displayName = 'NotificationOff';

export { NotificationOff };
