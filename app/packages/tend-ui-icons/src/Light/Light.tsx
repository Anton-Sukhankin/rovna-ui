import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Light = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-light-icon' {...props} ref={ref} color={_color}>
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
            d='M12 3C12.5523 3 13 3.44772 13 4V6.05493C17.5 6.55237 21 10.3674 21 15V16C21 16.5523 20.5523 17 20 17H16C16 19.2091 14.2091 21 12 21C9.79086 21 8 19.2091 8 17H4C3.44772 17 3 16.5523 3 16V15C3 10.3674 6.50005 6.55237 11 6.05493V4C11 3.44772 11.4477 3 12 3ZM10 17C10 18.1046 10.8954 19 12 19C13.1046 19 14 18.1046 14 17H10ZM5 15C5 11.134 8.13401 8 12 8C15.866 8 19 11.134 19 15H5Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Light.displayName = 'Light';

export { Light };
