import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const House = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-house-icon' {...props} ref={ref} color={_color}>
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
            d='M11.3598 4.23178C11.7306 3.92274 12.2693 3.92274 12.6401 4.23178L16.9999 7.86496V5.5C16.9999 5.22386 17.2238 5 17.4999 5H18.4999C18.7761 5 18.9999 5.22386 18.9999 5.5L18.9999 9.5L20.6139 10.7552C20.9511 11.0175 21.0845 11.465 20.9458 11.8691C20.8072 12.2732 20.4271 12.5446 19.9999 12.5446H18.9999L18.9999 20C18.9999 20.5523 18.5522 21 17.9999 21H13.9999C13.4477 21 12.9999 20.5523 12.9999 20V16H10.9999V20C10.9999 20.5523 10.5522 21 9.99994 21H5.99994C5.44765 21 4.99994 20.5523 4.99994 20V12.5258H3.99371C3.56651 12.5258 3.18648 12.2544 3.04784 11.8503C2.9092 11.4463 3.04256 10.9987 3.37977 10.7365L11.3598 4.23178ZM11.9999 6.30171L16.9999 10.4684V11.5V19H14.9999V15C14.9999 14.4477 14.5522 14 13.9999 14H9.99994C9.44765 14 8.99994 14.4477 8.99994 15V19H6.99994V10.4684L11.9999 6.30171ZM11.9999 9C13.3807 9 14.4999 10.1193 14.4999 11.5H9.49994C9.49994 10.1193 10.6192 9 11.9999 9Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

House.displayName = 'House';

export { House };
