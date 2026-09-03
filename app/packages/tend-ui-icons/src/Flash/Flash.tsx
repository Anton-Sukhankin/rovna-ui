import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Flash = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-flash-icon' {...props} ref={ref} color={_color}>
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
            d='M13.3198 2.05252C13.7263 2.18974 14 2.57096 14 3V9.5H19C19.3801 9.5 19.7274 9.71553 19.8961 10.0562C20.0648 10.3968 20.0258 10.8037 19.7954 11.106L11.7954 21.606C11.5354 21.9473 11.0867 22.0847 10.6802 21.9475C10.2737 21.8103 10 21.429 10 21V14.5H5.00001C4.61987 14.5 4.27261 14.2845 4.10389 13.9438C3.93518 13.6032 3.9742 13.1963 4.20457 12.894L12.2046 2.39396C12.4646 2.05269 12.9133 1.91531 13.3198 2.05252ZM7.01909 12.5H11C11.5523 12.5 12 12.9477 12 13.5V18.0375L16.9809 11.5H13C12.4477 11.5 12 11.0523 12 10.5V5.96255L7.01909 12.5Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Flash.displayName = 'Flash';

export { Flash };
