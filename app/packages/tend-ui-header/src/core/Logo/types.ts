import { Colors } from '@rovna-ui/tokens';
import { LiteralUnion } from '@rovna-ui/types';
import React from 'react';

export type LogoProps = {
  color?: LiteralUnion<keyof Colors>;
  children?: React.ReactNode;
  before?: React.ReactNode;
  after?: React.ReactNode;
  onClick?: () => void;
};
