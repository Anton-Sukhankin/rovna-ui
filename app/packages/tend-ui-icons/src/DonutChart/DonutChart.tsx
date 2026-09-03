import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const DonutChart = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-donut-chart-icon' {...props} ref={ref} color={_color}>
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
            d='M1.5 12.0001C1.5 6.53841 5.67007 2.05068 11 1.54712V4.5662C7.33064 5.0551 4.5 8.19704 4.5 12.0001C4.5 15.8032 7.33064 18.9451 11 19.434V22.4531C5.67007 21.9496 1.5 17.4618 1.5 12.0001ZM19.4339 13C18.9887 16.3423 16.3423 18.9887 13 19.434V22.4531C18.0008 21.9807 21.9806 18.0008 22.453 13H19.4339ZM19.4339 11H22.453C21.9805 5.99927 18.0007 2.01958 13 1.54712V4.5662C16.3422 5.0115 18.9885 7.65783 19.4339 11Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

DonutChart.displayName = 'DonutChart';

export { DonutChart };
