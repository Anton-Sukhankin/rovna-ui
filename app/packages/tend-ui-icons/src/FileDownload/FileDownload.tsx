import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FileDownload = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-file-download-icon' {...props} ref={ref} color={_color}>
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
            d='M6 5C6 4.44772 6.44772 4 7 4H13V8.00003C13 8.55231 13.4477 9.00003 14 9.00003H18V19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V5ZM20 8.00793V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V5C4 3.34315 5.34315 2 7 2H13.9998C14.1297 2 14.2572 2.02527 14.3753 2.07308C14.4983 2.1229 14.6114 2.1972 14.7071 2.29289L19.7071 7.29289C19.8946 7.48043 20 7.73478 20 8V8.00793Z'
            fill='currentColor'
          />
          <path
            d='M12 10C12.5523 10 13 10.4477 13 11V14.5858L14.2929 13.2929C14.6834 12.9024 15.3166 12.9024 15.7071 13.2929C16.0976 13.6834 16.0976 14.3166 15.7071 14.7071L12.7071 17.7071C12.3166 18.0976 11.6834 18.0976 11.2929 17.7071L8.29289 14.7071C7.90237 14.3166 7.90237 13.6834 8.29289 13.2929C8.68342 12.9024 9.31658 12.9024 9.70711 13.2929L11 14.5858L11 11C11 10.4477 11.4477 10 12 10Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FileDownload.displayName = 'FileDownload';

export { FileDownload };
