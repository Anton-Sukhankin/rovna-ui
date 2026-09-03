import { Colors } from './Colors';
import { FontSizes } from './FontSizes';
import { Fonts } from './Fonts';
import { Tokens } from './Tokens';
import { Utils } from './Utils';

export type ThemeSchema = {
  colors: Colors;
  fonts: Fonts;
  fontSizes: FontSizes;
  utils: Utils;
  tokens: Tokens;
};
