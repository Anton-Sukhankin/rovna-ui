import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const MailAdd = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-mail-add-icon' {...props} ref={ref} color={_color}>
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
            d='M5 4C3.34315 4 2 5.34315 2 7V17C2 18.6569 3.34315 20 5 20H12C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18H5C4.44772 18 4 17.5523 4 17V7.25006L10.2 11.9001C11.2667 12.7001 12.7333 12.7001 13.8 11.9001L20 7.25006V11C20 11.5523 20.4477 12 21 12C21.5523 12 22 11.5523 22 11V7C22 5.34315 20.6569 4 19 4H5ZM18.3334 6H5.66659L11.4 10.3001C11.7556 10.5667 12.2444 10.5667 12.6 10.3001L18.3334 6ZM17 18C16.4477 18 16 18.4477 16 19C16 19.5523 16.4477 20 17 20H19V22C19 22.5523 19.4477 23 20 23C20.5523 23 21 22.5523 21 22V20H23C23.5523 20 24 19.5523 24 19C24 18.4477 23.5523 18 23 18H21V16C21 15.4477 20.5523 15 20 15C19.4477 15 19 15.4477 19 16V18H17Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

MailAdd.displayName = 'MailAdd';

export { MailAdd };
