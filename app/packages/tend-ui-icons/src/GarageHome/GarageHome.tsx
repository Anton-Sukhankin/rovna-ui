import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const GarageHome = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-garage-home-icon' {...props} ref={ref} color={_color}>
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
            d='M12.5812 3.18627C12.2335 2.93791 11.7665 2.93791 11.4188 3.18627L4.41876 8.18627C4.15597 8.37398 4 8.67705 4 9V20C4 20.5523 4.44772 21 5 21H8H16H19C19.5523 21 20 20.5523 20 20V9C20 8.67705 19.844 8.37398 19.5812 8.18627L12.5812 3.18627ZM7 19H6V9.51462L12 5.2289L18 9.51462V19H17V12C17 11.4477 16.5523 11 16 11H8C7.44772 11 7 11.4477 7 12V19ZM15 17V19H9V17H15ZM15 15V13H9V15H15Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

GarageHome.displayName = 'GarageHome';

export { GarageHome };
