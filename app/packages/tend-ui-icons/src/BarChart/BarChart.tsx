import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const BarChart = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-bar-chart-icon' {...props} ref={ref} color={_color}>
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
            d='M10 5C10 4.44772 10.4477 4 11 4H13C13.5523 4 14 4.44772 14 5V19C14 19.5523 13.5523 20 13 20H11C10.4477 20 10 19.5523 10 19V5ZM4 10C4 9.44771 4.44772 9 5 9H7C7.55228 9 8 9.44772 8 10V19C8 19.5523 7.55228 20 7 20H5C4.44772 20 4 19.5523 4 19V10ZM17 13C16.4477 13 16 13.4477 16 14V19C16 19.5523 16.4477 20 17 20H19C19.5523 20 20 19.5523 20 19V14C20 13.4477 19.5523 13 19 13H17Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

BarChart.displayName = 'BarChart';

export { BarChart };
