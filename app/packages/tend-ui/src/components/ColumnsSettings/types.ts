import React from 'react';
import { DrawerProps as _DrawerProps } from '@rovna-ui/primitives';

import { ColumnConfig } from './core/interfaces/ColumnConfig';
import { ColumnPosition } from './core/interfaces/ColumnPosition';
import { ColumnsSettingsPresets } from './core/interfaces/ColumnsSettingsPreset';

/**
 * @deprecated Use `ColumnConfig`
 */
export type ColumnType = ColumnConfig;
/**
 * `ColumnsSettings` core properties
 */
export interface CoreColumnsSettingsProps<T extends ColumnConfig = ColumnConfig>
  extends ColumnsSettingsPresets {
  columns: T[];
  onColumnVisibilityChange?: (visible: boolean, column: T) => void;
  onColumnPinningChange?: (position: ColumnPosition, column: T) => void;
  onColumnDragEnd?: (from: number, to: number) => void;
  onColumnsReset?: () => void;
  /**
   * Отображать ли пресеты
   */
  showPresets?: boolean;
}

export type ColumnsSettingsProps<T extends ColumnConfig = ColumnConfig> =
  CoreColumnsSettingsProps<T> & {
    /**
     * Заголовок
     */
    title?: React.ReactNode;
    /**
     * Открыт/закрыт
     */
    open?: _DrawerProps['open'];

    onClose?: _DrawerProps['onClose'];
  };

export type { ColumnConfig, ColumnPosition };
