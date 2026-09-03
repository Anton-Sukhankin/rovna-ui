import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Home = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-home-icon' {...props} ref={ref} color={_color}>
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
            d='M13.7634 2.04512C12.7119 1.28119 11.2881 1.28118 10.2367 2.04512L2.95637 7.33455C1.99479 8.03319 1.53634 9.23364 1.78744 10.3954L3.80377 19.724C4.10221 21.1047 5.32344 22.0902 6.73605 22.0902H17.264C18.6766 22.0902 19.8978 21.1047 20.1963 19.724L22.2126 10.3954C22.4637 9.23364 22.0052 8.03318 21.0436 7.33455L13.7634 2.04512ZM11.4122 3.66315C11.7627 3.40851 12.2373 3.40851 12.5878 3.66315L19.8681 8.95259C20.1886 9.18546 20.3414 9.58562 20.2577 9.97287L18.2414 19.3015C18.1419 19.7617 17.7348 20.0902 17.264 20.0902H6.73605C6.26518 20.0902 5.8581 19.7617 5.75863 19.3015L3.7423 9.97287C3.6586 9.58562 3.81142 9.18546 4.13194 8.95259L11.4122 3.66315ZM13 13C13 12.4477 12.5523 12 12 12C11.4477 12 11 12.4477 11 13V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Home.displayName = 'Home';

export { Home };
