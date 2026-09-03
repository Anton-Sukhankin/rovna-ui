import React from 'react';
import AntTypography from 'antd-core/es/typography';
import { Colors } from '@rovna-ui/tokens';
import { LiteralUnion } from '@rovna-ui/types';

export const sizes = ['large', 'medium', 'small', 'xs'] as const;
export type Size = (typeof sizes)[number];
export type BaseTypographyProps = {
  /**
   * Заглавные буквы
   */
  uppercase?: boolean;
  /**
   * Цвет
   */
  color?: LiteralUnion<keyof Colors>;
  /**
   * Выравнивание
   */
  textAlign?: React.CSSProperties['textAlign'];
};
export type TypographyProps = React.ComponentPropsWithoutRef<typeof AntTypography>;
