import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const StreamView = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-stream-view-icon' {...props} ref={ref} color={_color}>
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
            d='M5 3C3.89543 3 3 3.89543 3 5V9C3 10.1046 3.89543 11 5 11H19C20.1046 11 21 10.1046 21 9V5C21 3.89543 20.1046 3 19 3H5ZM5 5H19V9H5V5ZM5 13C3.89543 13 3 13.8954 3 15V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V15C21 13.8954 20.1046 13 19 13H5ZM5 15H19V19H5V15Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

StreamView.displayName = 'StreamView';

export { StreamView };
