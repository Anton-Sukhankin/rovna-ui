import React from 'react';
import { useColors } from '@rovna-ui/theme';

import { LogoWithBackground } from '../LogoWithBackground';
import { Tender10D } from '../Tender10D';
import { IconProps } from '../Icon';

const Tender10DColored = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(
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
        backgroundColor={colors.cyan600}
        borderRadius={borderRadius}
        data-testid='rovna-ui-tender-10-d-colored-icon'
        {...props}
      >
        <Tender10D size={iconSize} color='gray0' />
      </LogoWithBackground>
    );
  },
);

Tender10DColored.displayName = 'Tender10DColored';

export { Tender10DColored };
