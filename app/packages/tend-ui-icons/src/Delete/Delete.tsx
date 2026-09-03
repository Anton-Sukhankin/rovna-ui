import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Delete = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-delete-icon' {...props} ref={ref} color={_color}>
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
            d='M9.72076 2C8.8599 2 8.09562 2.55086 7.82339 3.36754L7.27924 5H3C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7H3.99996C3.99998 7.02361 4.00083 7.04738 4.00254 7.07129L4.86986 19.2138C4.982 20.7837 6.28832 22 7.86224 22H16.1378C17.7117 22 19.018 20.7837 19.1301 19.2138L19.9975 7.07129C19.9992 7.04738 20 7.02361 20 7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H16.7208L16.1766 3.36754C15.9044 2.55086 15.1401 2 14.2792 2H9.72076ZM15.9767 7C15.9921 7.00036 16.0076 7.00036 16.0231 7H17.9975L17.1352 19.0713C17.0978 19.5946 16.6624 20 16.1378 20H7.86224C7.3376 20 6.90216 19.5946 6.86478 19.0713L6.00255 7H7.97694C7.99245 7.00036 8.00792 7.00036 8.02334 7H15.9767ZM14.6126 5L14.2792 4H9.72076L9.38743 5H14.6126Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Delete.displayName = 'Delete';

export { Delete };
