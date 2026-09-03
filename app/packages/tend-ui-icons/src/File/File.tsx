import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const File = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-file-icon' {...props} ref={ref} color={_color}>
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
            d='M6 5C6 4.44772 6.44772 4 7 4H13V8.00003C13 8.55231 13.4477 9.00003 14 9.00003H18V19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V5ZM20 8.00793V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V5C4 3.34315 5.34315 2 7 2H13.9998H14C14.1299 2 14.2572 2.02527 14.3753 2.07308C14.4983 2.1229 14.6114 2.1972 14.7071 2.29289L19.7071 7.29289C19.8946 7.48043 20 7.73478 20 8V8.00793Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

File.displayName = 'File';

export { File };
