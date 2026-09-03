import React from 'react';
import { useColors } from '@rovna-ui/theme';

import { LogoWithBackground } from '../LogoWithBackground';
import { Materials10D } from '../Materials10D';
import { IconProps } from '../Icon';

const Materials10DColored = React.forwardRef<
  HTMLSpanElement,
  Omit<IconProps, 'children'>
>(({ size = 24, ...props }, ref) => {
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
      data-testid='rovna-ui-materials-10-d-colored-icon'
      {...props}
    >
      <Materials10D size={iconSize} color='gray0' />
    </LogoWithBackground>
  );
});

Materials10DColored.displayName = 'Materials10DColored';

export { Materials10DColored };
