import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const VideoDone = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-video-done-icon' {...props} ref={ref} color={_color}>
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
            d='M2 7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7V12C22 12.5523 21.5523 13 21 13C20.4477 13 20 12.5523 20 12V7C20 6.44772 19.5523 6 19 6H5C4.44772 6 4 6.44772 4 7V17C4 17.5523 4.44772 18 5 18H12C12.5523 18 13 18.4477 13 19C13 19.5523 12.5523 20 12 20H5C3.34315 20 2 18.6569 2 17V7ZM9 14.2768V9.72316C9 8.95533 9.82948 8.47397 10.4961 8.85491L14.4806 11.1317C15.1524 11.5156 15.1524 12.4843 14.4806 12.8682L10.4961 15.145C9.82948 15.526 9 15.0446 9 14.2768ZM20.0607 21.3536L23.7071 17.7071C24.0976 17.3166 24.0976 16.6834 23.7071 16.2929C23.3166 15.9024 22.6834 15.9024 22.2929 16.2929L19 19.5858L17.7071 18.2929C17.3166 17.9024 16.6834 17.9024 16.2929 18.2929C15.9024 18.6834 15.9024 19.3166 16.2929 19.7071L17.9393 21.3536C18.5251 21.9393 19.4749 21.9393 20.0607 21.3536Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

VideoDone.displayName = 'VideoDone';

export { VideoDone };
