import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FolderCancel = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-folder-cancel-icon' {...props} ref={ref} color={_color}>
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
            d='M13.4142 13L14.7071 14.2929C15.0976 14.6834 15.0976 15.3166 14.7071 15.7071C14.3165 16.0976 13.6834 16.0976 13.2929 15.7071L12 14.4142L10.7071 15.7071C10.3166 16.0976 9.68342 16.0976 9.2929 15.7071C8.90237 15.3165 8.90237 14.6834 9.2929 14.2929L10.5858 13L9.29289 11.7071C8.90237 11.3166 8.90237 10.6834 9.29289 10.2929C9.68342 9.9024 10.3166 9.9024 10.7071 10.2929L12 11.5858L13.2929 10.2929C13.6834 9.90237 14.3166 9.90237 14.7071 10.2929C15.0976 10.6834 15.0976 11.3166 14.7071 11.7071L13.4142 13Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FolderCancel.displayName = 'FolderCancel';

export { FolderCancel };
