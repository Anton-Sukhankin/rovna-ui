import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Telegram = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-telegram-icon' {...props} ref={ref} color={_color}>
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
            d='M12.0605 17.475L15.4542 20.0855C16.321 20.7522 17.5869 20.3002 17.8354 19.2354L20.9592 5.84763C21.2291 4.69096 20.1144 3.6927 18.9944 4.08801L4.00326 9.37899C2.72085 9.8316 2.65029 11.6187 3.89301 12.171L6.76015 13.4453L7.55098 18.1902C7.68859 19.0159 8.50935 19.3554 9.15615 19.1253L12.0605 17.475ZM5.85817 10.8504L18.7988 6.28314L16.0598 18.0219L11.6825 14.6548L15.2071 11.1302C16.4133 9.92405 14.9971 7.95916 13.4714 8.72202L7.6351 11.6402L5.85817 10.8504ZM9.03687 14.9103L8.77079 13.3139L11.6054 11.8965L9.30401 14.1979L9.03687 14.9103Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Telegram.displayName = 'Telegram';

export { Telegram };
