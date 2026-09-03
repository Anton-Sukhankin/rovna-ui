import styled, { css } from 'styled-components';
import React from 'react';

import { Size } from '@rovna-internal/components/types/Size';

export const Root = styled.th.attrs({
  $sizes: {
    large: css`
      padding: 12px;
    `,
    medium: css`
      padding: 8px 12px;
    `,
    small: css`
      padding: 4px 12px;
    `,
  },
})<{ $textAlign?: React.CSSProperties['textAlign']; $size: Size }>`
  font-family: ${props => props.theme.fonts.museo};
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  color: ${props => props.theme.colors.gray500};
  text-align: ${props => props.$textAlign || 'left'};

  ${props => props.$sizes[props.$size]};
`;
