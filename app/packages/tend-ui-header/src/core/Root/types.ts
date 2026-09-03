import React from 'react';
import { MarginProperties } from '@rovna-ui/styling';
import { LiteralUnion } from '@rovna-ui/types';
import { Colors } from '@rovna-ui/tokens';

export type RootProps = MarginProperties & {
  sticky?: boolean;
  top?: string;
  className?: string;
  children?: React.ReactNode;
  background?: LiteralUnion<keyof Colors>;
};
