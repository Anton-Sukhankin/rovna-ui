import styled, { css } from 'styled-components';
import AntTitle from 'antd-core/es/typography/Title';
import React from 'react';
import { color, margin, textAlign, uppercase } from '@rovna-ui/styling';

export const Root = styled(AntTitle).attrs({
  $levels: {
    h1: css`
      line-height: 1.2;
    `,
    h2: css`
      line-height: 1.25;
    `,
    h3: css`
      line-height: 36px;
    `,
    h4: css`
      line-height: 32px;
    `,
    h5: css`
      line-height: 24px;
    `,
    d1: css`
      font-size: 64px;
      line-height: 1.25;
    `,
    d2: css`
      font-size: 56px;
      font-weight: 400;
      line-height: 1.28;
    `,
  },
})<{
  $uppercase?: boolean;
  $level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'd1' | 'd2';
  $margin?: React.CSSProperties['margin'];
  $color?: React.CSSProperties['color'];
  $textAlign?: React.CSSProperties['textAlign'];
}>`
  &&& {
    ${color}
    ${textAlign}
    ${margin}
    ${props => props.$levels[props.$level]}
    ${uppercase}
  }
`;
