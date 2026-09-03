import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Cup = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-cup-icon' {...props} ref={ref} color={_color}>
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
            d='M5.58056 11.7957C6.53218 13.9777 8.56375 15.5806 11 15.9291V17H9.33333C7.49238 17 6 18.4924 6 20.3333C6 21.2538 6.74619 22 7.66667 22H16.3333C17.2538 22 18 21.2538 18 20.3333C18 18.4924 16.5076 17 14.6667 17H13V15.9291C15.4362 15.5806 17.4678 13.9777 18.4194 11.7957C18.6184 11.7368 18.8122 11.666 19 11.584C20.7659 10.8124 22 9.05032 22 7C22 5.34315 20.6569 4 19 4H18.4649C17.7733 2.8044 16.4806 2 15 2H9C7.51944 2 6.22675 2.8044 5.53513 4H5C3.34315 4 2 5.34315 2 7C2 9.05032 3.2341 10.8124 5 11.584C5.18779 11.666 5.38159 11.7368 5.58056 11.7957ZM15 4H9C7.89543 4 7 4.89543 7 6V9C7 11.7614 9.23858 14 12 14C14.7614 14 17 11.7614 17 9V6C17 4.89543 16.1046 4 15 4ZM5 6C4.44772 6 4 6.44772 4 7C4 7.8885 4.38625 8.68679 5 9.23611V6ZM19 6C19.5523 6 20 6.44772 20 7C20 7.8885 19.6137 8.68679 19 9.23611V6ZM9.33333 19C8.71205 19 8.19002 19.4249 8.04201 20H15.958C15.81 19.4249 15.2879 19 14.6667 19H9.33333Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Cup.displayName = 'Cup';

export { Cup };
