import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Pin } from '@rovna-ui/icons';

import { PinningButtonProps } from './types';
import { ListItem } from '../../styled';

const PinningButton = ({ pinned, onChange, onClick, disabled }: PinningButtonProps) => {
  const t = useTranslation();
  const node = pinned
    ? t(['features', 'Table', 'unpin'])
    : t(['features', 'Table', 'pin']);

  const handleClick = React.useCallback(() => {
    onClick?.();

    if (pinned) {
      onChange?.('none');

      return;
    }

    onChange?.('left');
  }, [onChange, onClick, pinned]);

  return (
    <ListItem
      before={<Pin color={pinned ? 'blue600' : 'gray500'} />}
      onClick={handleClick}
      disabled={disabled}
    >
      {node}
    </ListItem>
  );
};

PinningButton.displayName = 'Table.ContextMenu.Actions.PinningButton';

export { PinningButton };
