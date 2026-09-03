import { Button } from '@rovna-ui/primitives';
import { Settings } from '@rovna-ui/components/icons';
import React from 'react';

import { SettingsButtonProps } from './types';

const SettingsButton = ({ onClick, disabled }: SettingsButtonProps) => {
  return (
    <Button
      aria-label='Настройки таблицы'
      type='button'
      disabled={disabled}
      before={<Settings />}
      variant='secondary'
      onClick={onClick}
    />
  );
};

SettingsButton.displayName = 'Table.ControlPanel.SettingsButton';

export { SettingsButton };
