import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FileCancel = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-file-cancel-icon' {...props} ref={ref} color={_color}>
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
            d='M6 5C6 4.44772 6.44772 4 7 4H13V8.00003C13 8.55231 13.4477 9.00003 14 9.00003H18V14C18 14.5523 18.4477 15 19 15C19.5523 15 20 14.5523 20 14V8.00793V8C20 7.73478 19.8946 7.48043 19.7071 7.29289L14.7071 2.29289C14.6114 2.1972 14.4983 2.1229 14.3753 2.07308C14.2572 2.02527 14.1299 2 14 2H7C5.34315 2 4 3.34315 4 5V19C4 20.6569 5.34315 22 7 22H12C12.5523 22 13 21.5523 13 21C13 20.4477 12.5523 20 12 20H7C6.44772 20 6 19.5523 6 19V5ZM16.2929 18.2929C16.6834 17.9024 17.3166 17.9024 17.7071 18.2929L19 19.5858L20.2929 18.2929C20.6834 17.9024 21.3166 17.9024 21.7071 18.2929C22.0976 18.6834 22.0976 19.3166 21.7071 19.7071L20.4142 21L21.7071 22.2929C22.0976 22.6834 22.0976 23.3166 21.7071 23.7071C21.3165 24.0976 20.6834 24.0976 20.2929 23.7071L19 22.4142L17.7071 23.7071C17.3166 24.0976 16.6834 24.0976 16.2929 23.7071C15.9024 23.3165 15.9024 22.6834 16.2929 22.2929L17.5858 21L16.2929 19.7071C15.9024 19.3166 15.9024 18.6834 16.2929 18.2929Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FileCancel.displayName = 'FileCancel';

export { FileCancel };
