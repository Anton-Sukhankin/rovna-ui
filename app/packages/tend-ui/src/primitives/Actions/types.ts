import React from 'react';

import { ButtonProps } from '../Button';
import { BadgeProps } from '../Badge';

type Counter = React.ComponentPropsWithoutRef<'span'> &
  Pick<BadgeProps, 'preset' | 'max'> & { inner?: number };
export type ActionsRef = HTMLDivElement;
export type ActionsProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  /**
   * Видимость
   */
  visible?: boolean;
  /**
   * Числовой индикатор
   */
  counter?: number | Counter;
  /**
   * Текст после числового индикатора
   */
  counterText?: string;
  /**
   * Текст успешной кнопки
   */
  okText?: React.ReactNode;
  /**
   * Свойства успешной кнопки
   */
  okButtonProps?: Omit<ButtonProps<'button'>, 'ref'>;
  /**
   * Функция обратного вызова, вызываемая при нажатии на успешную кнопку
   */
  onOk?: () => void;
  /**
   * Текст кнопки отмены
   */
  cancelText?: React.ReactNode;
  /**
   * Свойства кнопки отмены
   */
  cancelButtonProps?: Omit<ButtonProps<'button'>, 'ref'>;
  /**
   * Функция обратного вызова, вызываемая при нажатии на кнопку отмены
   */
  onCancel?: () => void;
  /**
   * Дополнительный контент справа от основного
   */
  extra?: React.ReactNode | React.ReactNode[];
  /**
   * Смещение компонента по оси `y`
   */
  offset?: number;
};
