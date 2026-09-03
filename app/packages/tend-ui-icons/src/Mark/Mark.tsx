import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Mark = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-mark-icon' {...props} ref={ref} color={_color}>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 16 16'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14H2.88867L2.79785 13.9951C2.37965 13.9526 2.04744 13.6203 2.00488 13.2021L2 13.1113V8C2 4.68629 4.68629 2 8 2ZM8 3.2002C5.34903 3.2002 3.2002 5.34903 3.2002 8V12.7998H8C10.651 12.7998 12.7998 10.651 12.7998 8C12.7998 5.34903 10.651 3.2002 8 3.2002Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Mark.displayName = 'Mark';

export { Mark };
