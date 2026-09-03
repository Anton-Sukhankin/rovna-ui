import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ImageAdd = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-image-add-icon' {...props} ref={ref} color={_color}>
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
            d='M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H12C12.5523 21 13 20.5523 13 20C13 19.4477 12.5523 19 12 19H6C5.44772 19 5 18.5523 5 18V6C5 5.44772 5.44772 5 6 5H18C18.5523 5 19 5.44772 19 6V12C19 12.5523 19.4477 13 20 13C20.5523 13 21 12.5523 21 12V6C21 4.34315 19.6569 3 18 3H6ZM16 14L14 11L11 15L9 13L6 17H16V14ZM20 16C20.5523 16 21 16.4477 21 17V19H23C23.5523 19 24 19.4477 24 20C24 20.5523 23.5523 21 23 21H21V23C21 23.5523 20.5523 24 20 24C19.4477 24 19 23.5523 19 23V21H17C16.4477 21 16 20.5523 16 20C16 19.4477 16.4477 19 17 19H19V17C19 16.4477 19.4477 16 20 16Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ImageAdd.displayName = 'ImageAdd';

export { ImageAdd };
