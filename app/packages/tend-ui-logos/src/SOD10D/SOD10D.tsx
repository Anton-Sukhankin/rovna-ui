import React from 'react';
import { useColor, useColors } from '@rovna-ui/theme';

import { Icon, IconProps } from '../Icon';

const SOD10D = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ size = 20, color, ...props }, ref) => {
    const _color = useColor(color, useColors().blue600);

    return (
      <Icon
        data-testid='rovna-ui-sod-10-d-icon'
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
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8.125 3.75H11.875V1.25H18.75V8.125H16.25V11.875H18.75V18.75H11.875V16.25H8.125V18.75H1.25V11.875H3.75V8.125H1.25V1.25H8.125V3.75ZM3.125 16.875H6.25V13.75H3.125V16.875ZM13.75 16.875H16.875V13.75H13.75V16.875ZM8.125 8.125H5.625V11.875H8.125V14.375H11.875V11.875H14.375V8.125H11.875V5.625H8.125V8.125ZM3.125 6.25H6.25V3.125H3.125V6.25ZM13.75 6.25H16.875V3.125H13.75V6.25Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

SOD10D.displayName = 'SOD10D';

export { SOD10D };
