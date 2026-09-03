import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ImageCancel = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-image-cancel-icon' {...props} ref={ref} color={_color}>
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
            d='M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H13C13.5523 21 14 20.5523 14 20C14 19.4477 13.5523 19 13 19H6C5.44772 19 5 18.5523 5 18V6C5 5.44772 5.44772 5 6 5H18C18.5523 5 19 5.44772 19 6V13C19 13.5523 19.4477 14 20 14C20.5523 14 21 13.5523 21 13V6C21 4.34315 19.6569 3 18 3H6ZM14.9318 17L17 15L14 11L11 15L9 13L6 17H14.9318ZM21.4142 20L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3165 23.0976 21.6834 23.0976 21.2929 22.7071L20 21.4142L18.7071 22.7071C18.3166 23.0976 17.6835 23.0976 17.2929 22.7071C16.9024 22.3165 16.9024 21.6834 17.2929 21.2929L18.5858 20L17.2929 18.7071C16.9024 18.3166 16.9024 17.6834 17.2929 17.2929C17.6834 16.9024 18.3166 16.9024 18.7071 17.2929L20 18.5858L21.2929 17.2929C21.6834 16.9024 22.3166 16.9024 22.7071 17.2929C23.0976 17.6834 23.0976 18.3166 22.7071 18.7071L21.4142 20Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ImageCancel.displayName = 'ImageCancel';

export { ImageCancel };
