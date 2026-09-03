import React from 'react';
import AntText from 'antd-core/es/typography/Text';
import {
  FontProperties,
  LayoutProperties,
  MarginProperties,
  TextProperties,
} from '@rovna-ui/styling';

import { BaseTypographyProps, Size } from '../types';

type AntTextProps = React.ComponentPropsWithoutRef<typeof AntText>;
export type TextSize = Size;
type BaseTextProps = {
  /**
   * Размер шрифта
   */
  size?: TextSize;
  /**
   * Вес шрифта
   */
  fontWeight?: React.CSSProperties['fontWeight'];
};
export type TextRef = HTMLSpanElement;
export type TextProps = AntTextProps &
  BaseTypographyProps &
  BaseTextProps &
  MarginProperties &
  LayoutProperties &
  TextProperties &
  FontProperties;
