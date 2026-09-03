import React from 'react';
import { LiteralUnion } from '@rovna-ui/types';
import { Colors } from '@rovna-ui/tokens';

import { BadgeProps } from '@rovna-internal/components/primitives/Badge';

export const status = ['online', 'offline', 'away', 'busy'] as const;
export const sizes = ['xl', 'large', 'medium', 'small'] as const;
export type AvatarSize = (typeof sizes)[number];
export type AvatarStatus = (typeof status)[number];

export type AvatarStylingSchema = {
  borderColor?: LiteralUnion<keyof Colors>;
};

export type AvatarRef = HTMLSpanElement;
export type AvatarProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  /**
   * Отображать ли курсор `pointer` при наведении
   */
  pointer?: boolean;
  /**
   * Отображать обводку
   */
  bordered?: boolean;
  /**
   * `url` аватара
   */
  src?: string | string[];
  /**
   * Размер
   */
  size?: AvatarSize;
  /**
   * Статус в левом нижнем углу
   */
  status?: AvatarStatus | Pick<BadgeProps, 'preset' | 'offset' | 'placement'>;
  /**
   * Тип позиционирования изображения внутри контейнера
   */
  fit?: 'contain' | 'cover';
  /**
   * @deprecated Экспериментальное API
   * Не используйте это в продакшене
   */
  UNSTABLE_styling?: AvatarStylingSchema;
};
