import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const MailCancel = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-mail-cancel-icon' {...props} ref={ref} color={_color}>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clipPath='url(#clip0_324_11557)'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M5 4C3.34315 4 2 5.34315 2 7V17C2 18.6569 3.34315 20 5 20H14C14.5523 20 15 19.5523 15 19C15 18.4477 14.5523 18 14 18H5C4.44772 18 4 17.5523 4 17V7.25006L10.2 11.9001C11.2667 12.7001 12.7333 12.7001 13.8 11.9001L20 7.25006V12C20 12.5523 20.4477 13 21 13C21.5523 13 22 12.5523 22 12V7C22 5.34315 20.6569 4 19 4H5ZM18.3334 6H5.66659L11.4 10.3001C11.7556 10.5667 12.2444 10.5667 12.6 10.3001L18.3334 6ZM22.4143 19L23.7071 20.2928C24.0976 20.6833 24.0976 21.3165 23.7071 21.707C23.3165 22.0975 22.6834 22.0975 22.2929 21.707L21 20.4142L19.7071 21.7071C19.3166 22.0976 18.6835 22.0976 18.2929 21.7071C17.9024 21.3165 17.9024 20.6834 18.2929 20.2929L19.5858 19L18.2929 17.707C17.9024 17.3165 17.9024 16.6833 18.2929 16.2928C18.6834 15.9023 19.3166 15.9023 19.7071 16.2928L21 17.5857L22.2929 16.2929C22.6834 15.9024 23.3166 15.9024 23.7071 16.2929C24.0976 16.6834 24.0976 17.3166 23.7071 17.7071L22.4143 19Z'
              fill='currentColor'
            />
          </g>
          <defs>
            <clipPath id='clip0_324_11557'>
              <rect width='24' height='24' fill='currentColor' />
            </clipPath>
          </defs>
        </svg>
      </Icon>
    );
  },
);

MailCancel.displayName = 'MailCancel';

export { MailCancel };
