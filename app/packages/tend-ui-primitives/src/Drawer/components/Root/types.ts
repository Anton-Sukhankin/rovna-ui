import React from 'react';
import { Colors } from '@rovna-ui/tokens';
import { LiteralUnion } from '@rovna-ui/types';

import { DrawerPushConfig, DrawerSize } from '@rovna-internal/primitives/Drawer/types';

export type RootProps = {
  ['data-testid']?: string;
  /** Доступное имя диалога. */
  ['aria-label']?: string;
  /** Идентификатор видимого заголовка диалога. */
  ['aria-labelledby']?: string;
  /**
   * Открыт/закрыт
   */
  open?: boolean;
  /**
   * Растягивает `Drawer` на весь экран
   */
  fullscreen?: boolean | { offset?: string };
  /**
   * Может ли `Drawer` быть закрыт кликом по темной области
   */
  maskClosable?: boolean;
  /**
   * Затемнение заднего фона
   */
  mask?: boolean;
  /**
   * Размонтирование `Drawer` при закрытии
   */
  destroyOnClose?: boolean;
  /**
   * Цвет заднего фона
   */
  backgroundColor?: LiteralUnion<keyof Colors>;
  /**
   * Размер `Drawer`
   */
  size?: DrawerSize;
  /**
   * Вызывается при клике на иконку закрытия или нажатии `Esc`
   */
  onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  /**
   * Откуда открывается `Drawer`
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Свойство, регулирующее ширину компонента
   */
  width?: string | number;
  /**
   * Функция вызывается после того как компонент открылся
   */
  afterOpenChange?: (open: boolean) => void;
  push?: boolean | DrawerPushConfig;
};
