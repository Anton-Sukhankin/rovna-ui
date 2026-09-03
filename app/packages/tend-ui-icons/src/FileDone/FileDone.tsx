import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FileDone = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-file-done-icon' {...props} ref={ref} color={_color}>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clipPath='url(#clip0_324_11570)'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M7 4C6.44772 4 6 4.44772 6 5V19C6 19.5523 6.44772 20 7 20H11C11.5523 20 12 20.4477 12 21C12 21.5523 11.5523 22 11 22H7C5.34315 22 4 20.6569 4 19V5C4 3.34315 5.34315 2 7 2H13.9998C14.1297 2 14.2572 2.02527 14.3753 2.07308C14.4983 2.1229 14.6114 2.1972 14.7071 2.29289L19.7071 7.29289C19.8946 7.48043 20 7.73478 20 8V8.00793V14C20 14.5523 19.5523 15 19 15C18.4477 15 18 14.5523 18 14V9.00003H14C13.4477 9.00003 13 8.55231 13 8.00003V4H7ZM23.7071 18.7071C24.0976 18.3166 24.0976 17.6834 23.7071 17.2929C23.3166 16.9024 22.6834 16.9024 22.2929 17.2929L19 20.5858L17.7071 19.2929C17.3166 18.9024 16.6834 18.9024 16.2929 19.2929C15.9024 19.6834 15.9024 20.3166 16.2929 20.7071L17.9393 22.3536C18.5251 22.9393 19.4749 22.9393 20.0607 22.3536L23.7071 18.7071Z'
              fill='currentColor'
            />
          </g>
          <defs>
            <clipPath id='clip0_324_11570'>
              <rect width='24' height='24' fill='currentColor' />
            </clipPath>
          </defs>
        </svg>
      </Icon>
    );
  },
);

FileDone.displayName = 'FileDone';

export { FileDone };
