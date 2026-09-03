import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ArrowDropUp = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-arrow-drop-up-icon' {...props} ref={ref} color={_color}>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M15.5333 14H8.46671C8.05175 14 7.84393 13.4382 8.13736 13.1096L11.6706 9.15278C11.8525 8.94908 12.1475 8.94908 12.3294 9.15277L15.8626 13.1096C16.1561 13.4382 15.9483 14 15.5333 14Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ArrowDropUp.displayName = 'ArrowDropUp';

export { ArrowDropUp };
