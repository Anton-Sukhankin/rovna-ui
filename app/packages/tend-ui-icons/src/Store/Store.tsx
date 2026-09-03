import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Store = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-store-icon' {...props} ref={ref} color={_color}>
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
            d='M4.73462 3C3.24167 3 1.9759 4.09779 1.76477 5.57573L1.3362 8.57574C1.14455 9.91724 1.86783 11.1539 3 11.7022V15V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V15V11.7022C22.1322 11.1539 22.8555 9.91725 22.6638 8.57574L22.2353 5.57574C22.0241 4.09779 20.7584 3 19.2654 3H18H16H13H11H8.00003H6H4.73462ZM19 14V12C18.2316 12 17.5308 11.7111 17 11.2361C16.4692 11.7111 15.7684 12 15 12H14C13.2316 12 12.5308 11.7111 12 11.2361C11.4692 11.7111 10.7684 12 10 12H9C8.23165 12 7.53077 11.7112 7.00002 11.2361C6.46926 11.7112 5.76837 12 5.00003 12H5V14H19ZM5 16H19V19H5V16ZM16 5V9C16 9.55228 15.5523 10 15 10H14C13.4477 10 13 9.55228 13 9V5H16ZM18 9V5H19.2654C19.7631 5 20.185 5.36593 20.2554 5.85858L20.6839 8.85858C20.77 9.46101 20.3025 10 19.694 10H19C18.4477 10 18 9.55228 18 9ZM11 5H8.00003V9L8.00002 9.00622C8.00337 9.55564 8.44979 10 9 10H10C10.5523 10 11 9.55228 11 9V5ZM6 9V5H4.73462C4.23696 5 3.81505 5.36593 3.74467 5.85858L3.3161 8.85858C3.23003 9.46101 3.6975 10 4.30604 10H5.00003C5.55023 10 5.99666 9.55564 6.00001 9.00622L6 9Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Store.displayName = 'Store';

export { Store };
