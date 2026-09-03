import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Chart = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-chart-icon' {...props} ref={ref} color={_color}>
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
            d='M5 4C5 3.44772 4.55228 3 4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20C21 19.4477 20.5523 19 20 19H5V4ZM20.8944 4.44743C21.1414 3.95345 20.9412 3.35278 20.4472 3.10579C19.9532 2.8588 19.3526 3.05903 19.1056 3.55301L15.1122 11.5398L11.5547 9.16817C11.316 9.00906 11.0206 8.9601 10.7433 9.03372C10.4661 9.10734 10.2338 9.29646 10.1056 9.55301L7.10557 15.553C6.85859 16.047 7.05881 16.6477 7.55279 16.8946C8.04677 17.1416 8.64744 16.9414 8.89443 16.4474L11.3878 11.4606L14.9453 13.8323C15.184 13.9914 15.4794 14.0403 15.7567 13.9667C16.0339 13.8931 16.2662 13.704 16.3944 13.4474L20.8944 4.44743Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Chart.displayName = 'Chart';

export { Chart };
