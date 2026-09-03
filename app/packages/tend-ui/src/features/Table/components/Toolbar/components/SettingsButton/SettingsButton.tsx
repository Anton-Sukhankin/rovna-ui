import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Settings } from '@rovna-ui/icons/Settings';

import { ToggleButton } from '@rovna-internal/components/primitives/ToggleButton';
import { Tooltip } from '@rovna-internal/components/primitives/Tooltip';
import { useTourContext } from '@rovna-internal/components/features/Table/contexts/TourContext';

import { SettingsButtonProps } from './types';

const SettingsButton = ({ tooltip, ...props }: SettingsButtonProps) => {
  const context = useTourContext();
  const t = useTranslation();

  return (
    <Tooltip title={t(['features', 'Table', 'settings'])} {...tooltip}>
      <ToggleButton {...props} ref={context?.ui?.settingsButton}>
        <Settings />
      </ToggleButton>
    </Tooltip>
  );
};

export { SettingsButton };
