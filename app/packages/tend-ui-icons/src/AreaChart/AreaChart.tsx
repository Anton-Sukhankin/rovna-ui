import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const AreaChart = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-area-chart-icon' {...props} ref={ref} color={_color}>
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
            d='M12.5145 4.14256C12.0918 3.88894 11.5474 3.98118 11.2318 4.35987L6.80704 9.66956L4.5547 8.168C4.24784 7.96343 3.8533 7.94436 3.52814 8.11838C3.20298 8.2924 3 8.63126 3 9.00005V19.0001C3 19.5523 3.44772 20.0001 4 20.0001H20C20.5523 20.0001 21 19.5523 21 19.0001V8.00005C21 7.44777 20.5523 7.00005 20 7.00005H17.277L12.5145 4.14256ZM7.76822 11.6402L12.2199 6.29819L16.4855 8.85754C16.6409 8.95079 16.8188 9.00005 17 9.00005H19V16H17L12 11L8 16.5L5 14.25V10.8686L6.4453 11.8321C6.87052 12.1156 7.44106 12.0328 7.76822 11.6402Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

AreaChart.displayName = 'AreaChart';

export { AreaChart };
