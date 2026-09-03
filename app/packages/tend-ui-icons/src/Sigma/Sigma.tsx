import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Sigma = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-sigma-icon' {...props} ref={ref} color={_color}>
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
            d='M5.09149 4.58214C5.25467 4.22734 5.60947 4 6 4H17C17.5304 4 18.0391 4.21071 18.4142 4.58579C18.7893 4.96086 19 5.46957 19 6V8C19 8.55229 18.5523 9 18 9C17.4477 9 17 8.55229 17 8V6H8.17422L12.7593 11.3492C13.0802 11.7237 13.0802 12.2763 12.7593 12.6508L8.17422 18H17V16C17 15.4477 17.4477 15 18 15C18.5523 15 19 15.4477 19 16V18C19 18.5304 18.7893 19.0391 18.4142 19.4142C18.0391 19.7893 17.5304 20 17 20H6C5.60947 20 5.25467 19.7727 5.09149 19.4179C4.9283 19.0631 4.98659 18.6457 5.24074 18.3492L10.6829 12L5.24074 5.65079C4.98659 5.35428 4.9283 4.93694 5.09149 4.58214Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Sigma.displayName = 'Sigma';

export { Sigma };
