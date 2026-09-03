import styled, { css } from 'styled-components';

export const Root = styled.div<{
  $selected?: boolean;
  $disabled?: boolean;
  $hovered?: boolean;
}>`
  box-sizing: border-box;
  padding: 10px 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 200px;
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

    if (props.$hovered)
      return css`
        cursor: pointer;
        background-color: ${props => props.theme.colors.gray50};
      `;

    return css`
      cursor: pointer;
      &:hover {
        background-color: ${props => props.theme.colors.gray50};
      }
    `;
  }}
`;
