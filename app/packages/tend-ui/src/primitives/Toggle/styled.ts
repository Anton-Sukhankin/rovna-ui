import styled, { css } from 'styled-components';

export const Container = styled.label<{
  $disabled?: boolean;
}>`
  ${props => {
    if (props.$disabled) {
      return css`
        cursor: not-allowed;
      `;
    }

    return css`
      cursor: pointer;
    `;
  }}

  display: inline-flex;
  align-items: flex-start;
  gap: 8px;
`;
