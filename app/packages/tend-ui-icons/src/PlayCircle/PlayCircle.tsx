import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const PlayCircle = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-play-circle-icon' {...props} ref={ref} color={_color}>
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
            d='M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM10.2704 7.99527L15.8457 11.5794C16.1519 11.7763 16.1519 12.2238 15.8457 12.4206L10.2704 16.0048C9.93762 16.2187 9.5 15.9798 9.5 15.5842V8.41586C9.5 8.02027 9.93762 7.78135 10.2704 7.99527Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

PlayCircle.displayName = 'PlayCircle';

export { PlayCircle };
