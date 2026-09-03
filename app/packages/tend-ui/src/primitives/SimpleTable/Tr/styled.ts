import styled, { css } from 'styled-components';

export const Root = styled.tr<{ $selected: boolean }>`
  border-bottom: 1px solid ${props => props.theme.colors.gray150};
  ${props => {
    if (props.$selected)
      return css`
        background-color: ${props.theme.colors.blue50};
        &:hover {
          background-color: ${props => props.theme.colors.blue100};
        }
      `;

    return css`
      &:hover {
        background-color: ${props => props.theme.colors.gray50};
      }
    `;
  }}
`;
