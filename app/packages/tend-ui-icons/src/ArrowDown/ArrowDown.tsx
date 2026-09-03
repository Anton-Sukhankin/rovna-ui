import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ArrowDown = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-arrow-down-icon' {...props} ref={ref} color={_color}>
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
            d='M17.1804 14.2672C16.7757 13.8914 16.143 13.9148 15.7672 14.3195L13 17.4535V4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4V17.4535L8.2328 14.3195C7.85699 13.9148 7.22426 13.8914 6.81955 14.2672C6.41484 14.643 6.39141 15.2757 6.76721 15.6804L11.2595 20.6722C11.271 20.6848 11.2829 20.6972 11.2952 20.7094C11.3759 20.7898 11.4674 20.8536 11.565 20.9007C11.5861 20.9109 11.6074 20.9203 11.6289 20.9289C11.7332 20.9706 11.8461 20.9952 11.9642 20.9994C11.9762 20.9998 11.9881 21 12 21C12.1441 21 12.281 20.9695 12.4048 20.9147C12.5138 20.8665 12.6158 20.798 12.7048 20.7094C12.7171 20.6972 12.729 20.6848 12.7405 20.6722L17.2328 15.6804C17.6086 15.2757 17.5852 14.643 17.1804 14.2672Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ArrowDown.displayName = 'ArrowDown';

export { ArrowDown };
