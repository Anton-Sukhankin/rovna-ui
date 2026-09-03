import React from 'react';
import { useColors } from '@rovna-ui/theme';

import { LogoWithBackground } from '../LogoWithBackground';
import { Pass10D } from '../Pass10D';
import { IconProps } from '../Icon';

const Pass10DColored = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
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
        backgroundColor={colors.green600}
        borderRadius={borderRadius}
        data-testid='rovna-ui-pass-10-d-colored-icon'
        {...props}
      >
        <Pass10D size={iconSize} color='gray0' />
      </LogoWithBackground>
    );
  },
);

Pass10DColored.displayName = 'Pass10DColored';

export { Pass10DColored };
