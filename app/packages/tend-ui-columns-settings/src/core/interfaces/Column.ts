import React from 'react';

import { ColumnConfig } from './ColumnConfig';

export interface CoreColumn<TColumn extends ColumnConfig = ColumnConfig> {
  id: string;
  original: TColumn;
  getLabel: () => React.ReactNode;
}

export type ColumnPosition = 'left' | 'right' | 'none';

export interface ColumnVisibility {
  /**
   * Возвращает значение видимости колонки
   */
  readonly getIsVisible: () => boolean;
  /**
   * Возвращает значение недоступности колонки
   */
  readonly getIsDisabled: () => boolean;
  /**
   * Возвращает метод для отображения колонки
   */
  readonly getShowHandler: () => () => void;
  /**
   * Возвращает метод для сокрытия колонки
   */
  readonly getHideHandler: () => () => void;
  /**
   * Возвращает метод для отображения/сокрытия
   */
  readonly getVisibilityToggleHandler: () => () => void;
  /**
   * Метод отображения колонки
   */
  readonly hide: () => void;
  /**
   * Метод сокрытия колонки
   */
  readonly show: () => void;
}

export interface ColumnPinning {
  /**
   * Возвращает значение возможности закрепить колонку
   */
  readonly getCanPin: () => boolean;
  /**
   * Возвращает значение закрепленности колонки
   */
  readonly getIsPinned: () => boolean;
  /**
   * Возвращает метод для закрепления колонки
   */
  readonly getPinHandler: () => (position: ColumnPosition) => void;
  /**
   * Возвращает метод для открепления колонки
   */
  readonly getUnpinHandler: () => () => void;
  /**
   * Возвращает метод для закрепления/открепления колонки
   */
  readonly getPinningToggleHandler: () => () => void;
  /**
   * Возвращает метод закрепления колонки
   */
  readonly pin: (position: ColumnPosition) => void;
  /**
   * Возвращает метод открепления колонки
   */
  readonly unpin: () => void;
}

export interface ColumnDragging {
  /**
   * Возвращает значение возможности потянуть колонку
   */
  readonly getCanDrag: () => boolean;
}

export interface Column<TColumn extends ColumnConfig = ColumnConfig>
  extends CoreColumn<TColumn>,
    ColumnPinning,
    ColumnVisibility,
    ColumnDragging {}
