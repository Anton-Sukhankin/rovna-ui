import styled, { css } from 'styled-components';
import { margin, padding } from '@rovna-ui/styling';

import { Size } from '@rovna-internal/components/types/Size';

export const Root = styled.header.attrs({
  $sizes: {
    small: css`
      padding: 8px 16px;
    `,
    medium: css`
      padding: 8px 16px;
    `,
    large: css`
      padding: 8px 16px;
    `,
  },
})<{ $sticky: boolean; $size: Size }>`
  position: ${props => (props.$sticky ? 'sticky' : 'static')};
  z-index: 999;
  top: 0;

  display: flex;
  align-items: center;
  gap: 12px;

  background-color: ${props => props.theme.colors.gray0};
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.gray100};

  ${props => props.$sizes[props.$size]};
  ${margin};
  ${padding};
`;
