import { Colors } from '@rovna-ui/tokens';

type Brand = 'global' | 'samolet';

const commonAccessibleColors: Partial<Colors> = {
  cyan500: '#087E84FF',
  cyan600: '#006D75FF',
  cyan700: '#005C63FF',
  cyan800: '#004F55FF',
  gold600: '#925800FF',
  gold700: '#875200FF',
  gold800: '#805000FF',
  gray400: '#686E78FF',
  gray500: '#686E78FF',
  gray650: '#646A74FF',
  green500: '#3D825AFF',
  green600: '#34744FFF',
  green700: '#2D6846FF',
  purple500: '#722ED1FF',
  purple600: '#6324B8FF',
  purple700: '#531DABFF',
  red500: '#C03C54FF',
  red600: '#B4384DFF',
  red700: '#902D3FFF',
  volcano500: '#C4320BFF',
  volcano600: '#B72A07FF',
  volcano700: '#A42505FF',
};

const samoletAccessibleBlue: Partial<Colors> = {
  blue500: '#006AD6FF',
  blue600: '#0062C9FF',
  blue700: '#004A97FF',
};

export const createAccessibleColors = (colors: Colors, brand: Brand): Colors => ({
  ...colors,
  ...commonAccessibleColors,
  ...(brand === 'samolet' ? samoletAccessibleBlue : undefined),
});
