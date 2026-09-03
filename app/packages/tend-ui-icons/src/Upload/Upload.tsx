import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Upload = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-upload-icon' {...props} ref={ref} color={_color}>
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
            d='M6 21C4.34315 21 3 19.6569 3 18L3 13C3 12.4477 3.44772 12 4 12C4.55228 12 5 12.4477 5 13L5 18C5 18.5523 5.44772 19 6 19L18 19C18.5523 19 19 18.5523 19 18V13C19 12.4477 19.4477 12 20 12C20.5523 12 21 12.4477 21 13L21 18C21 19.6569 19.6569 21 18 21L6 21ZM12 15C11.4477 15 11 14.5523 11 14L11 6.41423L8.70711 8.70712C8.31658 9.09765 7.68342 9.09765 7.29289 8.70712C6.90237 8.3166 6.90237 7.68343 7.29289 7.29291L11.2929 3.29291C11.6834 2.90238 12.3166 2.90238 12.7071 3.29291L16.7071 7.29291C17.0976 7.68343 17.0976 8.3166 16.7071 8.70712C16.3166 9.09765 15.6834 9.09765 15.2929 8.70712L13 6.41423L13 14C13 14.5523 12.5523 15 12 15Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Upload.displayName = 'Upload';

export { Upload };
