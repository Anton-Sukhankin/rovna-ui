import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ArrowUp = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-arrow-up-icon' {...props} ref={ref} color={_color}>
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
            d='M17.1804 9.7328C16.7757 10.1086 16.143 10.0852 15.7672 9.68046L13 6.54655V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.54655L8.2328 9.68046C7.85699 10.0852 7.22426 10.1086 6.81955 9.7328C6.41484 9.357 6.39141 8.72426 6.76721 8.31955L11.2595 3.32783C11.271 3.31519 11.2829 3.30278 11.2952 3.29062C11.3759 3.21024 11.4674 3.1464 11.565 3.09927C11.5861 3.0891 11.6074 3.07971 11.6289 3.07111C11.7332 3.02942 11.8461 3.00478 11.9642 3.00063C11.9762 3.00021 11.9881 3 12 3C12.1441 3 12.281 3.03047 12.4048 3.08532C12.5138 3.1335 12.6158 3.20201 12.7048 3.29062C12.7171 3.30278 12.729 3.31519 12.7405 3.32783L17.2328 8.31955C17.6086 8.72426 17.5852 9.357 17.1804 9.7328Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ArrowUp.displayName = 'ArrowUp';

export { ArrowUp };
