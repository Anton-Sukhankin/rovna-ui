import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ShieldRemove = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-shield-remove-icon' {...props} ref={ref} color={_color}>
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
            d='M13.1818 2.41859C12.4271 2.09517 11.5729 2.09517 10.8182 2.41859L5.21216 4.8212C4.47745 5.13607 4 5.85808 4 6.65886V13.0001C4 16.4478 6.02732 18.7128 7.91876 20.0638C8.86768 20.7416 9.81013 21.212 10.5123 21.513C10.8649 21.6641 11.1606 21.774 11.3714 21.8472C11.4871 21.8873 11.6034 21.9262 11.721 21.9604C11.721 21.9604 11.86 21.9979 12 22C12.1242 22.0019 12.2492 21.969 12.279 21.9604C12.3966 21.9262 12.5129 21.8873 12.6286 21.8472C12.8394 21.774 13.1351 21.6641 13.4877 21.513C14.1899 21.212 15.1323 20.7416 16.0812 20.0638C17.9727 18.7128 20 16.4478 20 13.0001V6.65886C20 5.85808 19.5225 5.13607 18.7878 4.8212L13.1818 2.41859ZM12.6998 19.6747C12.4116 19.7982 12.1708 19.8884 12 19.9483C11.8292 19.8884 11.5884 19.7982 11.3002 19.6747C10.6899 19.4131 9.88232 19.0086 9.08124 18.4364C7.47268 17.2874 6 15.5524 6 13.0001V6.65949L11.6061 4.25688C11.8576 4.14907 12.1424 4.14907 12.3939 4.25688L18 6.65949V13.0001C18 15.5524 16.5273 17.2874 14.9188 18.4364C14.1177 19.0086 13.3101 19.4131 12.6998 19.6747ZM9 11C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H9Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ShieldRemove.displayName = 'ShieldRemove';

export { ShieldRemove };
