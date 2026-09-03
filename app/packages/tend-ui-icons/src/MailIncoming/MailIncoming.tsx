import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const MailIncoming = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-mail-incoming-icon' {...props} ref={ref} color={_color}>
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
            d='M5 4C3.34315 4 2 5.34315 2 7V17C2 18.6569 3.34315 20 5 20H11C11.5523 20 12 19.5523 12 19C12 18.4477 11.5523 18 11 18H5C4.44772 18 4 17.5523 4 17V7.25006L10.2 11.9001C11.2667 12.7001 12.7333 12.7001 13.8 11.9001L20 7.25006V11C20 11.5523 20.4477 12 21 12C21.5523 12 22 11.5523 22 11V7C22 5.34315 20.6569 4 19 4H5ZM18.3334 6H5.66659L11.4 10.3001C11.7556 10.5667 12.2444 10.5667 12.6 10.3001L18.3334 6ZM22 20C22.5523 20 23 19.5523 23 19C23 18.4477 22.5523 18 22 18L18.4142 18L19.7071 16.7071C20.0976 16.3166 20.0976 15.6834 19.7071 15.2929C19.3166 14.9024 18.6834 14.9024 18.2929 15.2929L15.2929 18.2929C14.9024 18.6834 14.9024 19.3166 15.2929 19.7071L18.2929 22.7071C18.6834 23.0976 19.3166 23.0976 19.7071 22.7071C20.0976 22.3166 20.0976 21.6834 19.7071 21.2929L18.4142 20L22 20Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

MailIncoming.displayName = 'MailIncoming';

export { MailIncoming };
