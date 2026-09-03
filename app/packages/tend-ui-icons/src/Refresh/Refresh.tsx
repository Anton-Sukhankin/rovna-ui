import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Refresh = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-refresh-icon' {...props} ref={ref} color={_color}>
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
            d='M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C14.7165 18 17.0138 16.1939 17.7517 13.7148C17.9092 13.1854 18.466 12.884 18.9954 13.0415C19.5247 13.1991 19.8261 13.7559 19.6686 14.2853C18.6853 17.5891 15.6255 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C14.3902 4 16.5345 5.04786 18 6.70863V5C18 4.44772 18.4477 4 19 4C19.5523 4 20 4.44772 20 5V10C20 10.5523 19.5523 11 19 11H18.7325C18.7173 11.0004 18.7021 11.0003 18.6869 11L14 11C13.4477 11 13 10.5523 13 10C13 9.44771 13.4477 9 14 9L17.1976 9C16.1599 7.20612 14.2199 6 12 6Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Refresh.displayName = 'Refresh';

export { Refresh };
