import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ImageDone = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-image-done-icon' {...props} ref={ref} color={_color}>
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
            d='M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V13C21 13.5523 20.5523 14 20 14C19.4477 14 19 13.5523 19 13V6C19 5.44772 18.5523 5 18 5H6C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H12C12.5523 19 13 19.4477 13 20C13 20.5523 12.5523 21 12 21H6C4.34315 21 3 19.6569 3 18V6ZM23.7071 18.7071L20.0607 22.3536C19.4749 22.9393 18.5251 22.9393 17.9393 22.3536L16.2929 20.7071C15.9024 20.3166 15.9024 19.6834 16.2929 19.2929C16.6834 18.9024 17.3166 18.9024 17.7071 19.2929L19 20.5858L22.2929 17.2929C22.6834 16.9024 23.3166 16.9024 23.7071 17.2929C24.0976 17.6834 24.0976 18.3166 23.7071 18.7071ZM18 17L14 11L11 15L9 13L6 17H18Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ImageDone.displayName = 'ImageDone';

export { ImageDone };
