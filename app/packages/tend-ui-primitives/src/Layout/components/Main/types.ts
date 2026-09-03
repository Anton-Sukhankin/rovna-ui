import React from 'react';
import { LiteralUnion } from '@rovna-ui/types';
import { Colors } from '@rovna-ui/tokens';

export type MainProps = React.ComponentPropsWithoutRef<'main'> & {
  background?: LiteralUnion<keyof Colors>;
};
