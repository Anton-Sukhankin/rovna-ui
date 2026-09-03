import React from 'react';
import AntDivider from 'antd-core/es/divider';
import { LiteralUnion } from '@rovna-ui/types';
import { Colors } from '@rovna-ui/tokens';

type AntDividerProps = React.ComponentPropsWithoutRef<typeof AntDivider>;
export type DividerProps = AntDividerProps & {
  color?: LiteralUnion<keyof Colors>;
  margin?: React.CSSProperties['margin'];
};
