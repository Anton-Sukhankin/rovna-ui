import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Dining = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-dining-icon' {...props} ref={ref} color={_color}>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M5 2C5.55228 2 6 2.44772 6 3V9H7V3C7 2.44772 7.44772 2 8 2C8.55228 2 9 2.44772 9 3V9H10V3C10 2.44772 10.4477 2 11 2C11.5523 2 12 2.44772 12 3V9C12 10.8638 10.7252 12.4299 9 12.874V21C9 21.5523 8.55228 22 8 22C7.44772 22 7 21.5523 7 21V12.874C5.27477 12.4299 4 10.8638 4 9V3C4 2.44772 4.44772 2 5 2ZM18.5007 2.02457C18.7755 1.99732 19 2.2238 19 2.49995V6.99995V11.9999V13.9999V20.9999C19 21.5522 18.5523 21.9999 18 21.9999C17.4477 21.9999 17 21.5522 17 20.9999V13.9999H14.5C14.2239 13.9999 14 13.7761 14 13.4999V6.99995C14 4.40703 15.9737 2.2751 18.5007 2.02457Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Dining.displayName = 'Dining';

export { Dining };
