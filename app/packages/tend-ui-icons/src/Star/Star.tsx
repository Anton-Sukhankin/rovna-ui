import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Star = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-star-icon' {...props} ref={ref} color={_color}>
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
            d='M12 2C12.3901 2 12.7446 2.22689 12.908 2.58115L15.495 8.18958L21.6283 8.91679C22.0157 8.96272 22.341 9.22977 22.4616 9.60081C22.5822 9.97185 22.4759 10.3791 22.1895 10.644L17.655 14.8374L18.8587 20.8953C18.9347 21.2779 18.7812 21.6699 18.4656 21.8992C18.15 22.1285 17.7298 22.1533 17.3894 21.9628L12 18.946L6.61057 21.9628C6.27014 22.1533 5.84997 22.1285 5.53434 21.8992C5.21872 21.6699 5.06527 21.2779 5.1413 20.8953L6.34499 14.8374L1.81046 10.644C1.52403 10.3791 1.4178 9.97185 1.53836 9.60081C1.65892 9.22977 1.98425 8.96272 2.37167 8.91679L8.505 8.18958L11.0919 2.58115C11.2553 2.22689 11.6098 2 12 2ZM12 5.38751L10.0867 9.53556C9.941 9.85137 9.64171 10.0688 9.29635 10.1098L4.76007 10.6476L8.11386 13.7491C8.3692 13.9852 8.48351 14.3371 8.41573 14.6782L7.52547 19.1586L11.5115 16.9274C11.815 16.7575 12.1849 16.7575 12.4884 16.9274L16.4745 19.1586L15.5842 14.6782C15.5164 14.3371 15.6308 13.9852 15.8861 13.7491L19.2399 10.6476L14.7036 10.1098C14.3582 10.0688 14.059 9.85137 13.9133 9.53556L12 5.38751Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Star.displayName = 'Star';

export { Star };
