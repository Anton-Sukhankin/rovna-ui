import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Send = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-send-icon' {...props} ref={ref} color={_color}>
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
            d='M4.74278 3.62012C3.42905 3.09463 2 4.06214 2 5.47707V12V18.523C2 19.9379 3.42906 20.9054 4.74278 20.38L21.0502 13.857C22.7265 13.1865 22.7265 10.8136 21.0502 10.1431L4.74278 3.62012ZM4 13H9C9.55228 13 10 12.5523 10 12C10 11.4477 9.55228 11 9 11H4V5.47707L20.3074 12L4 18.523V13Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Send.displayName = 'Send';

export { Send };
