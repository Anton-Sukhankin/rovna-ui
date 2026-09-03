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
  onClick,
}: React.PropsWithChildren<CardProps>) => {
  const theme = useTheme();

  return (
    <Root
      type='button'
      disabled={disabled}
      theme={theme}
      $disabled={disabled}
      $selected={selected}
      $hovered={hovered}
      onClick={onClick}
    >
      {before}
      <Text disabled={disabled} style={{ display: 'block', whiteSpace: 'nowrap' }}>
        {children}
      </Text>
    </Root>
  );
};
