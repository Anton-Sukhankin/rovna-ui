import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FileOff = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-file-off-icon' {...props} ref={ref} color={_color}>
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
            d='M4 6.41421L1.29289 3.70711C0.902369 3.31658 0.902369 2.68342 1.29289 2.29289C1.68342 1.90237 2.31658 1.90237 2.70711 2.29289L21.7071 21.2929C22.0976 21.6834 22.0976 22.3166 21.7071 22.7071C21.3166 23.0976 20.6834 23.0976 20.2929 22.7071L18.9041 21.3184C18.3862 21.7443 17.7229 22 17 22H7C5.34315 22 4 20.6569 4 19V6.41421ZM6 8.41421V19C6 19.5523 6.44772 20 7 20H17C17.1695 20 17.3292 19.9578 17.4691 19.8834L6 8.41421ZM18 15.0858V9.00003H14C13.4477 9.00003 13 8.55231 13 8.00003V4H7C6.97224 4 6.94475 4.00113 6.91756 4.00335L5.38535 2.47114C5.85149 2.17289 6.40555 2 7 2H13.9998H14C14.1299 2 14.2572 2.02527 14.3753 2.07308C14.4983 2.1229 14.6114 2.1972 14.7071 2.29289V2.29292L19.7071 7.29289C19.8946 7.48043 20 7.73478 20 8V8.00793V17.0858L18 15.0858Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FileOff.displayName = 'FileOff';

export { FileOff };
