import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const ClipboardDone = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-clipboard-done-icon' {...props} ref={ref} color={_color}>
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
            d='M8.5 2.5C7.44198 2.5 6.53747 3.15723 6.17247 4.0857C4.36041 4.46689 3 6.07457 3 8V18C3 20.2091 4.79086 22 7 22H10C10.5523 22 11 21.5523 11 21C11 20.4477 10.5523 20 10 20H7C5.89543 20 5 19.1046 5 18V8C5 7.15205 5.5277 6.42735 6.27261 6.13639C6.68641 6.94585 7.52849 7.5 8.5 7.5H15.5C16.4715 7.5 17.3136 6.94585 17.7274 6.13639C18.4723 6.42735 19 7.15205 19 8V14C19 14.5523 19.4477 15 20 15C20.5523 15 21 14.5523 21 14V8C21 6.07457 19.6396 4.46689 17.8275 4.08571C17.4625 3.15724 16.558 2.5 15.5 2.5H8.5ZM15.5 4.5H8.5C8.22386 4.5 8 4.72386 8 5C8 5.27614 8.22386 5.5 8.5 5.5H15.5C15.7761 5.5 16 5.27614 16 5C16 4.72386 15.7761 4.5 15.5 4.5Z'
            fill='currentColor'
          />
          <path
            d='M21.2929 17.2929C21.6834 16.9024 22.3166 16.9024 22.7071 17.2929C23.0976 17.6834 23.0976 18.3166 22.7071 18.7071L19.0607 22.3536C18.4749 22.9393 17.5251 22.9393 16.9393 22.3536L15.2929 20.7071C14.9024 20.3166 14.9024 19.6834 15.2929 19.2929C15.6834 18.9024 16.3166 18.9024 16.7071 19.2929L18 20.5858L21.2929 17.2929Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

ClipboardDone.displayName = 'ClipboardDone';

export { ClipboardDone };
