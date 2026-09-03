import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const GridView = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-grid-view-icon' {...props} ref={ref} color={_color}>
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
            d='M3.5 5.5C3.5 4.39543 4.39543 3.5 5.5 3.5H18.5C19.6046 3.5 20.5 4.39543 20.5 5.5V18.5C20.5 19.6046 19.6046 20.5 18.5 20.5H5.5C4.39543 20.5 3.5 19.6046 3.5 18.5V5.5ZM18.5 5.5H15.5V8.5H18.5V5.5ZM10.5 5.5H13.5V8.5H10.5V5.5ZM10.5 10.5H13.5V13.5H10.5V10.5ZM8.5 13.5V10.5H5.5V13.5H8.5ZM5.5 15.5H8.5V18.5H5.5V15.5ZM10.5 15.5H13.5V18.5H10.5V15.5ZM15.5 15.5V18.5H18.5V15.5H15.5ZM18.5 13.5V10.5H15.5V13.5H18.5ZM8.5 8.5V5.5H5.5V8.5H8.5Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

GridView.displayName = 'GridView';

export { GridView };
