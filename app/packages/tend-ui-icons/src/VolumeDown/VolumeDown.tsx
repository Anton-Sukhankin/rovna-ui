import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const VolumeDown = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-volume-down-icon' {...props} ref={ref} color={_color}>
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
            d='M14 6.00003C14 5.59557 13.7564 5.23093 13.3827 5.07615C13.009 4.92137 12.5789 5.00692 12.2929 5.29292L8.58579 9.00003H6C5.44772 9.00003 5 9.44774 5 10V14C5 14.5523 5.44772 15 6 15H8.58579L12.2929 18.7071C12.5789 18.9931 13.009 19.0787 13.3827 18.9239C13.7564 18.7691 14 18.4045 14 18V6.00003ZM9.70711 10.7071L12 8.41424V15.5858L9.70711 13.2929C9.51957 13.1054 9.26522 13 9 13H7V11H9C9.26522 11 9.51957 10.8947 9.70711 10.7071ZM16.676 15.559C16.3857 15.7912 16 15.563 16 15.1913V8.80911C16 8.43733 16.3858 8.20916 16.6761 8.44141C17.5628 9.1508 18.5 10.4193 18.5 12.0002C18.5 13.5812 17.5627 14.8497 16.676 15.559Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

VolumeDown.displayName = 'VolumeDown';

export { VolumeDown };
