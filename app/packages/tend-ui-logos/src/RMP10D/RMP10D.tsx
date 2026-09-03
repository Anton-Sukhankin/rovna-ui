import React from 'react';
import { useColor, useColors } from '@rovna-ui/theme';

import { Icon, IconProps } from '../Icon';

const RMP10D = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ size = 20, color, ...props }, ref) => {
    const _color = useColor(color, useColors().blue600);

    return (
      <Icon
        data-testid='rovna-ui-rmp-10-d-icon'
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
            d='M18.9375 5.2124V14.7876L10.5 19.1821L2.0625 14.7876V5.2124L10.5 0.817871L18.9375 5.2124ZM3.9375 13.6496L9.5625 16.5793V10.2567L3.9375 7.33154V13.6496ZM11.4375 10.2567V16.5793L17.0625 13.6496V7.33154L11.4375 10.2567ZM5.02454 5.78339L10.5 8.63068L15.9752 5.78339L10.5 2.93213L5.02454 5.78339Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

RMP10D.displayName = 'RMP10D';

export { RMP10D };
