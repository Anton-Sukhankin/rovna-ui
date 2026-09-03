import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { INTERNAL_RovnaUILogger as RovnaUILogger } from '@rovna-ui/utils';
import { Settings } from '@rovna-ui/icons';
import { ToggleButton, Tooltip } from '@rovna-ui/primitives';

import { useTourContext } from '@rovna-internal/table/Table/contexts/TourContext';

import { SettingsButtonProps } from './types';

const SettingsButton = ({ tooltip, 'aria-label': ariaLabel, ...props }: SettingsButtonProps) => {
  if (process.env.NODE_ENV === 'development') {
    RovnaUILogger.warning([
      '<Table.Toolbar.SettingsButton /> устарел и более не поддерживается.',
      '',
      'Используйте <Table.ControlPanel />.',
    ]);
  }

  const context = useTourContext();
  const t = useTranslation();

  return (
    <Tooltip title={t(['features', 'Table', 'settings'])} {...tooltip}>
      <ToggleButton
        {...props}
        aria-label={ariaLabel ?? 'Настройки таблицы'}
        ref={context?.ui?.settingsButton}
      >
        <Settings />
      </ToggleButton>
    </Tooltip>
  );
};

export { SettingsButton };
