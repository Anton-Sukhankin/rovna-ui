import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Help = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-help-icon' {...props} ref={ref} color={_color}>
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
            d='M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17ZM10.1136 9.33325C10.3886 8.5551 11.1308 8 12 8C12.5986 8 13.0931 8.20432 13.4312 8.52674C13.7621 8.84221 14 9.32399 14 10C14 10.3977 13.8904 10.6062 13.7645 10.7565C13.6069 10.9447 13.3725 11.1042 12.9961 11.3237C12.9593 11.3452 12.9199 11.3678 12.8785 11.3917C12.5598 11.575 12.1182 11.8289 11.7717 12.1658C11.3207 12.6043 11 13.1983 11 14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14C13 13.8017 13.0543 13.7082 13.1658 13.5998C13.3217 13.4483 13.5324 13.3257 13.8946 13.1149L14.0039 13.0513C14.3775 12.8333 14.8931 12.524 15.298 12.0404C15.7347 11.5188 16 10.8523 16 10C16 8.8174 15.5664 7.79918 14.8114 7.0793C14.0638 6.36638 13.0582 6 12 6C10.2568 6 8.77651 7.11451 8.22787 8.66675C8.04383 9.18747 8.31675 9.75879 8.83747 9.94284C9.35818 10.1269 9.92951 9.85396 10.1136 9.33325Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Help.displayName = 'Help';

export { Help };
