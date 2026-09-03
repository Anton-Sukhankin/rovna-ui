import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FileTree = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-file-tree-icon' {...props} ref={ref} color={_color}>
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
            d='M2 4C2 3.44772 2.44772 3 3 3H8C8.55228 3 9 3.44772 9 4V6H12H15V4C15 3.44772 15.4477 3 16 3H21C21.5523 3 22 3.44772 22 4V10C22 10.5523 21.5523 11 21 11H16C15.4477 11 15 10.5523 15 10V8H13V16H15V14C15 13.4477 15.4477 13 16 13H21C21.5523 13 22 13.4477 22 14V20C22 20.5523 21.5523 21 21 21H16C15.4477 21 15 20.5523 15 20V18H12C11.4477 18 11 17.5523 11 17V8H9V10C9 10.5523 8.55228 11 8 11H3C2.44772 11 2 10.5523 2 10V4ZM17 17V19H20V15H17V17ZM20 9H17V7V5H20V9ZM7 5V7V9H4V5H7Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FileTree.displayName = 'FileTree';

export { FileTree };
