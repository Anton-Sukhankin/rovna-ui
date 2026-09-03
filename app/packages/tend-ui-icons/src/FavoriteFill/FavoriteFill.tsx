import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FavoriteFill = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-favorite-fill-icon' {...props} ref={ref} color={_color}>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect width='24' height='24' fill='transparent' />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M22 8.5C22 12.1947 19.4678 15.3236 17.1757 17.4247C16.0048 18.498 14.8382 19.3563 13.9662 19.9457C13.3762 20.3445 12 21 12 21C12 21 10.6699 20.3757 10.0338 19.9457C9.16181 19.3563 7.99524 18.498 6.82428 17.4247C4.5322 15.3236 2 12.1947 2 8.5C2 5.46243 4.46243 3 7.5 3C9.36016 3 11.0046 3.92345 12 5.33692C12.9954 3.92345 14.6398 3 16.5 3C19.5376 3 22 5.46243 22 8.5Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FavoriteFill.displayName = 'FavoriteFill';

export { FavoriteFill };
