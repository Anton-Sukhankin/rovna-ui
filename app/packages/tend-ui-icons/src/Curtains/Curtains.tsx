import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Curtains = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-curtains-icon' {...props} ref={ref} color={_color}>
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
            d='M2 4.5C2 3.94772 2.44772 3.5 3 3.5L21 3.5C21.5523 3.5 22 3.94772 22 4.5C22 5.05229 21.5523 5.5 21 5.5L3 5.5C2.44772 5.5 2 5.05228 2 4.5Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M4 1.5C4.55228 1.5 5 1.94772 5 2.5V21.5C5 22.0523 4.55228 22.5 4 22.5C3.44772 22.5 3 22.0523 3 21.5V2.5C3 1.94772 3.44772 1.5 4 1.5Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8 1.5C8.55228 1.5 9 1.94772 9 2.5V6.5C9 7.05228 8.55228 7.5 8 7.5C7.44772 7.5 7 7.05228 7 6.5V2.5C7 1.94772 7.44772 1.5 8 1.5Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M12 1.5C12.5523 1.5 13 1.94772 13 2.5V6.5C13 7.05228 12.5523 7.5 12 7.5C11.4477 7.5 11 7.05228 11 6.5V2.5C11 1.94772 11.4477 1.5 12 1.5Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M16 1.5C16.5523 1.5 17 1.94772 17 2.5V6.5C17 7.05228 16.5523 7.5 16 7.5C15.4477 7.5 15 7.05228 15 6.5V2.5C15 1.94772 15.4477 1.5 16 1.5Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M20 1.5C20.5523 1.5 21 1.94772 21 2.5V21.5C21 22.0523 20.5523 22.5 20 22.5C19.4477 22.5 19 22.0523 19 21.5V2.5C19 1.94772 19.4477 1.5 20 1.5Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8.89443 21.0652C8.33137 20.7837 7.66863 20.7837 7.10557 21.0652L4.44721 22.3944C3.95324 22.6414 3.35256 22.4412 3.10557 21.9472C2.85858 21.4532 3.05881 20.8526 3.55279 20.6056L6.21115 19.2764C7.33726 18.7133 8.66274 18.7133 9.78885 19.2764L11.1056 19.9348C11.6686 20.2163 12.3314 20.2163 12.8944 19.9348L14.2111 19.2764C15.3373 18.7133 16.6627 18.7133 17.7889 19.2764L20.4472 20.6056C20.9412 20.8526 21.1414 21.4532 20.8944 21.9472C20.6474 22.4412 20.0468 22.6414 19.5528 22.3944L16.8944 21.0652C16.3314 20.7837 15.6686 20.7837 15.1056 21.0652L13.7889 21.7236C12.6627 22.2867 11.3373 22.2867 10.2111 21.7236L8.89443 21.0652Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Curtains.displayName = 'Curtains';

export { Curtains };
