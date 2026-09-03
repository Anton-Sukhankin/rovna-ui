import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Paragraph = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-paragraph-icon' {...props} ref={ref} color={_color}>
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
            d='M10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14V6ZM4 10C4 13.3137 6.68629 16 10 16L10 20C10 20.5523 10.4477 21 11 21C11.5523 21 12 20.5523 12 20V6H15V20C15 20.5523 15.4477 21 16 21C16.5523 21 17 20.5523 17 20V6H19C19.5523 6 20 5.55228 20 5C20 4.44772 19.5523 4 19 4H16H11H10C6.68629 4 4 6.68629 4 10Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Paragraph.displayName = 'Paragraph';

export { Paragraph };
