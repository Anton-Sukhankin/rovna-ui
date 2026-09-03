import React from 'react';
import { useColors } from '@rovna-ui/theme';

import { LogoWithBackground } from '../LogoWithBackground';
import { RMP10D } from '../RMP10D';
import { IconProps } from '../Icon';

const RMP10DColored = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
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
        backgroundColor={colors.gold600}
        borderRadius={borderRadius}
        data-testid='rovna-ui-rmp-10-d-colored-icon'
        {...props}
      >
        <RMP10D size={iconSize} color='gray0' />
      </LogoWithBackground>
    );
  },
);

RMP10DColored.displayName = 'RMP10DColored';

export { RMP10DColored };
