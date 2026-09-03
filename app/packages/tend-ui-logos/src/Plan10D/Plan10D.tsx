import React from 'react';
import { useColor, useColors } from '@rovna-ui/theme';

import { Icon, IconProps } from '../Icon';

const Plan10D = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ size = 20, color, ...props }, ref) => {
    const _color = useColor(color, useColors().blue600);

    return (
      <Icon
        data-testid='rovna-ui-plan-10-d-icon'
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
            d='M19.25 18.75H6.75V13.75H19.25V18.75ZM8.625 16.875H17.375V15.625H8.625V16.875Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M19.25 12.5H1.75V7.5H19.25V12.5ZM3.625 10.625H17.375V9.375H3.625V10.625Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M14.25 6.25H1.75V1.25H14.25V6.25ZM3.625 4.375H12.375V3.125H3.625V4.375Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Plan10D.displayName = 'Plan10D';

export { Plan10D };
