import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const MailFavorite = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-mail-favorite-icon' {...props} ref={ref} color={_color}>
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
            d='M2 7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7V11C22 11.5523 21.5523 12 21 12C20.4477 12 20 11.5523 20 11V7.25006L13.8 11.9001C12.7333 12.7001 11.2667 12.7001 10.2 11.9001L4 7.25006V17C4 17.5523 4.44772 18 5 18H12C12.5523 18 13 18.4477 13 19C13 19.5523 12.5523 20 12 20H5C3.34315 20 2 18.6569 2 17V7ZM5.66659 6H18.3334L12.6 10.3001C12.2444 10.5667 11.7556 10.5667 11.4 10.3001L5.66659 6ZM21.0817 17.3451L20.1816 15.3938C20.1101 15.2388 19.8899 15.2388 19.8184 15.3938L18.9183 17.3451C18.8892 17.4083 18.8294 17.4518 18.7603 17.46L16.6264 17.713C16.4569 17.7331 16.3888 17.9425 16.5141 18.0584L18.0918 19.5174C18.1428 19.5646 18.1657 19.635 18.1522 19.7032L17.7334 21.8109C17.7001 21.9783 17.8783 22.1077 18.0272 22.0244L19.9023 20.9748C19.963 20.9408 20.037 20.9408 20.0977 20.9748L21.9728 22.0244C22.1217 22.1077 22.2999 21.9783 22.2666 21.8109L21.8478 19.7032C21.8343 19.635 21.8572 19.5646 21.9082 19.5174L23.4859 18.0584C23.6112 17.9425 23.5431 17.7331 23.3736 17.713L21.2397 17.46C21.1706 17.4518 21.1108 17.4083 21.0817 17.3451Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

MailFavorite.displayName = 'MailFavorite';

export { MailFavorite };
