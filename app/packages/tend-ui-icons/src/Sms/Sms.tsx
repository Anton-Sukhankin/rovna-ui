import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Sms = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-sms-icon' {...props} ref={ref} color={_color}>
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
            d='M6 3C3.79086 3 2 4.79086 2 7V15C2 17.2091 3.79086 19 6 19V21C6 21.3788 6.214 21.725 6.55279 21.8944C6.89157 22.0638 7.29698 22.0273 7.6 21.8L11.3333 19H18C20.2091 19 22 17.2091 22 15V7C22 4.79086 20.2091 3 18 3H6ZM4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V15C20 16.1046 19.1046 17 18 17H11C10.7836 17 10.5731 17.0702 10.4 17.2L8 19V17H6C4.89543 17 4 16.1046 4 15V7ZM7.5 12.5C8.32843 12.5 9 11.8284 9 11C9 10.1716 8.32843 9.5 7.5 9.5C6.67157 9.5 6 10.1716 6 11C6 11.8284 6.67157 12.5 7.5 12.5ZM13.5 11C13.5 11.8284 12.8284 12.5 12 12.5C11.1716 12.5 10.5 11.8284 10.5 11C10.5 10.1716 11.1716 9.5 12 9.5C12.8284 9.5 13.5 10.1716 13.5 11ZM16.5 12.5C17.3284 12.5 18 11.8284 18 11C18 10.1716 17.3284 9.5 16.5 9.5C15.6716 9.5 15 10.1716 15 11C15 11.8284 15.6716 12.5 16.5 12.5Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Sms.displayName = 'Sms';

export { Sms };
