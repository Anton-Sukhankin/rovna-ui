import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ArrowLeft = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-arrow-left-icon' {...props} ref={ref} color={_color}>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M13.5 8.46671L13.5 15.5333C13.5 15.9483 12.9382 16.1561 12.6096 15.8626L8.65278 12.3294C8.44908 12.1475 8.44908 11.8525 8.65277 11.6706L12.6096 8.13736C12.9382 7.84393 13.5 8.05175 13.5 8.46671Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ArrowLeft.displayName = 'ArrowLeft';

export { ArrowLeft };
