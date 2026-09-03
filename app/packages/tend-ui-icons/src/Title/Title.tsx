import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Title = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-title-icon' {...props} ref={ref} color={_color}>
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
            d='M13.5 7H18.5C18.7761 7 19 6.77614 19 6.5V4.5C19 4.22386 18.7761 4 18.5 4H5.5C5.22386 4 5 4.22386 5 4.5V6.5C5 6.77614 5.22386 7 5.5 7H10.5V19.5C10.5 19.7761 10.7239 20 11 20H13C13.2761 20 13.5 19.7761 13.5 19.5V7Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Title.displayName = 'Title';

export { Title };
