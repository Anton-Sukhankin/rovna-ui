import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const FolderFavorite = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon
        data-testid='rovna-ui-folder-favorite-icon'
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
            d='M4 6C4 5.44772 4.44772 5 5 5H8.58579L10 6.41421C10.3751 6.78929 10.8838 7 11.4142 7H19C19.5523 7 20 7.44772 20 8V12C20 12.5523 20.4477 13 21 13C21.5523 13 22 12.5523 22 12V8C22 6.34315 20.6569 5 19 5H11.4142L10 3.58579C9.62493 3.21071 9.11622 3 8.58579 3H5C3.34315 3 2 4.34315 2 6V18C2 19.6569 3.34315 21 5 21H12C12.5523 21 13 20.5523 13 20C13 19.4477 12.5523 19 12 19H5C4.44772 19 4 18.5523 4 18V6ZM20.1837 16.4266C20.1143 16.2654 19.8858 16.2654 19.8163 16.4266L18.9655 18.4023C18.9365 18.4696 18.8731 18.5156 18.8003 18.5224L16.6582 18.7211C16.4835 18.7373 16.4129 18.9546 16.5447 19.0705L18.1609 20.4902C18.2159 20.5385 18.2401 20.613 18.224 20.6845L17.751 22.783C17.7124 22.9542 17.8973 23.0886 18.0482 22.999L19.8979 21.9006C19.9609 21.8633 20.0392 21.8633 20.1021 21.9006L21.9518 22.999C22.1028 23.0886 22.2876 22.9542 22.2491 22.783L21.7761 20.6845C21.76 20.613 21.7842 20.5385 21.8392 20.4902L23.4553 19.0705C23.5872 18.9546 23.5166 18.7373 23.3418 18.7211L21.1998 18.5224C21.1269 18.5156 21.0635 18.4696 21.0346 18.4023L20.1837 16.4266Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

FolderFavorite.displayName = 'FolderFavorite';

export { FolderFavorite };
