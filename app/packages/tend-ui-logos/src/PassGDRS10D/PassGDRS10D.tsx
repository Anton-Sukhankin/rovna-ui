import React from 'react';
import { useColor, useColors } from '@rovna-ui/theme';

import { Icon, IconProps } from '../Icon';

const PassGDRS10D = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ size = 20, color, ...props }, ref) => {
    const _color = useColor(color, useColors().blue600);

    return (
      <Icon
        data-testid='rovna-ui-pass-gdrs-10-d-icon'
        {...props}
        ref={ref}
        size={size}
        color={_color}
      >
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 21 20'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M13 4.375H19.25V18.75H1.75V4.375H8V1.25H13V4.375ZM3.625 16.875H17.375V6.25H13V8.125H8V6.25H3.625V16.875ZM6.67188 15.5469H5.57812V13.6328H6.67188V15.5469ZM8.85938 15.5469H7.76562V12.9492H8.85938V15.5469ZM11.0469 15.5469H9.95312V13.3594H11.0469V15.5469ZM13.2344 15.5469H12.1406V12.5391H13.2344V15.5469ZM15.4219 15.5469H14.3281V11.7188H15.4219V15.5469ZM15.1943 8.88184L10.543 12.2246L8.35547 11.0625L6.44434 12.4365L5.80566 11.5479L8.26953 9.77734L10.4561 10.9395L14.5557 7.99316L15.1943 8.88184ZM9.875 6.25H11.125V3.125H9.875V6.25Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

PassGDRS10D.displayName = 'PassGDRS10D';

export { PassGDRS10D };
