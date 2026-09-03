import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { Icon } from '@rovna-internal/icons/Icon';
import { IconProps } from '@rovna-internal/icons/types';

const EditAlt = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ color, ...props }, ref) => {
    const _color = useColor(color);

    return (
      <Icon data-testid='rovna-ui-edit-alt-icon' {...props} ref={ref} color={_color}>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10.7385 21.3656L11.117 19.4946L19.6977 11.0124C19.9072 10.8053 20.2467 10.8053 20.4562 11.0124L21.8429 12.3832C22.0524 12.5902 22.0524 12.9259 21.8429 13.1329L13.2622 21.6152L11.3696 21.9894C10.9943 22.0636 10.6635 21.7365 10.7385 21.3656Z'
            fill='currentColor'
          />
          <path
            d='M5.21777 16.844C4.6254 16.844 4.14518 16.3693 4.14518 15.7837V5.18086C4.14518 4.59528 4.6254 4.12057 5.21777 4.12057H14.8711C15.4635 4.12057 15.9437 4.59528 15.9437 5.18086V8.36172C15.9437 8.9473 16.4239 9.42201 17.0163 9.42201C17.6086 9.42201 18.0889 8.9473 18.0889 8.36172V5.18086C18.0889 3.42412 16.6482 2 14.8711 2H5.21777C3.44065 2 2 3.42412 2 5.18086V15.7837C2 17.5405 3.44065 18.9646 5.21777 18.9646H8.43554C9.02792 18.9646 9.50813 18.4899 9.50813 17.9043C9.50813 17.3187 9.02792 16.844 8.43554 16.844H5.21777Z'
            fill='currentColor'
          />
        </svg>
      </Icon>
    );
  },
);

EditAlt.displayName = 'EditAlt';

export { EditAlt };
