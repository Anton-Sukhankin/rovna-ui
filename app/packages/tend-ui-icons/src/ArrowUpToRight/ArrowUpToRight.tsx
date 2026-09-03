import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ArrowUpToRight = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-arrow-up-to-right-icon'
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
            d='M4.5 2C5.05228 2 5.5 2.44772 5.5 3V11.5C5.5 13.7091 7.29086 15.5 9.5 15.5H16.894L13.831 12.7433C13.4205 12.3738 13.3872 11.7415 13.7567 11.331C14.1262 10.9205 14.7585 10.8872 15.169 11.2567L20.169 15.7567C20.3797 15.9463 20.5 16.2165 20.5 16.5C20.5 16.7835 20.3797 17.0537 20.169 17.2433L15.169 21.7433C14.7585 22.1128 14.1262 22.0795 13.7567 21.669C13.3872 21.2585 13.4205 20.6262 13.831 20.2567L16.894 17.5H9.5C6.18629 17.5 3.5 14.8137 3.5 11.5V3C3.5 2.44772 3.94772 2 4.5 2Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ArrowUpToRight.displayName = 'ArrowUpToRight';

export { ArrowUpToRight };
