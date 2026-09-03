import { ColumnConfig } from './ColumnConfig';

/**
 * Сохраняемые в пресеты свойства колонок
 */
export type ColumnsSettingsPresetValue = Pick<
  ColumnConfig,
  'id' | 'disabled' | 'pinnable' | 'visible' | 'draggable' | 'fixed'
>;

export type ColumnsSettingsPreset = {
  /**
   * Уникальный идентификатор
   */
  id: string;
  /**
   * Имя фильтра
   */
  label: string;
  /**
   * Сохраненные фильтры
   */
  value: ColumnsSettingsPresetValue[];
};

export interface ColumnsSettingsPresets {
  /**
   * Пресеты
   */
  defaultPresets?: ColumnsSettingsPreset[];
  /**
   * Вызывается при создании пресета
   */
  onPresetSave?: (saved: ColumnsSettingsPreset) => void;
  /**
   * Вызывается при редактировании пресета
   */
  onPresetEdit?: (edited: ColumnsSettingsPreset) => void;
  /**
   * Вызывается при удалении пресета
   */
  onPresetRemove?: (removed: ColumnsSettingsPreset) => void;
  /**
   * Вызывается при применении пресета
   */
  onPresetApply?: (preset: ColumnsSettingsPreset) => void;
}
