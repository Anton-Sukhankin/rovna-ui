import { Colors } from '@rovna-ui/tokens';
import { FlattenSimpleInterpolation } from 'styled-components';

import { Tokens } from './Tokens';

export type ThemeSchema = {
  colors: Colors;
  tokens: Tokens;
  fonts: {
    museo: 'Museo Sans Cyrl, sans-serif';
  };
  fontSizes: {
    10: '10px';
    12: '12px';
    14: '14px';
    16: '16px';
    20: '20px';
    24: '24px';
    28: '28px';
    32: '32px';
    40: '40px';
    56: '56px';
    64: '64px';
  };
  utils: {
    box: (value: number) => FlattenSimpleInterpolation;
  };
};
