import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Bookmark = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-bookmark-icon' {...props} ref={ref} color={_color}>
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
            d='M5 6C5 4.34315 6.34315 3 8 3H16C17.6569 3 19 4.34315 19 6V19.0657C19 20.2638 17.6648 20.9784 16.6679 20.3138L12 17.2019L7.33205 20.3138C6.33522 20.9784 5 20.2638 5 19.0657V6ZM8 5C7.44772 5 7 5.44772 7 6V18.1315L12 14.7981L17 18.1315V6C17 5.44772 16.5523 5 16 5H8Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Bookmark.displayName = 'Bookmark';

export { Bookmark };
