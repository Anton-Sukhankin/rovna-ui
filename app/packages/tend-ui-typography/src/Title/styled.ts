import styled, { css } from 'styled-components';
import {
  Color,
  TextAlign,
  Uppercase,
  WhiteSpace,
  color,
  height,
  margin,
  padding,
  textAlign,
  uppercase,
  whiteSpace,
  width,
} from '@rovna-ui/styling';

import { INTERNAL_TypographyBase } from '../Base';
import { TitleLevel } from './types';

type RootProps = {
  $level: TitleLevel;
};

export const Root = styled(INTERNAL_TypographyBase).attrs({
  $levels: {
    h1: css`
      line-height: 1.2;
      font-weight: 600;
    `,
    h2: css`
      line-height: 1.25;
      font-weight: 600;
    `,
    h3: css`
      line-height: 36px;
      font-weight: 600;
    `,
    h4: css`
      line-height: 32px;
      font-weight: 600;
    `,
    h5: css`
      line-height: 24px;
      font-weight: 600;
    `,
    h6: css`
      font-size: 16px;
      line-height: 20px;
      margin-top: 1.2em;
      margin-bottom: 0.5em;
      font-weight: 600;
    `,
    d1: css`
      font-size: 64px;
      line-height: 1.25;
      font-weight: 600;
    `,
    d2: css`
      font-size: 56px;
      font-weight: 400;
      line-height: 1.28;
    `,
  },
})<Color & TextAlign & Uppercase & WhiteSpace & RootProps>`
  &&& {
    ${props => props.$levels[props.$level]};
    ${color};
    ${whiteSpace};
    ${textAlign};
    ${margin};
    ${uppercase};
    ${width};
    ${padding};
    ${height};
  }
`;
