import styled, { css } from 'styled-components';

export const Root = styled.main.attrs({
  $sizes: {
    small: css`
      padding: 16px;
    `,
    medium: css`
      padding: 16px;
    `,
    large: css`
      padding: 16px;
    `,
  },
})<{ $size: 'large' | 'medium' | 'small'; $background?: string }>`
  flex: 1;

  ${props => props.$sizes[props.$size]};
  background-color: ${props => props.$background};
`;
