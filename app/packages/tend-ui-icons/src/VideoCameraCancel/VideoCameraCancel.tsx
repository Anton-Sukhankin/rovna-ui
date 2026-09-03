import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const VideoCameraCancel = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-video-camera-cancel-icon'
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
            d='M12.7071 13.2929L11.4142 12L12.7071 10.7071C13.0976 10.3166 13.0976 9.68342 12.7071 9.29289C12.3166 8.90237 11.6834 8.90237 11.2929 9.29289L9.99999 10.5858L8.70711 9.29292C8.31658 8.9024 7.68342 8.9024 7.29289 9.29292C6.90237 9.68345 6.90237 10.3166 7.29289 10.7071L8.58577 12L7.29293 13.2929C6.9024 13.6834 6.9024 14.3165 7.29293 14.7071C7.68345 15.0976 8.31662 15.0976 8.70714 14.7071L9.99999 13.4142L11.2929 14.7071C11.6834 15.0976 12.3165 15.0976 12.7071 14.7071C13.0976 14.3166 13.0976 13.6834 12.7071 13.2929Z'
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

VideoCameraCancel.displayName = 'VideoCameraCancel';

export { VideoCameraCancel };
