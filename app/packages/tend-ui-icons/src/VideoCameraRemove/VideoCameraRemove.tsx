import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const VideoCameraRemove = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-video-camera-remove-icon'
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
            d='M14 12C14 12.5523 13.5523 13 13 13H7C6.44771 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H13C13.5523 11 14 11.4477 14 12Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M15 4C16.6569 4 18 5.34315 18 7V8.99998L20.384 7.21201L20.4 7.19998C21.0592 6.70556 22 7.17594 22 7.99998V16C22 16.824 21.0592 17.2944 20.4 16.8L20.3895 16.7921L20.384 16.788L18 15V17C18 18.6569 16.6569 20 15 20H5C3.34315 20 2 18.6569 2 17V7C2 5.34315 3.34315 4 5 4H15ZM16 7V17C16 17.5523 15.5523 18 15 18H5C4.44772 18 4 17.5523 4 17V7C4 6.44772 4.44772 6 5 6H15C15.5523 6 16 6.44772 16 7Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

VideoCameraRemove.displayName = 'VideoCameraRemove';

export { VideoCameraRemove };
