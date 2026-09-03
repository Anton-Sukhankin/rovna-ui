import React from 'react';
import { useColor, useColors } from '@rovna-ui/theme';

import { Icon, IconProps } from '../Icon';

const Materials10D = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ size = 20, color, ...props }, ref) => {
    const _color = useColor(color, useColors().blue600);

    return (
      <Icon
        data-testid='rovna-ui-materials-10-d-icon'
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
            fillRule='evenodd'
            clipRule='evenodd'
            d='M14.875 14.375H10.5V18.75H1.75V10H6.125V5.625H10.5V1.25H19.25V10H14.875V14.375ZM6.125 14.375V11.875H3.625V16.875H8.625V14.375H6.125ZM12.375 8.125H17.375V3.125H12.375V8.125ZM10.5 10V7.5H8V12.5H13V10H10.5Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Materials10D.displayName = 'Materials10D';

export { Materials10D };
