import React from 'react';

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
export const variants = ['dot', 'counter', 'bubble', 'status'] as const;
export type BadgeVariant = (typeof variants)[number];
export type BadgePreset = (typeof presets)[number];
export type BadgeRef = HTMLSpanElement;
export type BadgeProps = React.ComponentPropsWithoutRef<'span'> & {
  /**
   * Отображать ли `0` как значение
   */
  showZero?: boolean;
  variant?: BadgeVariant;
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
   * Пресет
   */
  preset?: BadgePreset;
  /**
   * Координаты смещения `[x, y]` в пикселях
   */
  offset?: number[];
  /**
   * `padding`
   */
  padding?: string;
  /**
   * Пресет позиционирования
   */
  placement?: 'leftTop' | 'rightTop' | 'rightBottom' | 'leftBottom';
  /**
   * `className` корневого элемента
   */
  rootClassName?: string;
};
