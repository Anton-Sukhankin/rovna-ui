import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const OpenInNewDown = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-open-in-new-down-icon'
        {...props}
        ref={ref}
        color={_color}
      >
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
            d='M20.9241 20.3828C20.8753 20.5007 20.803 20.6112 20.7071 20.7071C20.5261 20.8881 20.2761 21 20 21H15C14.4477 21 14 20.5523 14 20C14 19.4477 14.4477 19 15 19H17.5858L11.2929 12.7071C10.9024 12.3166 10.9024 11.6834 11.2929 11.2929C11.6834 10.9024 12.3166 10.9024 12.7071 11.2929L19 17.5858L19 15C19 14.4477 19.4477 14 20 14C20.5523 14 21 14.4477 21 15L21 19.9955C21 20.0001 21 20.0047 21 20.0092C20.9988 20.1364 20.9735 20.2634 20.9241 20.3828ZM5 18C5 18.5523 5.44772 19 6 19H10C10.5523 19 11 19.4477 11 20C11 20.5523 10.5523 21 10 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V10C21 10.5523 20.5523 11 20 11C19.4477 11 19 10.5523 19 10V6C19 5.44771 18.5523 5 18 5H6C5.44772 5 5 5.44772 5 6V18Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

OpenInNewDown.displayName = 'OpenInNewDown';

export { OpenInNewDown };
