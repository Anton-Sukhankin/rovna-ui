import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Redo = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-redo-icon' {...props} ref={ref} color={_color}>
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
            d='M14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289L19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L15.7071 13.7071C15.3166 14.0976 14.6834 14.0976 14.2929 13.7071C13.9024 13.3166 13.9024 12.6834 14.2929 12.2929L16.5858 10H9.90909C7.76738 10 6 11.7735 6 14C6 16.2265 7.76738 18 9.90909 18H16C16.5523 18 17 18.4477 17 19C17 19.5523 16.5523 20 16 20H9.90909C6.62837 20 4 17.2963 4 14C4 10.7037 6.62837 8 9.90909 8H16.5858L14.2929 5.70711C13.9024 5.31658 13.9024 4.68342 14.2929 4.29289Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Redo.displayName = 'Redo';

export { Redo };
