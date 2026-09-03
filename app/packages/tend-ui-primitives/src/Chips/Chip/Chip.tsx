import React from 'react';
import { Done } from '@rovna-ui/icons/Done';
import { useTheme } from '@rovna-ui/theme';

import { ChipProps } from './types';
import { Input, Label, Text } from './styled';
import { isLabeledChipsOption } from '../utils';

export const Chip = React.memo<ChipProps>(({ option, checked, onClick }) => {
  const theme = useTheme();
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLLabelElement>) => {
      e.preventDefault();
      onClick(option);
    },
    [onClick, option],
  );

  const label = isLabeledChipsOption(option) ? option.label ?? option.value : option;

  return (
    <Label
      theme={theme}
      $checked={checked}
      onClick={handleClick}
      className='rovna-ui-chips-chip'
    >
      <Input type='checkbox' checked={checked} readOnly />
      {checked && <Done />}
      <Text>{label}</Text>
    </Label>
  );
});
