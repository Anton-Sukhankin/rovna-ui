import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const UserCancel = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-user-cancel-icon' {...props} ref={ref} color={_color}>
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
            d='M9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6ZM5 8C5 5.79086 6.79086 4 9 4C11.2091 4 13 5.79086 13 8C13 10.2091 11.2091 12 9 12C6.79086 12 5 10.2091 5 8ZM2.13193 14.6594C3.23403 13.9698 5.42669 13 9 13C12.5733 13 14.766 13.9698 15.8681 14.6594C16.6831 15.1694 17 16.0497 17 16.8284V18C17 19.1046 16.1046 20 15 20H3C1.89543 20 1 19.1046 1 18V16.8284C1 16.0497 1.31691 15.1694 2.13193 14.6594ZM9 15C5.80975 15 3.98359 15.86 3.19282 16.3548C3.10852 16.4076 3 16.5463 3 16.8284V18H15V16.8284C15 16.5463 14.8915 16.4076 14.8072 16.3548C14.0164 15.86 12.1902 15 9 15Z'
            fill='currentColor'
          />
          <path
            d='M16.2929 7.2999C16.6834 6.90938 17.3166 6.90938 17.7071 7.2999L19 8.59277L20.2929 7.29987C20.6834 6.90935 21.3166 6.90935 21.7071 7.29987C22.0976 7.6904 22.0976 8.32356 21.7071 8.71409L20.4142 10.007L21.7071 11.2999C22.0976 11.6904 22.0976 12.3236 21.7071 12.7141C21.3165 13.1046 20.6834 13.1046 20.2929 12.7141L19 11.4212L17.7071 12.7141C17.3166 13.1046 16.6834 13.1046 16.2929 12.7141C15.9024 12.3235 15.9024 11.6904 16.2929 11.2998L17.5858 10.007L16.2929 8.71412C15.9024 8.32359 15.9024 7.69043 16.2929 7.2999Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

UserCancel.displayName = 'UserCancel';

export { UserCancel };
