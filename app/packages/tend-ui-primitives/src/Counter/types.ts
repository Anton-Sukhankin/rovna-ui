import React from 'react';
import { Colors } from '@rovna-ui/tokens';
import { LiteralUnion } from '@rovna-ui/types';

export const presets = [
  'default',
  'success',
  'warning',
  'processing',
  'error',
  'gray',
  'blue',
  'geekblue',
  'green',
  'yellow',
  'red',
  'cyan',
  'volcano',
  'purple',
  'gray-light',
  'blue-light',
  'geekblue-light',
  'green-light',
  'yellow-light',
  'red-light',
  'cyan-light',
  'volcano-light',
  'purple-light',
] as const;
export type CounterPreset = (typeof presets)[number];
export type CounterRef = HTMLSpanElement;
export type CounterProps = React.ComponentPropsWithoutRef<'span'> & {
  /**
   * Регулирует позиционирование компонента
   *
   * Если `true`, то он будет позиционироваться в основном потоке элементов
   * Если `false`, то он будет позиционироваться абсолютно
   */
  inline?: boolean;
  /**
   * Отображать ли `0` как значение
   */
  showZero?: boolean;
  /**
   * Контент перед `children`
   */
  before?: React.ReactNode;
  /**
   * Контент после `children`
   */
  after?: React.ReactNode;
  /**
   * Контент внутри
   */
  inner?: React.ReactNode;
  /**
   * Максимальное отображаемое число
   */
  max?: number;
  /**
   * Цвет текста
   */
  color?: LiteralUnion<keyof Colors>;
  /**
   * Цвет фона
   */
  backgroundColor?: LiteralUnion<keyof Colors>;
  /**
   * Пресет цветов
   */
  preset?: CounterPreset;
  /**
   * Координаты смещения `[x, y]` в пикселях
   */
  offset?: number[];
  /**
   * Пресет расположение
   */
  placement?: 'leftTop' | 'rightTop' | 'rightBottom' | 'leftBottom';
  /**
   * `className` корневого элемента
   */
  rootClassName?: string;
};
