import React from 'react';
import { LiteralUnion } from '@rovna-ui/types';
import { Colors } from '@rovna-ui/tokens';

export type SpinnerSize = 'xs' | 'small' | 'medium' | 'large';
export type SpinnerRef = HTMLDivElement;
export type SpinnerProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Размер
   */
  size?: SpinnerSize;
  /**
   * Цвет
   */
  color?: LiteralUnion<keyof Colors>;
  /**
   * Состояние загрузки
   */
  loading?: boolean;
};
