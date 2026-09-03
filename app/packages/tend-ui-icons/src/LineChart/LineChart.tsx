import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const LineChart = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-line-chart-icon' {...props} ref={ref} color={_color}>
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
            d='M21.7071 4.70711C22.0976 4.31658 22.0976 3.68342 21.7071 3.29289C21.3166 2.90237 20.6834 2.90237 20.2929 3.29289L13 10.5858L9 6.58579L2.29289 13.2929C1.90237 13.6834 1.90237 14.3166 2.29289 14.7071C2.68342 15.0976 3.31658 15.0976 3.70711 14.7071L9 9.41421L13 13.4142L21.7071 4.70711ZM21.7071 10.7071C22.0976 10.3166 22.0976 9.68342 21.7071 9.29289C21.3166 8.90237 20.6834 8.90237 20.2929 9.29289L13 16.5858L9 12.5858L2.29289 19.2929C1.90237 19.6834 1.90237 20.3166 2.29289 20.7071C2.68342 21.0976 3.31658 21.0976 3.70711 20.7071L9 15.4142L13 19.4142L21.7071 10.7071Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

LineChart.displayName = 'LineChart';

export { LineChart };
