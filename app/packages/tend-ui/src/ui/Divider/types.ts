import { Colors } from '@rovna-ui/tokens';
import { LiteralUnion } from '@rovna-ui/types';

export type DividerProps = {
  variant?: 'horizontal' | 'vertical';
  className?: string;
  margin?: string;
  padding?: string;
  height?: string;
  color?: LiteralUnion<keyof Colors>;
};
