import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ArrowDropDown = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-arrow-drop-down-icon'
        {...props}
        ref={ref}
        color={_color}
      >
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M15.5333 10H8.46671C8.05175 10 7.84393 10.5618 8.13736 10.8904L11.6706 14.8472C11.8525 15.0509 12.1475 15.0509 12.3294 14.8472L15.8626 10.8904C16.1561 10.5618 15.9483 10 15.5333 10Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ArrowDropDown.displayName = 'ArrowDropDown';

export { ArrowDropDown };
