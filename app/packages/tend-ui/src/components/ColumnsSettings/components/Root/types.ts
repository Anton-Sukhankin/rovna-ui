import React from 'react';

import { ColumnConfig } from '@rovna-internal/components/components/ColumnsSettings/types';

import { ColumnsSettingsPreset } from '../../core/interfaces/ColumnsSettingsPreset';

export type RootProps<T extends ColumnConfig = ColumnConfig> = {
  columns: T[];
  children?: React.ReactNode;
  onColumnDragEnd?: (from: number, to: number) => void;
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
};
