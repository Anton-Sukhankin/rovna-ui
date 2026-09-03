import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FolderOutgoing = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-folder-outgoing-icon'
        {...props}
        ref={ref}
        color={_color}
      >
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
            d='M8 13C8 12.4477 8.44771 12 9 12L12.5858 12L11.2929 10.7071C10.9024 10.3166 10.9024 9.68342 11.2929 9.29289C11.6834 8.90237 12.3166 8.90237 12.7071 9.29289L15.7071 12.2929C16.0976 12.6834 16.0976 13.3166 15.7071 13.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071C10.9024 16.3166 10.9024 15.6834 11.2929 15.2929L12.5858 14L9 14C8.44771 14 8 13.5523 8 13Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FolderOutgoing.displayName = 'FolderOutgoing';

export { FolderOutgoing };
