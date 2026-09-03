import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Tree = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-tree-icon' {...props} ref={ref} color={_color}>
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
            d='M12.848 2.47C12.6653 2.17762 12.3448 2 12 2C11.6552 2 11.3348 2.17762 11.152 2.47L6.15201 10.47C5.95935 10.7783 5.94914 11.1668 6.12537 11.4848C6.3016 11.8027 6.63649 12 7.00001 12H7.86497L4.23179 16.3598C3.98339 16.6579 3.92984 17.0728 4.09442 17.4242C4.259 17.7755 4.61199 18 5.00001 18H10V20C10 21.1046 10.8954 22 12 22C13.1046 22 14 21.1046 14 20V18H19C19.388 18 19.741 17.7755 19.9056 17.4242C20.0702 17.0728 20.0166 16.6579 19.7682 16.3598L16.1351 12H17C17.3635 12 17.6984 11.8027 17.8747 11.4848C18.0509 11.1668 18.0407 10.7783 17.848 10.47L12.848 2.47ZM12 16H16.865L13.2318 11.6402C12.9834 11.3421 12.9298 10.9272 13.0944 10.5758C13.259 10.2245 13.612 10 14 10H15.1958L12 4.8868L8.80426 10H10C10.388 10 10.741 10.2245 10.9056 10.5758C11.0702 10.9272 11.0166 11.3421 10.7682 11.6402L7.13505 16H12Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Tree.displayName = 'Tree';

export { Tree };
