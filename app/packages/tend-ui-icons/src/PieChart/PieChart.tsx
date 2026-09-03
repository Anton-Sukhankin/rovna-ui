import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const PieChart = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-pie-chart-icon' {...props} ref={ref} color={_color}>
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
            d='M13 11V4.06189C16.6187 4.51314 19.4869 7.38128 19.9381 11H13ZM11 12V4.06189C7.05369 4.55399 4 7.92038 4 12C4 16.0796 7.05369 19.446 11 19.9381V12ZM13 13H19.9381C19.4869 16.6187 16.6187 19.4869 13 19.9381V13ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

PieChart.displayName = 'PieChart';

export { PieChart };
