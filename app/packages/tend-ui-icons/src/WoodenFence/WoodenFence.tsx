import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const WoodenFence = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-wooden-fence-icon' {...props} ref={ref} color={_color}>
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
            d='M5.29289 3.29289C5.68342 2.90237 6.31658 2.90237 6.70711 3.29289L9 5.58579L11.2929 3.29289C11.6834 2.90237 12.3166 2.90237 12.7071 3.29289L15 5.58579L17.2929 3.29289C17.6834 2.90237 18.3166 2.90237 18.7071 3.29289L21.7071 6.29289C21.8946 6.48043 22 6.73478 22 7V20C22 20.5523 21.5523 21 21 21H15H9H3C2.44772 21 2 20.5523 2 20V7C2 6.73478 2.10536 6.48043 2.29289 6.29289L5.29289 3.29289ZM10 19H14V7.41421L12 5.41421L10 7.41421V19ZM8 7.41421V19H4V7.41421L6 5.41421L8 7.41421ZM20 7.41421V19H16V7.41421L18 5.41421L20 7.41421Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

WoodenFence.displayName = 'WoodenFence';

export { WoodenFence };
