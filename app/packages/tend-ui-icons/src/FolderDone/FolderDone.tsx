import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FolderDone = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-folder-done-icon' {...props} ref={ref} color={_color}>
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
            d='M15.7071 11.7071C16.0976 11.3166 16.0976 10.6834 15.7071 10.2929C15.3166 9.90237 14.6834 9.90237 14.2929 10.2929L11 13.5858L9.70711 12.2929C9.31658 11.9024 8.68342 11.9024 8.29289 12.2929C7.90237 12.6834 7.90237 13.3166 8.29289 13.7071L9.93934 15.3536C10.5251 15.9393 11.4749 15.9393 12.0607 15.3536L15.7071 11.7071Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FolderDone.displayName = 'FolderDone';

export { FolderDone };
