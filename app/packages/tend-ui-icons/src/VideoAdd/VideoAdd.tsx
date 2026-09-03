import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const VideoAdd = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-video-add-icon' {...props} ref={ref} color={_color}>
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
            d='M5 4C3.34315 4 2 5.34315 2 7V17C2 18.6569 3.34315 20 5 20H12C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18H5C4.44772 18 4 17.5523 4 17V7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7V11C20 11.5523 20.4477 12 21 12C21.5523 12 22 11.5523 22 11V7C22 5.34315 20.6569 4 19 4H5ZM9 9.72316V14.2768C9 15.0446 9.82948 15.526 10.4961 15.145L14.4806 12.8682C15.1524 12.4843 15.1524 11.5156 14.4806 11.1317L10.4961 8.85491C9.82948 8.47397 9 8.95533 9 9.72316ZM20 15C20.5523 15 21 15.4477 21 16V18H23C23.5523 18 24 18.4477 24 19C24 19.5523 23.5523 20 23 20H21V22C21 22.5523 20.5523 23 20 23C19.4477 23 19 22.5523 19 22V20H17C16.4477 20 16 19.5523 16 19C16 18.4477 16.4477 18 17 18H19V16C19 15.4477 19.4477 15 20 15Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

VideoAdd.displayName = 'VideoAdd';

export { VideoAdd };
