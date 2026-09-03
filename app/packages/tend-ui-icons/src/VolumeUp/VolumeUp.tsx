import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const VolumeUp = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-volume-up-icon' {...props} ref={ref} color={_color}>
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
            d='M16.4291 4.59673C15.9302 4.35975 15.3337 4.57204 15.0967 5.0709C14.8597 5.56975 15.072 6.16627 15.5709 6.40325C17.5752 7.3554 19 9.58021 19 11.9999C19 14.4197 17.5752 16.6446 15.5709 17.5967C15.072 17.8337 14.8597 18.4302 15.0967 18.9291C15.3337 19.4279 15.9302 19.6402 16.4291 19.4032C19.1547 18.1085 21 15.165 21 11.9999C21 8.83488 19.1547 5.89151 16.4291 4.59673ZM12.3827 5.07615C12.7564 5.23093 13 5.59557 13 6.00003V18C13 18.4045 12.7564 18.7691 12.3827 18.9239C12.009 19.0787 11.5789 18.9931 11.2929 18.7071L7.58579 15H5C4.44772 15 4 14.5523 4 14V10C4 9.44774 4.44772 9.00003 5 9.00003H7.58579L11.2929 5.29292C11.5789 5.00692 12.009 4.92137 12.3827 5.07615ZM11 8.41424L8.70711 10.7071C8.51957 10.8947 8.26522 11 8 11H6V13H8C8.26522 13 8.51957 13.1054 8.70711 13.2929L11 15.5858V8.41424ZM15 15.1913C15 15.563 15.3857 15.7912 15.676 15.559C16.5627 14.8497 17.5 13.5812 17.5 12.0002C17.5 10.4193 16.5628 9.1508 15.6761 8.44141C15.3858 8.20916 15 8.43733 15 8.80911V15.1913Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

VolumeUp.displayName = 'VolumeUp';

export { VolumeUp };
