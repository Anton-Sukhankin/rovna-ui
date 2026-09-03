import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FileFavorite = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-file-favorite-icon' {...props} ref={ref} color={_color}>
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
            d='M7 4C6.44772 4 6 4.44772 6 5V19C6 19.5523 6.44772 20 7 20H12C12.5523 20 13 20.4477 13 21C13 21.5523 12.5523 22 12 22H7C5.34315 22 4 20.6569 4 19V5C4 3.34315 5.34315 2 7 2H13.9997H13.9998H14C14.1299 2 14.2572 2.02527 14.3753 2.07308C14.4983 2.1229 14.6114 2.1972 14.7071 2.29289V2.29292L19.7071 7.29289C19.8946 7.48043 20 7.73478 20 8V8.00793V12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12V9.00003H14C13.4477 9.00003 13 8.55231 13 8.00003V4H7ZM20.1837 16.4266C20.1143 16.2654 19.8858 16.2654 19.8163 16.4266L18.9655 18.4023C18.9365 18.4696 18.8731 18.5156 18.8003 18.5224L16.6582 18.7211C16.4835 18.7373 16.4129 18.9546 16.5447 19.0705L18.1609 20.4902C18.2159 20.5385 18.2401 20.613 18.224 20.6845L17.751 22.783C17.7124 22.9542 17.8973 23.0886 18.0482 22.999L19.8979 21.9006C19.9609 21.8633 20.0392 21.8633 20.1021 21.9006L21.9518 22.999C22.1028 23.0886 22.2876 22.9542 22.2491 22.783L21.7761 20.6845C21.76 20.613 21.7842 20.5385 21.8392 20.4902L23.4553 19.0705C23.5872 18.9546 23.5166 18.7373 23.3418 18.7211L21.1998 18.5224C21.1269 18.5156 21.0635 18.4696 21.0346 18.4023L20.1837 16.4266Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FileFavorite.displayName = 'FileFavorite';

export { FileFavorite };
