import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Like = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-like-icon' {...props} ref={ref} color={_color}>
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
            d='M7.8591 8.04859L10.8203 3.60678C11.3854 2.75914 12.3367 2.25 13.3555 2.25C15.4625 2.25 16.9335 4.3374 16.2248 6.32166L15.179 9.25L18.7269 9.25C20.8807 9.25 22.3328 11.4522 21.4844 13.4318L19.2182 18.7196C18.4303 20.558 16.6226 21.75 14.6224 21.75H12.2043C11.4281 21.75 10.6625 21.5693 9.96821 21.2221L7.99947 20.2378C7.65543 20.8423 7.00533 21.25 6.26001 21.25H4.26001C3.15544 21.25 2.26001 20.3546 2.26001 19.25V9.25C2.26001 8.14543 3.15544 7.25 4.26001 7.25H6.26001C6.9137 7.25 7.49415 7.56361 7.8591 8.04859ZM12.4844 4.71618C12.6786 4.42494 13.0054 4.25 13.3555 4.25C14.0794 4.25 14.5849 4.96721 14.3414 5.64899L13.2955 8.57733C12.8304 9.87981 13.7959 11.25 15.179 11.25H18.7269C19.4448 11.25 19.9289 11.9841 19.6461 12.6439L17.3799 17.9318C16.9071 19.0348 15.8225 19.75 14.6224 19.75H12.2043C11.7385 19.75 11.2792 19.6416 10.8626 19.4333L8.26001 18.132V11.0528L12.4844 4.71618ZM6.26001 9.25H4.26001L4.26001 19.25H6.26001V9.25Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Like.displayName = 'Like';

export { Like };
