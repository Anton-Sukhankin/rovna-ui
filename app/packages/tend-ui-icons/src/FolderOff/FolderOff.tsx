import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FolderOff = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-folder-off-icon' {...props} ref={ref} color={_color}>
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
            d='M2 6.41421L1.29289 5.70711C0.902369 5.31658 0.902369 4.68342 1.29289 4.29289C1.68342 3.90237 2.31658 3.90237 2.70711 4.29289L19.7071 21.2929C20.0976 21.6834 20.0976 22.3166 19.7071 22.7071C19.3166 23.0976 18.6834 23.0976 18.2929 22.7071L16.5858 21H5C3.34315 21 2 19.6569 2 18V6.41421ZM14.5858 19H5C4.44772 19 4 18.5523 4 18V8.41421L14.5858 19ZM20 18C20 18.298 19.8697 18.5655 19.6629 18.7487L21.078 20.1638C21.6463 19.6179 22 18.8502 22 18V8C22 6.34315 20.6569 5 19 5L11.4142 5L10 3.58579C9.62493 3.21071 9.11622 3 8.58579 3H5C4.67291 3 4.35805 3.05235 4.06333 3.14912L5.91421 5H8.58579L10 6.41421C10.3751 6.78929 10.8838 7 11.4142 7H19C19.5523 7 20 7.44772 20 8V18Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FolderOff.displayName = 'FolderOff';

export { FolderOff };
