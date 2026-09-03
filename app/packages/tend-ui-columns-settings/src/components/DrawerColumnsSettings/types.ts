import React from 'react';
import { DrawerProps } from '@rovna-ui/primitives';

import { ColumnsSettings } from '@rovna-internal/columns-settings/core';

export type DrawerColumnsSettingsProps = {
  /** Доступное имя панели настроек столбцов. */
  ['aria-label']?: string;
  /**
   * Заголовок
   */
  title?: React.ReactNode;
  /**
   * Открыт/закрыт
   */
  open?: DrawerProps['open'];
  /**
   * Отображать/не отображать пресеты
   */
  showPresets?: boolean;
  /**
   * Вызывается при закрытии
   */
  onClose?: DrawerProps['onClose'];
  /**
   * Вызывается при нажатии "Применить"
   */
  onApply?: () => void;
  /**
   * Вызывается при нажатии "Сбросить все"
   */
  onResetAll?: () => void;
  /**
   * Модель, возвращаемая из `useColumns`
   */
  settings: ColumnsSettings;
};
