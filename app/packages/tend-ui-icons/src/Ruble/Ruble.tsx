import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Ruble = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-ruble-icon' {...props} ref={ref} color={_color}>
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
            d='M14 7H10.5V12H14C15.3807 12 16.5 10.8807 16.5 9.5C16.5 8.11929 15.3807 7 14 7ZM14 5H10.5H9.5H8.5V12H6V14H8.5V15H6V17H8.5V19.5H10.5V17H13.5V15H10.5V14H14C16.4853 14 18.5 11.9853 18.5 9.5C18.5 7.01472 16.4853 5 14 5Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Ruble.displayName = 'Ruble';

export { Ruble };
