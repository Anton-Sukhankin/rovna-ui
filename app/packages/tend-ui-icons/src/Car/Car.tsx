import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Car = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-car-icon' {...props} ref={ref} color={_color}>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M6.5 12.5C5.94772 12.5 5.5 12.9477 5.5 13.5C5.5 14.0523 5.94772 14.5 6.5 14.5C7.05228 14.5 7.5 14.0523 7.5 13.5C7.5 12.9477 7.05228 12.5 6.5 12.5Z'
            fill='currentColor'
          />
          <path
            d='M16.5 13.5C16.5 12.9477 16.9477 12.5 17.5 12.5C18.0523 12.5 18.5 12.9477 18.5 13.5C18.5 14.0523 18.0523 14.5 17.5 14.5C16.9477 14.5 16.5 14.0523 16.5 13.5Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M4.16964 9.6164L4.99159 5.85891C5.29286 4.48166 6.51247 3.5 7.92229 3.5H16.0777C17.4875 3.5 18.7071 4.48166 19.0084 5.85891L19.8304 9.6164C21.0833 9.97654 22 11.1312 22 12.5V14.5C22 15.8088 21.1619 16.9219 19.993 17.3318C19.9976 17.3872 20 17.4433 20 17.5V18.5C20 19.6046 19.1046 20.5 18 20.5H17C15.8954 20.5 15 19.6046 15 18.5V17.5H9V18.5C9 19.6046 8.10457 20.5 7 20.5H6C4.89543 20.5 4 19.6046 4 18.5V17.5C4 17.4433 4.00236 17.3872 4.00698 17.3318C2.83814 16.9219 2 15.8088 2 14.5V12.5C2 11.1312 2.91669 9.97655 4.16964 9.6164ZM6.94539 6.2863C7.04581 5.82722 7.45235 5.5 7.92229 5.5H16.0777C16.5476 5.5 16.9542 5.82722 17.0546 6.2863L17.7576 9.5H6.24239L6.94539 6.2863ZM19 15.5C19.5523 15.5 20 15.0523 20 14.5V12.5C20 11.9477 19.5523 11.5 19 11.5H5C4.44772 11.5 4 11.9477 4 12.5V14.5C4 15.0523 4.44772 15.5 5 15.5H19ZM17 17.5V18.5H18V17.5H17ZM6 18.5V17.5H7V18.5H6Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Car.displayName = 'Car';

export { Car };
