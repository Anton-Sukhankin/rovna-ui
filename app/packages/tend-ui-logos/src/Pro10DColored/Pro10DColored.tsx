import React from 'react';
import { useColors } from '@rovna-ui/theme';

import { LogoWithBackground } from '../LogoWithBackground';
import { Pro10D } from '../Pro10D';
import { IconProps } from '../Icon';

const Pro10DColored = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
  ({ size = 24, ...props }, ref) => {
    const colors = useColors();

    // Размер иконки внутри контейнера (60% от размера контейнера)
    const iconSize = Math.round(size * 0.6);
    // Border radius вычисляется как 1/5 от размера
    const borderRadius = Math.round(size / 5);

    return (
      <LogoWithBackground
        ref={ref}
        size={size}
        backgroundColor={colors.blue600}
        borderRadius={borderRadius}
        data-testid='rovna-ui-pro-10-d-colored-icon'
        {...props}
      >
        <Pro10D size={iconSize} color='gray0' />
      </LogoWithBackground>
    );
  },
);

Pro10DColored.displayName = 'Pro10DColored';

export { Pro10DColored };
