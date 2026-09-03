import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Visibility = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-visibility-icon' {...props} ref={ref} color={_color}>
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
            d='M6.0504 15.5426C4.56823 14.2317 3.58409 12.7427 3.14453 12C3.58409 11.2573 4.56823 9.76829 6.0504 8.45742C7.57621 7.10795 9.56694 6 12 6C14.4332 6 16.4239 7.10795 17.9497 8.45742C19.4319 9.76829 20.416 11.2573 20.8556 12C20.416 12.7427 19.4319 14.2317 17.9497 15.5426C16.4239 16.892 14.4332 18 12 18C9.56694 18 7.57621 16.892 6.0504 15.5426ZM12 4C8.92089 4 6.4781 5.40916 4.72541 6.95929C2.97579 8.5067 1.85124 10.2471 1.37692 11.0604C1.03679 11.6436 1.0368 12.3564 1.37692 12.9396C1.85124 13.7529 2.97579 15.4933 4.72541 17.0407C6.47811 18.5908 8.92089 20 12 20C15.0792 20 17.522 18.5908 19.2747 17.0407C21.0243 15.4933 22.1489 13.7529 22.6232 12.9396C22.9633 12.3564 22.9633 11.6436 22.6232 11.0604C22.1488 10.2471 21.0243 8.5067 19.2747 6.95929C17.522 5.40916 15.0792 4 12 4ZM9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12ZM12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Visibility.displayName = 'Visibility';

export { Visibility };
