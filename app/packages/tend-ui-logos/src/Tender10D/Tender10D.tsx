import React from 'react';
import { useColor, useColors } from '@rovna-ui/theme';

import { Icon, IconProps } from '../Icon';

const Tender10D = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ size = 20, color, ...props }, ref) => {
    const _color = useColor(color, useColors().blue600);

    return (
      <Icon
        data-testid='rovna-ui-tender-10-d-icon'
        {...props}
        ref={ref}
        size={size}
        color={_color}
      >
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 20 20'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M7.5 18.75H1.25V16.875H7.5V18.75Z' fill='currentColor' />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M18.5956 7.43988L15.502 10.5334L19.0375 14.0689L17.7118 15.3949L14.1763 11.8594L9.93988 16.0956L3.18146 9.33716L11.8372 0.681152L18.5956 7.43988ZM5.83282 9.33716L9.93988 13.4439L11.3953 11.9888L7.28821 7.88177L5.83282 9.33716ZM8.3017 6.86859L12.4084 10.9753L15.9439 7.43988L11.8372 3.33282L8.3017 6.86859Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Tender10D.displayName = 'Tender10D';

export { Tender10D };
