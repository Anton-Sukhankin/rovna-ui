import React from 'react';
import {
  CursorProperties,
  MarginProperties,
  PaddingProperties,
} from '@rovna-ui/styling';

import { Colors } from '@rovna-internal/components/theme/types/Colors';
import { LiteralUnion } from '@rovna-internal/components/types/LiteralUnion';

/**
 * @deprecated Мигрировать на `@rovna-ui/icons`
 */
export type IconProps = React.ComponentPropsWithoutRef<'span'> &
  MarginProperties &
  CursorProperties &
  PaddingProperties & {
    color?: LiteralUnion<keyof Colors>;
    size?: number;
  };
