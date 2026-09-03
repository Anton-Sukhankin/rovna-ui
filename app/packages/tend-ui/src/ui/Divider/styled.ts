import React from 'react';
import styled, { css } from 'styled-components';

export const Root = styled.hr<{
  $type: 'horizontal' | 'vertical';
  $margin?: string;
  $padding?: string;
  $height?: string;
  $color?: React.CSSProperties['color'];
}>`
  ${props => {
    const { $color = props.theme.colors.gray100 } = props;
    if (props.$type === 'horizontal') {
      return css`
        width: 100%;
        border: none;
        border-top: 1px solid ${$color};
        margin: ${props.$margin || '8px 0'};
        padding: ${props.$padding || '8px 0'};
      `;
    }

    return css`
      width: 1px;
      height: ${props.$height || '1em'};
      vertical-align: middle;
      background-color: ${$color};
    `;
  }}
`;
