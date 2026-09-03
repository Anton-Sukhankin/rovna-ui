import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FolderEdit = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-folder-edit-icon' {...props} ref={ref} color={_color}>
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
            d='M3 5C3 4.44772 3.44772 4 4 4H7.58579L9 5.41421C9.37507 5.78929 9.88378 6 10.4142 6H18C18.5523 6 19 6.44772 19 7V9.5C19 10.0523 19.4477 10.5 20 10.5C20.5523 10.5 21 10.0523 21 9.5V7C21 5.34315 19.6569 4 18 4L10.4142 4L9 2.58579C8.62493 2.21071 8.11622 2 7.58579 2H4C2.34315 2 1 3.34315 1 5V17C1 18.6569 2.34315 20 4 20H10C10.5523 20 11 19.5523 11 19C11 18.4477 10.5523 18 10 18H4C3.44772 18 3 17.5523 3 17V5ZM14.1471 21.2646L14.5 19.5L20.6464 13.3536C20.8417 13.1583 21.1583 13.1583 21.3535 13.3536L22.6464 14.6465C22.8417 14.8418 22.8417 15.1583 22.6464 15.3536L16.5 21.5L14.7354 21.853C14.3856 21.9229 14.0771 21.6145 14.1471 21.2646Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FolderEdit.displayName = 'FolderEdit';

export { FolderEdit };
