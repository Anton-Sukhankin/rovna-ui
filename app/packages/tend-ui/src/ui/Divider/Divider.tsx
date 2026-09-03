import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { Root } from './styled';
import { DividerProps } from './types';

export const Divider = ({
  variant = 'horizontal',
  margin,
  padding,
  height,
  color,
}: DividerProps) => {
  const theme = useTheme();
  // FIXME: Найти способ поправить литеральные типы
  const _color = useColor(color as string);
  const isVertical = variant === 'vertical';
  const as = isVertical ? 'div' : 'hr';

  return (
    <Root
      theme={theme}
      as={as}
      $type={variant}
      $margin={margin}
      $padding={padding}
      $height={height}
      $color={_color}
    />
  );
};
