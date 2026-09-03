import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Photo = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-photo-icon' {...props} ref={ref} color={_color}>
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
            d='M9.33333 3C8.15784 3 7.18537 3.86924 7.02363 5H5C3.34315 5 2 6.34315 2 8V18C2 19.6569 3.34315 21 5 21H19C20.6569 21 22 19.6569 22 18V8C22 6.34315 20.6569 5 19 5H16.9764C16.8146 3.86924 15.8422 3 14.6667 3H9.33333ZM9 5.33333C9 5.14924 9.14924 5 9.33333 5H14.6667C14.8508 5 15 5.14924 15 5.33333C15 6.25381 15.7462 7 16.6667 7H19C19.5523 7 20 7.44772 20 8V18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18V8C4 7.44772 4.44772 7 5 7H7.33333C8.25381 7 9 6.25381 9 5.33333ZM9.5 13C9.5 11.6193 10.6193 10.5 12 10.5C13.3807 10.5 14.5 11.6193 14.5 13C14.5 14.3807 13.3807 15.5 12 15.5C10.6193 15.5 9.5 14.3807 9.5 13ZM12 8.5C9.51472 8.5 7.5 10.5147 7.5 13C7.5 15.4853 9.51472 17.5 12 17.5C14.4853 17.5 16.5 15.4853 16.5 13C16.5 10.5147 14.4853 8.5 12 8.5Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Photo.displayName = 'Photo';

export { Photo };
