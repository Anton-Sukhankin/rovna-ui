import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Elevator = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-elevator-icon' {...props} ref={ref} color={_color}>
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
            d='M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM19 5H5V19H19V5ZM8.5 9.5C7.39543 9.5 6.5 10.3954 6.5 11.5V14C6.5 14.2761 6.72386 14.5 7 14.5H7.5V17.5C7.5 17.7761 7.72386 18 8 18H10C10.2761 18 10.5 17.7761 10.5 17.5V14.5H11C11.2761 14.5 11.5 14.2761 11.5 14V11.5C11.5 10.3954 10.6046 9.5 9.5 9.5H8.5ZM17.0809 10.2548L15.6858 7.77464C15.4946 7.43482 15.0054 7.43482 14.8142 7.77464L13.4191 10.2548C13.2316 10.5881 13.4725 10.9999 13.8549 10.9999H16.6451C17.0275 10.9999 17.2683 10.5881 17.0809 10.2548ZM15.6858 16.2254L17.0809 13.7452C17.2683 13.4119 17.0275 13.0001 16.6451 13.0001H13.8549C13.4725 13.0001 13.2316 13.4119 13.4191 13.7452L14.8142 16.2254C15.0054 16.5652 15.4946 16.5652 15.6858 16.2254ZM9 9C9.82843 9 10.5 8.32843 10.5 7.5C10.5 6.67157 9.82843 6 9 6C8.17157 6 7.5 6.67157 7.5 7.5C7.5 8.32843 8.17157 9 9 9Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Elevator.displayName = 'Elevator';

export { Elevator };
