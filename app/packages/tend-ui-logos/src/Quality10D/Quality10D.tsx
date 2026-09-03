import React from 'react';
import { useColor, useColors } from '@rovna-ui/theme';

import { Icon, IconProps } from '../Icon';

const Quality10D = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ size = 20, color, ...props }, ref) => {
    const _color = useColor(color, useColors().blue600);

    return (
      <Icon
        data-testid='rovna-ui-quality-10-d-icon'
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
          <path d='M9.375 14.375H5.625V13.125H9.375V14.375Z' fill='currentColor' />
          <path d='M14.375 14.375H10.625V13.125H14.375V14.375Z' fill='currentColor' />
          <path d='M9.375 11.875H5.625V10.625H9.375V11.875Z' fill='currentColor' />
          <path d='M14.375 11.875H10.625V10.625H14.375V11.875Z' fill='currentColor' />
          <path d='M10.625 5.625H9.375V4.375H10.625V5.625Z' fill='currentColor' />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M17.5 1.25V4.375H18.125V8.125H17.5V18.75H15.625H4.375H2.5V1.25H4.375H15.625H17.5ZM4.375 16.875H15.625V3.125H4.375V16.875Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Quality10D.displayName = 'Quality10D';

export { Quality10D };
