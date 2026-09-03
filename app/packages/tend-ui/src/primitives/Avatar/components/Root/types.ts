import React from 'react';

import { AvatarSize, AvatarStylingSchema } from '../../types';

export type RootProps = React.ComponentPropsWithoutRef<'span'> & {
  pointer?: boolean;
  size?: AvatarSize;
  bordered?: boolean;
  /**
   * @deprecated Экспериментальное API
   * Не используйте это в продакшене
   */
  UNSTABLE_styling?: AvatarStylingSchema;
};
