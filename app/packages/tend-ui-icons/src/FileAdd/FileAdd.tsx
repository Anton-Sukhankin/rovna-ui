import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FileAdd = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-file-add-icon' {...props} ref={ref} color={_color}>
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
            d='M6 5C6 4.44772 6.44772 4 7 4H13V8.00003C13 8.55231 13.4477 9.00003 14 9.00003H18V12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12V8.00793V8C20 7.73478 19.8946 7.48043 19.7071 7.29289L14.7071 2.29289C14.6114 2.1972 14.4983 2.1229 14.3753 2.07308C14.2572 2.02527 14.1299 2 14 2H13.9998H7C5.34315 2 4 3.34315 4 5V19C4 20.6569 5.34315 22 7 22H11C11.5523 22 12 21.5523 12 21C12 20.4477 11.5523 20 11 20H7C6.44772 20 6 19.5523 6 19V5ZM20 23C20 23.5523 19.5523 24 19 24C18.4477 24 18 23.5523 18 23V21H16C15.4477 21 15 20.5523 15 20C15 19.4477 15.4477 19 16 19H18V17C18 16.4477 18.4477 16 19 16C19.5523 16 20 16.4477 20 17V19H22C22.5523 19 23 19.4477 23 20C23 20.5523 22.5523 21 22 21H20V23Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FileAdd.displayName = 'FileAdd';

export { FileAdd };
