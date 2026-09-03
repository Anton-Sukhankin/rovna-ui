import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Done = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-done-icon' {...props} ref={ref} color={_color}>
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
            d='M19.7071 8.70711C20.0976 8.31658 20.0976 7.68342 19.7071 7.29289C19.3166 6.90237 18.6834 6.90237 18.2929 7.29289L10 15.5858L5.70711 11.2929C5.31658 10.9024 4.68342 10.9024 4.29289 11.2929C3.90237 11.6834 3.90237 12.3166 4.29289 12.7071L9.29289 17.7071C9.68342 18.0976 10.3166 18.0976 10.7071 17.7071L19.7071 8.70711Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Done.displayName = 'Done';

export { Done };
