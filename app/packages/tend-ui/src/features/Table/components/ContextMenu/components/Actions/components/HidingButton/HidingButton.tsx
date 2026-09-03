import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { VisibilityOff } from '@rovna-ui/icons/VisibilityOff';

import { HidingButtonProps } from './types';
import { ListItem } from '../../styled';

const HidingButton = ({ onClick, disabled }: HidingButtonProps) => {
  const t = useTranslation();

  return (
    <ListItem
      before={<VisibilityOff color='gray500' />}
      onClick={onClick}
      disabled={disabled}
    >
      {t(['features', 'Table', 'hide'])}
    </ListItem>
  );
};

HidingButton.displayName = 'Table.ContextMenu.Actions.HidingButton';

export { HidingButton };
