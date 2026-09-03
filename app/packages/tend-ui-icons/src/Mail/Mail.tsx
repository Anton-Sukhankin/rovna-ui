import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Mail = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-mail-icon' {...props} ref={ref} color={_color}>
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
            d='M5 4C3.34315 4 2 5.34315 2 7V17C2 18.6569 3.34315 20 5 20H19C20.6569 20 22 18.6569 22 17V7C22 5.34315 20.6569 4 19 4H5ZM4 7.25006V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V7.25006L13.8 11.9001C12.7333 12.7001 11.2667 12.7001 10.2 11.9001L4 7.25006ZM18.3334 6H5.66659L11.4 10.3001C11.7556 10.5667 12.2444 10.5667 12.6 10.3001L18.3334 6Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Mail.displayName = 'Mail';

export { Mail };
