import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FolderAdd = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-folder-add-icon' {...props} ref={ref} color={_color}>
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
            d='M5 5C4.44772 5 4 5.44772 4 6V18C4 18.5523 4.44772 19 5 19H19C19.5523 19 20 18.5523 20 18V8C20 7.44772 19.5523 7 19 7H11.4142C10.8838 7 10.3751 6.78929 10 6.41421L8.58579 5H5ZM2 6C2 4.34315 3.34315 3 5 3H8.58579C9.11622 3 9.62493 3.21071 10 3.58579L11.4142 5L19 5C20.6569 5 22 6.34315 22 8V18C22 19.6569 20.6569 21 19 21H5C3.34315 21 2 19.6569 2 18V6Z'
            fill='currentColor'
          />
          <path
            d='M8 13C8 12.4477 8.44771 12 9 12H11V10C11 9.44771 11.4477 9 12 9C12.5523 9 13 9.44771 13 10V12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V14H9C8.44771 14 8 13.5523 8 13Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FolderAdd.displayName = 'FolderAdd';

export { FolderAdd };
