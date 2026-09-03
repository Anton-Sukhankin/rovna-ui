import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const VolumeMute = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-volume-mute-icon' {...props} ref={ref} color={_color}>
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
            d='M15.3827 5.07615C15.7564 5.23093 16 5.59557 16 6.00003V18C16 18.4045 15.7564 18.7691 15.3827 18.9239C15.009 19.0787 14.5789 18.9931 14.2929 18.7071L10.5858 15H8C7.44772 15 7 14.5523 7 14V10C7 9.44774 7.44772 9.00003 8 9.00003H10.5858L14.2929 5.29292C14.5789 5.00692 15.009 4.92137 15.3827 5.07615ZM14 8.41424L11.7071 10.7071C11.5196 10.8947 11.2652 11 11 11H9V13H11C11.2652 13 11.5196 13.1054 11.7071 13.2929L14 15.5858V8.41424Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

VolumeMute.displayName = 'VolumeMute';

export { VolumeMute };
