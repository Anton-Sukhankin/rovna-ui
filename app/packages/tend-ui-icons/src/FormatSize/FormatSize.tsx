import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FormatSize = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-format-size-icon' {...props} ref={ref} color={_color}>
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
            d='M10 7H14.5C14.7761 7 15 6.77614 15 6.5V4.5C15 4.22386 14.7761 4 14.5 4H2.5C2.22386 4 2 4.22386 2 4.5V6.5C2 6.77614 2.22386 7 2.5 7H7V18C7 18.2761 7.22386 18.5 7.5 18.5H9.5C9.77614 18.5 10 18.2761 10 18V7ZM16 12H13.5C13.2239 12 13 11.7761 13 11.5V9.5C13 9.22386 13.2239 9 13.5 9H21.5C21.7761 9 22 9.22386 22 9.5V11.5C22 11.7761 21.7761 12 21.5 12H19V18C19 18.2761 18.7761 18.5 18.5 18.5H16.5C16.2239 18.5 16 18.2761 16 18V12Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FormatSize.displayName = 'FormatSize';

export { FormatSize };
