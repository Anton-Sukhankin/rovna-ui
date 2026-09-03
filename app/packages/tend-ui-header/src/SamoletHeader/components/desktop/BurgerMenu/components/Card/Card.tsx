import React from 'react';
import { useTheme } from '@rovna-ui/theme';
import { Text } from '@rovna-ui/typography';

import { Root } from './styled';
import { CardProps } from './types';

export const Card = ({
  hovered,
  disabled,
  selected,
  before,
  children,
}: React.PropsWithChildren<CardProps>) => {
  const theme = useTheme();

  return (
    <Root theme={theme} $disabled={disabled} $selected={selected} $hovered={hovered}>
      {before}
      <Text disabled={disabled} style={{ display: 'block', whiteSpace: 'nowrap' }}>
        {children}
      </Text>
    </Root>
  );
};
