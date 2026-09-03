import { margin } from '@rovna-ui/styling';
import styled from 'styled-components';

export const Root = styled.header<{
  $sticky?: boolean;
  $top?: string;
  $background?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: ${props => (props.$sticky ? 'sticky' : 'static')};
  z-index: 999;
  top: ${props => props.$top};

  padding: 8px 16px;
  background-color: ${props => props.$background};

  ${margin};
`;
