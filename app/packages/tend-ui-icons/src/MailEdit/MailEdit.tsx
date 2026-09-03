import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const MailEdit = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-mail-edit-icon' {...props} ref={ref} color={_color}>
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
            d='M2 7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7V10C22 10.5523 21.5523 11 21 11C20.4477 11 20 10.5523 20 10V7.25006L13.8 11.9001C12.7333 12.7001 11.2667 12.7001 10.2 11.9001L4 7.25006V17C4 17.5523 4.44772 18 5 18H11C11.5523 18 12 18.4477 12 19C12 19.5523 11.5523 20 11 20H5C3.34315 20 2 18.6569 2 17V7ZM5.66659 6H18.3334L12.6 10.3001C12.2444 10.5667 11.7556 10.5667 11.4 10.3001L5.66659 6ZM15.1471 22.2645L15.5 20.4999L21.6464 14.3535C21.8417 14.1582 22.1583 14.1582 22.3536 14.3535L23.6464 15.6464C23.8417 15.8416 23.8417 16.1582 23.6464 16.3535L17.5 22.4999L15.7354 22.8528C15.3856 22.9228 15.0771 22.6143 15.1471 22.2645Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

MailEdit.displayName = 'MailEdit';

export { MailEdit };
