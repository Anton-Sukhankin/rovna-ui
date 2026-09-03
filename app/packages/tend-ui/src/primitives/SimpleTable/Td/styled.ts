import React from 'react';
import styled, { css } from 'styled-components';

import { Size } from '@rovna-internal/components/types/Size';

export const Root = styled.td.attrs({
  $sizes: {
    large: css`
      padding: 20px 12px;
    `,
    medium: css`
      padding: 12px;
    `,
    small: css`
      padding: 4px 12px;
    `,
  },
})<{ $textAlign?: React.CSSProperties['textAlign']; $size: Size }>`
  font-family: ${props => props.theme.fonts.museo};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${props => props.theme.colors.gray900};
  text-align: ${props => props.$textAlign};

  ${props => props.$sizes[props.$size]};
`;
