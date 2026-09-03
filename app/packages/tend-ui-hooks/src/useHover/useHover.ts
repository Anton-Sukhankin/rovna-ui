import React from 'react';

import { UseHoverParameters } from './types';

export const useHover = <P extends UseHoverParameters>(props?: P) => {
  const [hovered, setHovered] = React.useState(false);

  const listeners = React.useMemo<UseHoverParameters>(
    () => ({
      onMouseEnter: e => {
        setHovered(true);
        props?.onMouseEnter?.(e);
      },
      onMouseLeave: e => {
        setHovered(false);
        props?.onMouseLeave?.(e);
      },
    }),
    [props],
  );

  return [hovered, listeners] as const;
};
