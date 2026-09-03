import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const Tender = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-tender-icon' {...props} ref={ref} color={_color}>
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
            d='M15.2133 14.8724L16 14.0858L20.2929 18.3787C20.6834 18.7692 21.3166 18.7692 21.7071 18.3787C22.0976 17.9882 22.0976 17.355 21.7071 16.9645L17.4142 12.6716L19.7929 10.2929C20.9645 9.12132 20.9645 7.22182 19.7929 6.05025L16.6213 2.87868C15.4498 1.70711 13.5503 1.7071 12.3787 2.87868L6.20711 9.05025C5.03554 10.2218 5.03554 12.1213 6.20711 13.2929L9.37868 16.4645C10.5503 17.636 12.4497 17.636 13.6213 16.4645L15.2008 14.885C15.2029 14.8829 15.205 14.8808 15.2071 14.8787C15.2092 14.8766 15.2113 14.8745 15.2133 14.8724ZM15.2071 4.29289C14.8166 3.90237 14.1834 3.90237 13.7929 4.29289L9.91419 8.1716L14.5 12.7574L18.3787 8.87868C18.7692 8.48816 18.7692 7.85499 18.3787 7.46447L15.2071 4.29289ZM13.0858 14.1716L8.49997 9.58582L7.62132 10.4645C7.2308 10.855 7.2308 11.4882 7.62132 11.8787L10.7929 15.0503C11.1834 15.4408 11.8166 15.4408 12.2071 15.0503L13.0858 14.1716Z'
            fill='currentColor'
          />
          <path
            d='M2 21C2 20.4477 2.44772 20 3 20H10.5C11.0523 20 11.5 20.4477 11.5 21C11.5 21.5523 11.0523 22 10.5 22H3C2.44772 22 2 21.5523 2 21Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

Tender.displayName = 'Tender';

export { Tender };
