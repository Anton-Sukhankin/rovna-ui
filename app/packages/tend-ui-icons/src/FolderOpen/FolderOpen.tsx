import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FolderOpen = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-folder-open-icon' {...props} ref={ref} color={_color}>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clipPath='url(#clip0_324_11783)'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M4 6C4 5.44772 4.44772 5 5 5H8.58579L10 6.41421C10.3751 6.78929 10.8838 7 11.4142 7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5L11.4142 5L10 3.58579C9.62493 3.21071 9.11622 3 8.58579 3H5C3.34315 3 2 4.34315 2 6V18.9803C1.99965 18.9971 1.99973 19.0139 2.00023 19.0306C2.01659 20.1211 2.90565 21 4 21H20.9815C21.07 21.0017 21.1568 20.9917 21.2402 20.971C21.5349 20.8983 21.7782 20.695 21.905 20.4259C21.9416 20.3483 21.9686 20.2651 21.9842 20.178L23.9806 10.1961C24.0393 9.90234 23.9633 9.5977 23.7733 9.36601C23.5834 9.13432 23.2996 9 23 9H5C4.5313 9 4.12549 9.32553 4.02381 9.78307L4 9.89023V6ZM4.02439 19H20.1802L21.7802 11H5.80217L4.02439 19Z'
              fill='currentColor'
            />
          </g>
          <defs>
            <clipPath id='clip0_324_11783'>
              <rect width='24' height='24' fill='currentColor' />
            </clipPath>
          </defs>
        </svg>
      </Icon>
    );
  },
);

FolderOpen.displayName = 'FolderOpen';

export { FolderOpen };
