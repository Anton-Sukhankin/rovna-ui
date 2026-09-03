import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Box = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-box-icon' {...props} ref={ref} color={_color}>
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
            d='M13.2884 2.35293C12.4914 1.88236 11.5086 1.88236 10.7116 2.35293L4.28305 6.14881C3.48895 6.6177 3 7.48264 3 8.41849V15.5815C3 16.5174 3.48895 17.3823 4.28305 17.8512L10.7116 21.6471C11.5086 22.1176 12.4914 22.1176 13.2884 21.6471L19.717 17.8512C20.5111 17.3823 21 16.5174 21 15.5815V8.41849C21 7.48264 20.5111 6.6177 19.717 6.14881L13.2884 2.35293ZM11.5705 3.86605C11.8362 3.70919 12.1638 3.70919 12.4295 3.86605L18.5735 7.4939L12 11.2185L5.42654 7.49389L11.5705 3.86605ZM4.71429 9.09042V15.5815C4.71429 15.8935 4.87727 16.1818 5.14197 16.3381L11.1429 19.8814V12.7329L4.71429 9.09042ZM12.8571 19.8814L18.858 16.3381C19.1227 16.1818 19.2857 15.8935 19.2857 15.5815V9.09042L12.8571 12.7329V19.8814Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Box.displayName = 'Box';

export { Box };
