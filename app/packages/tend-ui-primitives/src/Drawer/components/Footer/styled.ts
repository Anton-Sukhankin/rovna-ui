import React from 'react';
import styled from 'styled-components';

export const Root = styled.div<{
  $justifyContent: React.CSSProperties['justifyContent'];
}>`
  &.rovna-ui-drawer-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: ${props => props.$justifyContent};
    padding: 16px 24px;
    border-top: none;
  }
`;
