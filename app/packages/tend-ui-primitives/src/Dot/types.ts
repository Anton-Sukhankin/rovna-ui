import { Colors } from '@rovna-ui/tokens';
import { LiteralUnion } from '@rovna-ui/types';
import type { CSSProperties } from 'styled-components';
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
export type DotPreset = (typeof presets)[number];
export type DotRef = HTMLSpanElement;
export type DotProps = React.ComponentPropsWithoutRef<'span'> & {
  /**
   * Регулирует позиционирование компонента
   *
   * Если `true`, то он будет позиционироваться в основном потоке элементов
   * Если `false`, то он будет позиционироваться абсолютно
   */
  inline?: boolean;
  /**
   * Контент перед `children`
   */
  before?: React.ReactNode;
  /**
   * Контент после `children`
   */
  after?: React.ReactNode;
  /**
   * Цвет
   */
  color?: LiteralUnion<keyof Colors>;
  /**
   * Пресет цветов
   */
  preset?: DotPreset;
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

export type BubbleProps = {
  $backgroundColor?: CSSProperties['backgroundColor'];
  $pointer: boolean;
  $inline: boolean;
  $preset: DotPreset;
  $offset: number[];
  $placement: Exclude<DotProps['placement'], undefined>;
};
