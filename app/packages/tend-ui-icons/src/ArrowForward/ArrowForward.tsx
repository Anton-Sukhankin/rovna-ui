import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ArrowForward = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-arrow-forward-icon' {...props} ref={ref} color={_color}>
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
            d='M14.2672 6.81955C13.8914 7.22426 13.9148 7.85699 14.3195 8.2328L17.4535 11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H17.4535L14.3195 15.7672C13.9148 16.143 13.8914 16.7757 14.2672 17.1804C14.643 17.5852 15.2757 17.6086 15.6804 17.2328L20.6722 12.7405C20.6848 12.729 20.6972 12.7171 20.7094 12.7048C20.7898 12.6241 20.8536 12.5326 20.9007 12.435C20.9109 12.4139 20.9203 12.3926 20.9289 12.3711C20.9706 12.2668 20.9952 12.1539 20.9994 12.0358C20.9998 12.0238 21 12.0119 21 12C21 11.8559 20.9695 11.719 20.9147 11.5952C20.8665 11.4862 20.798 11.3842 20.7094 11.2952C20.6972 11.2829 20.6848 11.271 20.6722 11.2595L15.6804 6.76721C15.2757 6.39141 14.643 6.41484 14.2672 6.81955Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ArrowForward.displayName = 'ArrowForward';

export { ArrowForward };
