import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const MailRemove = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-mail-remove-icon' {...props} ref={ref} color={_color}>
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
            d='M2 7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7V14C22 14.5523 21.5523 15 21 15C20.4477 15 20 14.5523 20 14V7.25006L13.8 11.9001C12.7333 12.7001 11.2667 12.7001 10.2 11.9001L4 7.25006V17C4 17.5523 4.44772 18 5 18H12C12.5523 18 13 18.4477 13 19C13 19.5523 12.5523 20 12 20H5C3.34315 20 2 18.6569 2 17V7ZM5.66659 6L11.4 10.3001C11.7556 10.5667 12.2444 10.5667 12.6 10.3001L18.3334 6H5.66659ZM16 19C16 18.4477 16.4477 18 17 18H23C23.5523 18 24 18.4477 24 19C24 19.5523 23.5523 20 23 20H17C16.4477 20 16 19.5523 16 19Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

MailRemove.displayName = 'MailRemove';

export { MailRemove };
