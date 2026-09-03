import styled, { css } from 'styled-components';
import AntTypography from 'antd-core/es/typography/Text';
import {
  Color,
  FontWeight,
  Height,
  Margin,
  TextAlign,
  Uppercase,
  WhiteSpace,
  Width,
  WordBreak,
  color,
  fontWeight,
  height,
  margin,
  textAlign,
  uppercase,
  whiteSpace,
  width,
  wordBreak,
} from '@rovna-ui/styling';

import { fontSize } from '../styled';
import { Size } from '../types';

type RootProps = Width &
  Height &
  Margin &
  Uppercase &
  Color &
  FontWeight &
  TextAlign &
  WordBreak &
  WhiteSpace & {
    $size?: Size;
  };

export const Root = styled(AntTypography)<RootProps>`
  &.rovna-ui-typography-text {
    ${fontSize};
    ${fontWeight};
    ${wordBreak};
    ${color};
    ${uppercase};
    ${margin};
    ${width};
    ${height};
    ${whiteSpace};
    ${props =>
      [
        props.$width,
        props.$height,
        props.$marginTop,
        props.$marginRight,
        props.$marginBottom,
        props.$marginLeft,
        props.$margin,
      ].some(Boolean) &&
      css`
        display: inline-block;
      `}
    ${props =>
      props.$textAlign &&
      css`
        display: inline-block;
        ${textAlign};
      `}
  }
`;
