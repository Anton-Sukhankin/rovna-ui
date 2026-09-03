import React from 'react';
import { useColors } from '@rovna-ui/theme';

import { LogoWithBackground } from '../LogoWithBackground';
import { Plan10D } from '../Plan10D';
import { IconProps } from '../Icon';

const Plan10DColored = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
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
        backgroundColor={colors.volcano600}
        borderRadius={borderRadius}
        data-testid='rovna-ui-plan-10-d-colored-icon'
        {...props}
      >
        <Plan10D size={iconSize} color='gray0' />
      </LogoWithBackground>
    );
  },
);

Plan10DColored.displayName = 'Plan10DColored';

export { Plan10DColored };
