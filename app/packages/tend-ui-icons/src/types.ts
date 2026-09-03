import React from 'react';
import {
  CursorProperties,
  MarginProperties,
  PaddingProperties,
} from '@rovna-ui/styling';
import { Colors } from '@rovna-ui/tokens';
import { LiteralUnion } from '@rovna-ui/types';

export type IconProps = React.ComponentPropsWithoutRef<'span'> &
  PaddingProperties &
  MarginProperties &
  CursorProperties & {
    color?: LiteralUnion<keyof Colors>;
    size?: number;
  };
