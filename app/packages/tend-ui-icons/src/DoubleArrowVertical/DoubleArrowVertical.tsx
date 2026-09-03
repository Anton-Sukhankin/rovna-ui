import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const DoubleArrowVertical = React.forwardRef<
  HTMLSpanElement,
  Omit<IconProps, 'children'>
>(({ color, ...props }, ref) => {
  const _color = useColor(color);

  return (
    <Icon
      data-testid='rovna-ui-double-arrow-vertical-icon'
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
          d='M4.29289 7.7071C3.90237 7.31658 3.90237 6.68342 4.29289 6.29289L7.29231 3.29348C7.63401 2.95177 8.16208 2.90847 8.55023 3.16475C8.60568 3.20136 8.65829 3.24408 8.70711 3.29289L11.7071 6.29289C12.0976 6.68342 12.0976 7.31658 11.7071 7.70711C11.3166 8.09763 10.6834 8.09763 10.2929 7.70711L9 6.41421L9 14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14L7 6.41421L5.70711 7.7071C5.31658 8.09763 4.68342 8.09763 4.29289 7.7071ZM15 10V17.5858L13.7071 16.2929C13.3166 15.9024 12.6834 15.9024 12.2929 16.2929C11.9024 16.6834 11.9024 17.3166 12.2929 17.7071L15.2929 20.7071C15.6834 21.0976 16.3166 21.0976 16.7071 20.7071L19.7071 17.7071C20.0976 17.3166 20.0976 16.6834 19.7071 16.2929C19.3166 15.9024 18.6834 15.9024 18.2929 16.2929L17 17.5858V10C17 9.44771 16.5523 9 16 9C15.4477 9 15 9.44771 15 10Z'
          fill='currentColor'
        />
      </svg>
    </Icon>
  );
});

DoubleArrowVertical.displayName = 'DoubleArrowVertical';

export { DoubleArrowVertical };
