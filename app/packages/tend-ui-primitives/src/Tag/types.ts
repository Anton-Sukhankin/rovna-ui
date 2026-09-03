import React from 'react';
import { MarginProperties, PaddingProperties } from '@rovna-ui/styling';
import { Colors } from '@rovna-ui/tokens';
import { LiteralUnion } from '@rovna-ui/types';

import { TooltipProps } from '../Tooltip';

export const presets = [
  'default',
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

export type TagShape = 'ellipse' | 'round';
export type TagSize = 'large' | 'medium';
export type TagPreset = (typeof presets)[number];
export type TagRef = HTMLSpanElement;
export type TagProps = React.ComponentPropsWithoutRef<'span'> &
  MarginProperties &
  PaddingProperties & {
    /**
     * Форма
     */
    shape?: TagShape;
    /**
     * Размер
     */
    size?: TagSize;
    /**
     * Обрезать ли текст если он не помещается в контейнер
     */
    ellipsis?: boolean;
    /**
     * Ширина
     */
    width?: React.CSSProperties['width'];
    /**
     * Максимальная ширина
     */
    maxWidth?: React.CSSProperties['maxWidth'];
    /**
     * Отображать ли иконку закрытия
     */
    closable?: boolean;
    /**
     * Свойства компонента `Tooltip` иконки закрытия
     */
    closeIconTooltip?: Omit<TooltipProps, 'children'>;
    /**
     * Цветовой пресет
     */
    preset?: TagPreset;
    /**
     * Цвет текста
     */
    color?: LiteralUnion<keyof Colors>;
    /**
     * Background color
     */
    backgroundColor?: LiteralUnion<keyof Colors>;
    /**
     * `borderRadius`
     */
    borderRadius?: React.CSSProperties['borderRadius'];
    /**
     * Контент перед `children`
     */
    before?: React.ReactNode;
    /**
     * Контент после `children`
     */
    after?: React.ReactNode;
    /**
     * Функция обратного вызова, вызываемая при закрытии
     */
    onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  };
