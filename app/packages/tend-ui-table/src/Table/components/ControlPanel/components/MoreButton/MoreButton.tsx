import React from 'react';
import { Button } from '@rovna-ui/primitives';
import { MoreVert } from '@rovna-ui/icons';
import { Dropdown } from '@rovna-ui/components/primitives';

import { MoreButtonProps } from './types';

const MoreButton = ({ items, disabled }: MoreButtonProps) => {
  if (!items?.length) {
    return null;
  }

  return (
    <Dropdown trigger={items?.length ? ['click'] : []} items={items}>
      <Button
        aria-label='Дополнительные действия с таблицей'
        type='button'
        disabled={disabled}
        before={<MoreVert />}
        variant='secondary'
      />
    </Dropdown>
  );
};

MoreButton.displayName = 'Table.ControlPanel.MoreButton';

export { MoreButton };
