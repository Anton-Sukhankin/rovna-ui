import { ColumnConfig } from '@rovna-internal/columns-settings/core/interfaces';

import { Column, ColumnPosition } from './Column';
import { ColumnsSettingsPreset } from './ColumnsSettingsPreset';
import { Preset } from './Preset';
import { AntdTableColumn } from './TableColumn';

/**
 * Основная модель управления колонками
 */
export interface ColumnsSettings<TColumn extends ColumnConfig = ColumnConfig> {
  /**
   * Возвращает модели колонок
   */
  readonly getColumns: () => Column[];
  /**
   * Возвращает колонки для таблиц `antd`
   */
  readonly getAntdTableColumns: () => AntdTableColumn[];
  /**
   * Внутреннее свойство для нужны команды дизайн-системы
   */
  readonly __getTableRootColumns: () => AntdTableColumn[];
  /**
   * Возвращает модели пресетов
   */
  readonly getPresets: () => Preset[];
  /**
   * Возвращает метод для сброса колонок к дефолтному состоянию
   */
  readonly getDefaultResetHandler: () => () => void;
  /**
   * Возвращает метод для применения настроек
   */
  readonly getApplyHandler: () => () => void;
  /**
   * Метод для сброса в последнее актуальное состояние
   */
  readonly getPreviousResetHandler: () => () => void;
  /**
   * Возвращает метод для переноса колонок по индексу
   */
  readonly getMoveByIndexHandler: () => (from: number, to: number) => void;
  /**
   * Возвращает метод для сохранения пресета
   */
  readonly getSavePresetHandler: () => (preset: ColumnsSettingsPreset) => void;
  /**
   * Возвращает дефолтные колонки, переданные через параметры
   */
  readonly getDefaultColumns: () => TColumn[];
  readonly getColumnPinningChangeHandler: () => (
    column: ColumnConfig,
    position: ColumnPosition,
  ) => void;
  readonly getColumnVisibilityChangeHandler: () => (
    column: ColumnConfig,
    visible: boolean,
  ) => void;
}
