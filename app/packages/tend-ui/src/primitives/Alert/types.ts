import React from 'react';
import { MarginProperties } from '@rovna-ui/styling';

import { TooltipProps } from '@rovna-internal/components/primitives/Tooltip';

export const types = [
  'success',
  'error',
  'warning',
  'info',
  'neutral',
  'loading',
] as const;
export type AlertType = (typeof types)[number];
type BaseAlertProps = {
  /**
   * Обводка
   * @deprecated `Alert` с обводкой начиная с версии `4.11.0` удален из дизайн системы. За более подробной информацией обратись в чат `S.RovnaUI Support`
   */
  border?: boolean;
  /**
   * Можно ли скрыть
   */
  closable?: boolean;
  /**
   * Отображать ли иконку
   */
  showIcon?: boolean;
  /**
   * Тип
   */
  type?: AlertType;
  /**
   * Заголовок
   */
  message?: React.ReactNode;
  /**
   * Описание
   */
  description?: React.ReactNode;
  /**
   * Функция обратного вызова, вызываемая при закрытии
   */
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Позволяет кастомизировать иконку
   */
  icon?: React.ReactNode;
  /**
   * Позволяет кастомизировать иконку закрытия
   */
  closeIcon?: boolean | React.ReactNode;
  action?: React.ReactNode;
  /**
   * Подвал
   */
  footer?: React.ReactNode | React.ReactNode[];
  /**
   * Свойства тултипа иконки закрытия
   */
  closeIconTooltip?: Omit<TooltipProps, 'children'>;
};
export type AlertRef = HTMLDivElement;
export type AlertProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> &
  BaseAlertProps &
  MarginProperties;
