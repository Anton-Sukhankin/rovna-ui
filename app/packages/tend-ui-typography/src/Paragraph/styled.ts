import styled from 'styled-components';
import {
  Color,
  FontWeight,
  Margin,
  TextAlign,
  Uppercase,
  WhiteSpace,
  color,
  fontWeight,
  height,
  margin,
  padding,
  textAlign,
  uppercase,
  whiteSpace,
  width,
} from '@rovna-ui/styling';

import { fontSize } from '../styled';
import { Size } from '../types';
import { INTERNAL_TypographyBase } from '../Base';

type RootProps = {
  $size?: Size;
};

export const Root = styled(INTERNAL_TypographyBase)<
  RootProps & Margin & Color & TextAlign & WhiteSpace & Uppercase & FontWeight
>`
  &.rovna-ui-typography {
    margin-top: 0px;
    ${fontSize};
    ${color};
    ${whiteSpace};
    ${textAlign};
    ${uppercase};
    ${margin};
    ${width};
    ${height};
    ${padding};
    ${fontWeight};
  }
`;
