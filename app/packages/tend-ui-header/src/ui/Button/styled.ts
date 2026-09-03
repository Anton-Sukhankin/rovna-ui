import styled, { css } from 'styled-components';

export const Root = styled.button<{ $selected?: boolean }>`
  /* Reset */
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
  text-decoration: none;
  background: none;

  /* Font */
  font-family: ${props => props.theme.fonts.museo};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;

  /* Shape */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  outline-offset: 2px;
  height: max-content;
  border-radius: 10px;
  padding: 4px;

  /* Animation */
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

  ${props => {
    if (props.$selected)
      return css`
        color: ${props => props.theme.colors.gray0};
        background: ${props => props.theme.colors['gray100-transparent']};

        &:focus-visible {
          outline-color: ${props => props.theme.colors['gray350-transparent']};
        }
        &:hover:not(:disabled) {
          cursor: pointer;
          color: ${props => props.theme.colors.gray0};
          background: ${props => props.theme.colors['gray150-transparent']};
        }
        &:active:not(:disabled) {
          color: ${props => props.theme.colors.gray0};
          background: ${props => props.theme.colors['gray100-transparent']};
        }
        &:disabled {
          cursor: not-allowed;
          color: ${props => props.theme.colors.gray400};
          background-color: ${props => props.theme.colors.gray50};
        }
      `;

    return css`
      color: ${props => props.theme.colors.gray0};

      &:focus-visible {
        outline-color: ${props => props.theme.colors['gray350-transparent']};
      }
      &:hover:not(:disabled) {
        cursor: pointer;
        color: ${props => props.theme.colors.gray0};
        background: ${props => props.theme.colors['gray100-transparent']};
      }
      &:active:not(:disabled) {
        color: ${props => props.theme.colors.gray0};
        background: ${props => props.theme.colors['gray150-transparent']};
      }
      &:disabled {
        cursor: not-allowed;
        color: ${props => props.theme.colors.gray400};
        background-color: ${props => props.theme.colors.gray50};
      }
    `;
  }}
`;
