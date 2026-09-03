import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ArrowBack = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-arrow-back-icon' {...props} ref={ref} color={_color}>
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
            d='M9.7328 6.81955C10.1086 7.22426 10.0852 7.85699 9.68046 8.2328L6.54655 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.54655L9.68046 15.7672C10.0852 16.143 10.1086 16.7757 9.7328 17.1804C9.357 17.5852 8.72426 17.6086 8.31955 17.2328L3.32783 12.7405C3.31519 12.729 3.30278 12.7171 3.29062 12.7048C3.21024 12.6241 3.1464 12.5326 3.09927 12.435C3.0891 12.4139 3.07971 12.3926 3.07111 12.3711C3.02942 12.2668 3.00478 12.1539 3.00063 12.0358C3.00021 12.0238 3 12.0119 3 12C3 11.8559 3.03047 11.719 3.08532 11.5952C3.1335 11.4862 3.20201 11.3842 3.29062 11.2952C3.30278 11.2829 3.31519 11.271 3.32783 11.2595L8.31955 6.76721C8.72426 6.39141 9.357 6.41484 9.7328 6.81955Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ArrowBack.displayName = 'ArrowBack';

export { ArrowBack };
