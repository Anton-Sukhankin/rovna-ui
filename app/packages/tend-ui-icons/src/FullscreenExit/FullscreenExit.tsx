import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FullscreenExit = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-fullscreen-exit-icon'
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
            fillRule='evenodd'
            clipRule='evenodd'
            d='M9 10C9.55228 10 10 9.55228 10 9L10 6C10 5.44772 9.55229 5 9 5C8.44772 5 8 5.44772 8 6V8H6C5.44772 8 5 8.44771 5 9C5 9.55228 5.44772 10 6 10L9 10ZM15 14C14.4477 14 14 14.4477 14 15V18C14 18.5523 14.4477 19 15 19C15.5523 19 16 18.5523 16 18V16H18C18.5523 16 19 15.5523 19 15C19 14.4477 18.5523 14 18 14H15ZM10 15C10 14.4477 9.55228 14 9 14H6C5.44772 14 5 14.4477 5 15C5 15.5523 5.44772 16 6 16H8V18C8 18.5523 8.44771 19 9 19C9.55228 19 10 18.5523 10 18L10 15ZM15 10C14.4477 10 14 9.55228 14 9V6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6V8H18C18.5523 8 19 8.44772 19 9C19 9.55228 18.5523 10 18 10H15Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FullscreenExit.displayName = 'FullscreenExit';

export { FullscreenExit };
