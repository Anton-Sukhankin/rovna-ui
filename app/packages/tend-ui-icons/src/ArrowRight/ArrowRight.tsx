import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ArrowRight = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-arrow-right-icon' {...props} ref={ref} color={_color}>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10.5 8.46671L10.5 15.5333C10.5 15.9483 11.0618 16.1561 11.3904 15.8626L15.3472 12.3294C15.5509 12.1475 15.5509 11.8525 15.3472 11.6706L11.3904 8.13736C11.0618 7.84393 10.5 8.05175 10.5 8.46671Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ArrowRight.displayName = 'ArrowRight';

export { ArrowRight };
