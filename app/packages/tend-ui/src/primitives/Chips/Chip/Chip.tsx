import React from 'react';
import { Done } from '@rovna-ui/icons/Done';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { ChipProps } from './types';
import { Input, Label, Text } from './styled';

export const Chip = React.memo<ChipProps>(({ checked, value, label, onClick }) => {
  const theme = useTheme();
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLLabelElement>) => {
      e.preventDefault();
      onClick(value);
    },
    [onClick, value],
  );

  return (
    <Label $checked={checked} theme={theme} onClick={handleClick}>
      <Input type='checkbox' />
      {checked && <Done />}
      <Text>{label ?? value}</Text>
    </Label>
  );
});
