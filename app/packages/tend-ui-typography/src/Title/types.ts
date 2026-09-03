import React from 'react';
import Typography from 'antd-core/es/typography';
import {
  DimensionProperties,
  MarginProperties,
  PaddingProperties,
  TextProperties,
} from '@rovna-ui/styling';

import { BaseTypographyProps } from '../types';

export const levels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'd1', 'd2'] as const;
export type TitleLevel = (typeof levels)[number];
type AntTitleProps = React.ComponentPropsWithoutRef<typeof Typography.Title>;
type BaseTitleProps = {
  /**
   * Заглавные буквы
   */
  uppercase?: boolean;
  /**
   * Уровень заголовка
   */
  level?: TitleLevel;
};
export type TitleProps = Omit<AntTitleProps, 'level'> &
  BaseTitleProps &
  BaseTypographyProps &
  MarginProperties &
  PaddingProperties &
  TextProperties &
  DimensionProperties;
