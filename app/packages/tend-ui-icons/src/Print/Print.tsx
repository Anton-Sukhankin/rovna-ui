import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Print = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-print-icon' {...props} ref={ref} color={_color}>
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
            d='M5 6.5C5 4.29086 6.79086 2.5 9 2.5H15C17.2091 2.5 19 4.29086 19 6.5C19 6.54201 18.9974 6.58342 18.9924 6.62407C20.7215 7.06545 22 8.63342 22 10.5V14.5C22 16.7091 20.2091 18.5 18 18.5H16.874C16.4299 20.2252 14.8638 21.5 13 21.5H11C9.13616 21.5 7.57006 20.2252 7.12602 18.5H6C3.79086 18.5 2 16.7091 2 14.5V10.5C2 8.63342 3.27853 7.06545 5.00762 6.62406C5.00259 6.58342 5 6.54201 5 6.5ZM7 16.5V15.5C6.44772 15.5 6 15.0523 6 14.5C6 13.9477 6.44772 13.5 7 13.5H8H16H17C17.5523 13.5 18 13.9477 18 14.5C18 15.0523 17.5523 15.5 17 15.5V16.5H18C19.1046 16.5 20 15.6046 20 14.5V10.5C20 9.39543 19.1046 8.5 18 8.5H6C4.89543 8.5 4 9.39543 4 10.5V14.5C4 15.6046 4.89543 16.5 6 16.5H7ZM11 19.5C9.89543 19.5 9 18.6046 9 17.5V15.5H15V17.5C15 18.6046 14.1046 19.5 13 19.5H11ZM15 4.5C16.1046 4.5 17 5.39543 17 6.5H7C7 5.39543 7.89543 4.5 9 4.5H15ZM7 9.5C6.44772 9.5 6 9.94772 6 10.5C6 11.0523 6.44772 11.5 7 11.5H9C9.55228 11.5 10 11.0523 10 10.5C10 9.94772 9.55228 9.5 9 9.5H7Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Print.displayName = 'Print';

export { Print };
