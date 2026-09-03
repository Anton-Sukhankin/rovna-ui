import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const OpenInFull = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-open-in-full-icon' {...props} ref={ref} color={_color}>
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
            d='M20 10C19.4477 10 19 9.55228 19 9L19 6.41421L14.7071 10.7071C14.3166 11.0976 13.6834 11.0976 13.2929 10.7071C12.9024 10.3166 12.9024 9.68342 13.2929 9.29289L17.5858 5L15 5C14.4477 5 14 4.55228 14 4C14 3.44772 14.4477 3 15 3H20C20.5523 3 21 3.44772 21 4V9C21 9.55228 20.5523 10 20 10ZM10.7071 13.2929C11.0976 13.6834 11.0976 14.3166 10.7071 14.7071L6.41421 19H9C9.55229 19 10 19.4477 10 20C10 20.5523 9.55229 21 9 21L4 21C3.44771 21 3 20.5523 3 20V15C3 14.4477 3.44772 14 4 14C4.55229 14 5 14.4477 5 15L5 17.5858L9.2929 13.2929C9.68342 12.9024 10.3166 12.9024 10.7071 13.2929Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

OpenInFull.displayName = 'OpenInFull';

export { OpenInFull };
