import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FormatItalic = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-format-italic-icon' {...props} ref={ref} color={_color}>
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
            d='M11.0788 7.5H8.5C8.22386 7.5 8 7.27614 8 7V5C8 4.72386 8.22386 4.5 8.5 4.5H17.5C17.7761 4.5 18 4.72386 18 5V7C18 7.27614 17.7761 7.5 17.5 7.5H14.1711L11.9211 16.5H14.5C14.7761 16.5 15 16.7239 15 17V19C15 19.2761 14.7761 19.5 14.5 19.5H5.5C5.22386 19.5 5 19.2761 5 19V17C5 16.7239 5.22386 16.5 5.5 16.5H8.82873L11.0788 7.5Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FormatItalic.displayName = 'FormatItalic';

export { FormatItalic };
