import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const TimerAuto = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-timer-auto-icon' {...props} ref={ref} color={_color}>
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
            d='M9 2C9 1.44772 9.44772 1 10 1H14C14.5523 1 15 1.44772 15 2C15 2.55228 14.5523 3 14 3H10C9.44772 3 9 2.55228 9 2ZM12 6C8.13401 6 5 9.13401 5 13C5 16.866 8.13401 20 12 20C15.866 20 19 16.866 19 13C19 9.13401 15.866 6 12 6ZM3 13C3 8.02944 7.02944 4 12 4C14.125 4 16.078 4.73647 17.6177 5.9681L18.2929 5.29289C18.6834 4.90237 19.3166 4.90237 19.7071 5.29289C20.0976 5.68342 20.0976 6.31658 19.7071 6.70711L19.0319 7.38231C20.2635 8.92199 21 10.875 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13ZM12 8C12.4 8 12.7616 8.2384 12.9192 8.60608L15.9192 15.6061C16.1367 16.1137 15.9016 16.7016 15.3939 16.9191C14.8863 17.1367 14.2984 16.9015 14.0809 16.3939L13.4835 15H10.5166L9.91916 16.3939C9.7016 16.9015 9.11372 17.1367 8.60609 16.9191C8.09846 16.7016 7.86331 16.1137 8.08087 15.6061L11.0809 8.60608C11.2384 8.2384 11.6 8 12 8ZM11.3737 13H12.6263L12 11.5386L11.3737 13Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

TimerAuto.displayName = 'TimerAuto';

export { TimerAuto };
