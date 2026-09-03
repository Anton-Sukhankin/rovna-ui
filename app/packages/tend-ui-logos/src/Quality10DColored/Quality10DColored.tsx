import React from 'react';
import { useColors } from '@rovna-ui/theme';

import { LogoWithBackground } from '../LogoWithBackground';
import { Quality10D } from '../Quality10D';
import { IconProps } from '../Icon';

const Quality10DColored = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
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
        backgroundColor={colors.purple600}
        borderRadius={borderRadius}
        data-testid='rovna-ui-quality-10-d-colored-icon'
        {...props}
      >
        <Quality10D size={iconSize} color='gray0' />
      </LogoWithBackground>
    );
  },
);

Quality10DColored.displayName = 'Quality10DColored';

export { Quality10DColored };
