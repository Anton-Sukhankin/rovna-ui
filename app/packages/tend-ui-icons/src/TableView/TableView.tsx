import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const TableView = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-table-view-icon' {...props} ref={ref} color={_color}>
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
            d='M5 3.5C3.89543 3.5 3 4.39543 3 5.5V9.5V14.5V18.5C3 19.6046 3.89543 20.5 5 20.5H19C20.1046 20.5 21 19.6046 21 18.5V14.5V9.5V5.5C21 4.39543 20.1046 3.5 19 3.5H5ZM19 13.5V10.5H10V13.5H19ZM10 15.5H19V18.5H10V15.5ZM8 13.5V10.5H5V13.5H8ZM5 15.5H8V18.5H5V15.5ZM19 8.5V5.5H10L10 8.5H19ZM8 8.5V5.5H5V8.5H8Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

TableView.displayName = 'TableView';

export { TableView };
