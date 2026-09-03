import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Headphone = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-headphone-icon' {...props} ref={ref} color={_color}>
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
            d='M2.00026 12.8699L2 12.9464L2.00025 12.969L2.00009 14.2837C2.00003 14.2883 2 14.2928 2 14.2974V15.0552C2 15.0551 2 15.0553 2 15.0552V18.5305C2 19.7169 2.69334 20.7928 3.77105 21.2789L4.77105 21.7298C6.75605 22.625 9 21.1667 9 18.9815V15.1462C9 12.961 6.75605 11.5027 4.77105 12.3978L4.00199 12.7447C4.09893 7.81322 7.72728 4.00851 12 4.00851C16.2726 4.00851 19.9015 7.81376 19.998 12.7447L19.2289 12.3978C17.2439 11.5027 15 12.961 15 15.1462V18.9838C15 21.1681 17.2423 22.6265 19.2271 21.733L20.2271 21.2829C21.3058 20.7973 22 19.7208 22 18.5337V15.0553V14.2974V12.9464C22 6.99308 17.6104 2 12 2C6.41587 2 2.04064 6.94711 2.00028 12.863L2.00026 12.8699ZM4 14.9473V15.0554V18.5305C4 18.926 4.23111 19.2846 4.59035 19.4466L5.59035 19.8976C6.25202 20.196 7 19.7099 7 18.9815V15.1462C7 14.4178 6.25202 13.9317 5.59035 14.2301L4 14.9473ZM18.4096 14.2301L20 14.9473V15.0553V18.5337C20 18.9294 19.7686 19.2882 19.409 19.4501L18.409 19.9002C17.7474 20.198 17 19.7119 17 18.9838V15.1462C17 14.4178 17.748 13.9317 18.4096 14.2301Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Headphone.displayName = 'Headphone';

export { Headphone };
