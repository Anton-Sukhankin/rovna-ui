import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const CalendarFavorite = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-calendar-favorite-icon'
        {...props}
        ref={ref}
        color={_color}
      >
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
            d='M8 3C8 2.44772 7.55228 2 7 2C6.44772 2 6 2.44772 6 3V4C4.34315 4 3 5.34315 3 7V9V19C3 20.6569 4.34315 22 6 22H12C12.5523 22 13 21.5523 13 21C13 20.4477 12.5523 20 12 20H6C5.44772 20 5 19.5523 5 19V10H19V12C19 12.5523 19.4477 13 20 13C20.5523 13 21 12.5523 21 12V9V7C21 5.34315 19.6569 4 18 4V3C18 2.44772 17.5523 2 17 2C16.4477 2 16 2.44772 16 3V4H8V3ZM7 6H17H18C18.5523 6 19 6.44772 19 7V8H5V7C5 6.44772 5.44772 6 6 6H7ZM21.0346 18.4023L20.1837 16.4266C20.1143 16.2654 19.8857 16.2654 19.8163 16.4266L18.9654 18.4023C18.9365 18.4696 18.8731 18.5156 18.8002 18.5224L16.6582 18.7211C16.4835 18.7373 16.4128 18.9546 16.5447 19.0705L18.1608 20.4902C18.2158 20.5385 18.24 20.613 18.2239 20.6845L17.751 22.783C17.7124 22.9542 17.8973 23.0886 18.0482 22.999L19.8979 21.9006C19.9608 21.8633 20.0392 21.8633 20.1021 21.9006L21.9518 22.999C22.1027 23.0886 22.2876 22.9542 22.249 22.783L21.7761 20.6845C21.76 20.613 21.7842 20.5385 21.8392 20.4902L23.4553 19.0705C23.5872 18.9546 23.5165 18.7373 23.3418 18.7211L21.1998 18.5224C21.1269 18.5156 21.0635 18.4696 21.0346 18.4023Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

CalendarFavorite.displayName = 'CalendarFavorite';

export { CalendarFavorite };
