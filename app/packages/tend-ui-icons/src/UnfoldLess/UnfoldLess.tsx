import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const UnfoldLess = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-unfold-less-icon' {...props} ref={ref} color={_color}>
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
            d='M8.46671 6H15.5333C15.9483 6 16.1561 6.56184 15.8626 6.89044L12.3294 10.8472C12.1475 11.0509 11.8525 11.0509 11.6706 10.8472L8.13736 6.89044C7.84393 6.56184 8.05175 6 8.46671 6ZM8.46671 18H15.5333C15.9483 18 16.1561 17.4382 15.8626 17.1096L12.3294 13.1528C12.1475 12.9491 11.8525 12.9491 11.6706 13.1528L8.13736 17.1096C7.84393 17.4382 8.05175 18 8.46671 18Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

UnfoldLess.displayName = 'UnfoldLess';

export { UnfoldLess };
