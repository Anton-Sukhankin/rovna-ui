import React from 'react';

import {
  FiltersButton,
  MoreButton,
  Root,
  SettingsButton,
  SortersButton,
} from './components';
import { ControlPanelProps } from './types';

/**
 * Панель управления таблицы
 */
const ControlPanel = ({
  filtersButtonProps,
  moreButtonProps,
  settingsButtonProps,
  sortersButtonProps,
}: ControlPanelProps) => {
  return (
    <Root>
      <FiltersButton {...filtersButtonProps} />
      <SortersButton {...sortersButtonProps} />
      <SettingsButton {...settingsButtonProps} />
      <MoreButton {...moreButtonProps} />
    </Root>
  );
};

ControlPanel.displayName = 'Table.ControlPanel';
ControlPanel.Root = Root;
ControlPanel.FiltersButton = FiltersButton;
ControlPanel.SortersButton = SortersButton;
ControlPanel.SettingsButton = SettingsButton;
ControlPanel.MoreButton = MoreButton;

export { ControlPanel };
