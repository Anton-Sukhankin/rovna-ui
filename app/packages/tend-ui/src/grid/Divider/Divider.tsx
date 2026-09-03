import React from 'react';
import { useColor } from '@rovna-ui/theme';

import { DividerProps } from './types';
import { Root } from './styled';

const Divider: React.FC<DividerProps> = ({ margin, color, ...props }) => {
  // FIXME: Найти способ поправить литеральные типы
  const _color = useColor(color as string);

  return (
    <Root data-testid='rovna-ui-divider' {...props} $margin={margin} $color={_color} />
  );
};

Divider.displayName = 'Divider';

export { Divider };
