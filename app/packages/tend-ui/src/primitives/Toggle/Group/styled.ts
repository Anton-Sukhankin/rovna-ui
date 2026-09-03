import styled, { css } from 'styled-components';

export const Root = styled.div<{ $layout: 'horizontal' | 'vertical' }>`
  display: flex;

  ${props => {
    if (props.$layout === 'vertical') {
      return css`
        flex-direction: column;
        gap: 8px;
      `;
    }

    return css`
      gap: 24px;
    `;
  }}
`;
