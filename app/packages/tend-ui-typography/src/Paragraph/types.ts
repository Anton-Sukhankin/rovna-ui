import React from 'react';
import AntParagraph from 'antd-core/es/typography/Paragraph';
import {
  LayoutProperties,
  MarginProperties,
  PaddingProperties,
  TextProperties,
} from '@rovna-ui/styling';

import { BaseTypographyProps, Size } from '../types';

type AntParagraphProps = React.ComponentPropsWithoutRef<typeof AntParagraph>;
type BaseParagraphProps = {
  /**
   * Размер
   */
  size?: Size;
  /**
   * Вес шрифта
   */
  fontWeight?: React.CSSProperties['fontWeight'];
};
export type ParagraphRef = HTMLElement;
export type ParagraphProps = AntParagraphProps &
  BaseTypographyProps &
  BaseParagraphProps &
  MarginProperties &
  PaddingProperties &
  TextProperties &
  LayoutProperties;
