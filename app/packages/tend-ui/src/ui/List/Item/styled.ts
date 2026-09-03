import styled, { css } from 'styled-components';

export const Root = styled.li<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.theme.colors.gray0};

  /* Shape */
  padding: 4px 0;

  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
  font-family: ${props => props.theme.fonts.museo};
  font-size: ${props => props.theme.fontSizes[14]};
  color: ${props => {
    if (props.$disabled) return props.theme.colors.gray400;

    return props.theme.colors.gray900;
  }};
  line-height: 20px;

  /* Animation */
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

  ${props => {
    if (props.$disabled) return;

    return css`
      &:hover {
        background: ${props => props.theme.colors['gray50-transparent']};
      }
    `;
  }}

  .anticon, .rovna-ui-icon-root {
    font-size: 16px;
  }
`;
