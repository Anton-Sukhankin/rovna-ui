import styled, { css } from 'styled-components';

export const Col = styled.li<{ $selected?: boolean; $disabled?: boolean }>`
  min-width: 200px;
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 8px;
  transition: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-property: background, color;

  ${props => {
    if (props.$disabled)
      return css`
        cursor: not-allowed;
        color: ${props => props.theme.colors.gray400};
        &:hover {
          background-color: ${props => props.theme.colors.gray50};
        }
      `;

    if (props.$selected)
      return css`
        cursor: pointer;
        background-color: ${props => props.theme.colors.blue100};
      `;

    return css`
      cursor: pointer;
      &:hover {
        background-color: ${props => props.theme.colors.gray50};
      }
    `;
  }}
`;
