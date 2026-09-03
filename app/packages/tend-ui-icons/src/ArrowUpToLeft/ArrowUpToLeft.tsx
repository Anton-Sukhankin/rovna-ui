import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ArrowUpToLeft = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-arrow-up-to-left-icon'
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
            d='M19.5 2C18.9477 2 18.5 2.44772 18.5 3V11.5C18.5 13.7091 16.7091 15.5 14.5 15.5H7.10596L10.169 12.7433C10.5795 12.3738 10.6128 11.7415 10.2433 11.331C9.87384 10.9205 9.24155 10.8872 8.83104 11.2567L3.83104 15.7567C3.62032 15.9463 3.5 16.2165 3.5 16.5C3.5 16.7835 3.62032 17.0537 3.83104 17.2433L8.83104 21.7433C9.24155 22.1128 9.87384 22.0795 10.2433 21.669C10.6128 21.2585 10.5795 20.6262 10.169 20.2567L7.10596 17.5H14.5C17.8137 17.5 20.5 14.8137 20.5 11.5V3C20.5 2.44772 20.0523 2 19.5 2Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ArrowUpToLeft.displayName = 'ArrowUpToLeft';

export { ArrowUpToLeft };
