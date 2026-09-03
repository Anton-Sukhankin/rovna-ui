import React from 'react';
import { useColor, useColors } from '@rovna-ui/theme';

import { Icon, IconProps } from '../Icon';

const Pass10D = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ size = 20, color, ...props }, ref) => {
    const _color = useColor(color, useColors().blue600);

    return (
      <Icon
        data-testid='rovna-ui-pass-10-d-icon'
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
          <path d='M9.375 15H5V12.5H9.375V15Z' fill='currentColor' />
          <path d='M15.625 15H11.25V13.75H15.625V15Z' fill='currentColor' />
          <path d='M15.625 12.5H11.25V11.25H15.625V12.5Z' fill='currentColor' />
          <path d='M8.125 11.875H6.25V10H8.125V11.875Z' fill='currentColor' />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M12.5 4.375H18.75V18.75H1.25V4.375H7.5V1.25H12.5V4.375ZM3.125 16.875H16.875V6.25H12.5V8.125H7.5V6.25H3.125V16.875ZM9.375 6.25H10.625V3.125H9.375V6.25Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Pass10D.displayName = 'Pass10D';

export { Pass10D };
