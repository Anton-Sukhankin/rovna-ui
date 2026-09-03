import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const PhotoDone = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-photo-done-icon' {...props} ref={ref} color={_color}>
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
            d='M7.02363 5C7.18537 3.86924 8.15784 3 9.33333 3H14.6667C15.8422 3 16.8146 3.86924 16.9764 5H19C20.6569 5 22 6.34315 22 8V13C22 13.5523 21.5523 14 21 14C20.4477 14 20 13.5523 20 13V8C20 7.44772 19.5523 7 19 7H16.6667C15.7462 7 15 6.25381 15 5.33333C15 5.14924 14.8508 5 14.6667 5H9.33333C9.14924 5 9 5.14924 9 5.33333C9 6.25381 8.25381 7 7.33333 7H5C4.44772 7 4 7.44772 4 8V18C4 18.5523 4.44772 19 5 19H12C12.5523 19 13 19.4477 13 20C13 20.5523 12.5523 21 12 21H5C3.34315 21 2 19.6569 2 18V8C2 6.34315 3.34315 5 5 5H7.02363ZM12 10.5C10.6193 10.5 9.5 11.6193 9.5 13C9.5 14.3807 10.6193 15.5 12 15.5C13.3807 15.5 14.5 14.3807 14.5 13C14.5 11.6193 13.3807 10.5 12 10.5ZM7.5 13C7.5 10.5147 9.51472 8.5 12 8.5C14.4853 8.5 16.5 10.5147 16.5 13C16.5 15.4853 14.4853 17.5 12 17.5C9.51472 17.5 7.5 15.4853 7.5 13ZM20.0607 22.3536L23.7071 18.7071C24.0976 18.3166 24.0976 17.6834 23.7071 17.2929C23.3166 16.9024 22.6834 16.9024 22.2929 17.2929L19 20.5858L17.7071 19.2929C17.3166 18.9024 16.6834 18.9024 16.2929 19.2929C15.9024 19.6834 15.9024 20.3166 16.2929 20.7071L17.9393 22.3536C18.5251 22.9393 19.4749 22.9393 20.0607 22.3536Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

PhotoDone.displayName = 'PhotoDone';

export { PhotoDone };
