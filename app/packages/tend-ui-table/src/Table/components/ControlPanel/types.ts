import { FiltersButtonProps, MoreButtonProps, SettingsButtonProps } from './components';

export type ControlPanelProps = {
  /**
   * Свойства кнопки фильтров
   */
  filtersButtonProps?: FiltersButtonProps;
  /**
   * Свойства кнопки настроек
   */
  settingsButtonProps?: SettingsButtonProps;
  /**
   * Свойства кнопки действий
   */
  moreButtonProps?: MoreButtonProps;
  /**
   * Свойства кнопки действий
   */
  sortersButtonProps?: MoreButtonProps;
};
