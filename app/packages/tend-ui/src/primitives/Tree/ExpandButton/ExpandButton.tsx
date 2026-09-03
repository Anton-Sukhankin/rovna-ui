import React from 'react';
import { Add } from '@rovna-ui/icons/Add';
import { Remove } from '@rovna-ui/icons/Remove';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { Button } from './styled';
import { ExpandButtonProps } from './types';

export const ExpandButton = ({ expanded }: ExpandButtonProps) => {
  const theme = useTheme();
  const content = expanded ? <Remove size={9} /> : <Add size={9} />;

  return <Button theme={theme}>{content}</Button>;
};
