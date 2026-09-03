import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Pause = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-pause-icon' {...props} ref={ref} color={_color}>
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
            d='M7 5C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19H9C10.1046 19 11 18.1046 11 17V7C11 5.89543 10.1046 5 9 5H7ZM7 7L9 7V17H7V7ZM15 5C13.8954 5 13 5.89543 13 7V17C13 18.1046 13.8954 19 15 19H17C18.1046 19 19 18.1046 19 17V7C19 5.89543 18.1046 5 17 5H15ZM15 7L17 7V17H15V7Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Pause.displayName = 'Pause';

export { Pause };
