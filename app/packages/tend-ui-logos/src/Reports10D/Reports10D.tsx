import React from 'react';
import { useColor, useColors } from '@rovna-ui/theme';

import { Icon, IconProps } from '../Icon';

const Reports10D = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ size = 20, color, ...props }, ref) => {
    const _color = useColor(color, useColors().blue600);

    return (
      <Icon
        data-testid='rovna-ui-reports-10-d-icon'
        {...props}
        ref={ref}
        size={size}
        color={_color}
      >
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 21 20'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M3.93465 16.5625H19.2272V18.75H1.75V1.25H3.93465V16.5625Z'
            fill='currentColor'
          />
          <path
            d='M19.25 2.34375L15.3505 9.10666L15.3586 9.11133L14.2663 11.0058L10.1271 8.61292L7.32856 13.4667L5.4366 12.373L9.32747 5.625L9.32787 5.62513L9.328 5.625L13.4585 8.01291L17.358 1.25L19.25 2.34375Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Reports10D.displayName = 'Reports10D';

export { Reports10D };
