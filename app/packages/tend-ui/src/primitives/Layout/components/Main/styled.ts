import styled, { css } from 'styled-components';

import { Size } from '@rovna-internal/components/types/Size';

export const Root = styled.main.attrs({
  $backgrounds: {
    white: css`
      background-color: ${props => props.theme.colors.gray0};
    `,
    blue: css`
      background-color: ${props => props.theme.colors.blue100};
    `,
  },
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
})<{ $size: Size; $background: 'white' | 'blue' }>`
  flex: 1;

  ${props => props.$sizes[props.$size]};
  ${props => props.$backgrounds[props.$background]};
`;
