import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Plug = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-plug-icon' {...props} ref={ref} color={_color}>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M11.5 10C10.9477 10 10.5 10.4477 10.5 11C10.5 11.5523 10.9477 12 11.5 12H13C13.5523 12 14 11.5523 14 11C14 10.4477 13.5523 10 13 10H11.5Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M9 2C9.55228 2 10 2.44772 10 3V7H14V3C14 2.44772 14.4477 2 15 2C15.5523 2 16 2.44772 16 3V7H16.25C17.7688 7 19 8.23122 19 9.75V9.9C19 11.1294 18.1467 12.1596 17 12.4304V12.75C17 15.1182 15.267 17.0815 13 17.4411V18C13 19.1046 13.8954 20 15 20H19.5C20.0523 20 20.5 20.4477 20.5 21C20.5 21.5523 20.0523 22 19.5 22H15C12.7909 22 11 20.2091 11 18V17.3338C8.98308 16.7851 7.5 14.9407 7.5 12.75V12.4888C6.09837 12.3625 5 11.1845 5 9.75C5 8.23122 6.23122 7 7.75 7H8V3C8 2.44772 8.44772 2 9 2ZM7.75 9C7.33579 9 7 9.33579 7 9.75C7 10.1642 7.33579 10.5 7.75 10.5H7.875C8.77246 10.5 9.5 11.2275 9.5 12.125V12.75C9.5 14.2688 10.7312 15.5 12.25 15.5C13.7688 15.5 15 14.2688 15 12.75V11.9C15 11.1268 15.6268 10.5 16.4 10.5C16.7314 10.5 17 10.2314 17 9.9V9.75C17 9.33579 16.6642 9 16.25 9H7.75Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Plug.displayName = 'Plug';

export { Plug };
