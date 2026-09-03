import styled, { css } from 'styled-components';

export const Root = styled.label<{ $required?: boolean }>`
  font-family: ${props => props.theme.fonts.museo};
  font-size: 12px;
  font-style: normal;
  line-height: 16px;

  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;

  .anticon {
    font-size: 16px;
    color: ${props => props.theme.colors.gray500};
  }

  ${props =>
    props.$required &&
    css`
      &:before {
        content: '*';
        color: ${props => props.theme.colors.red600};
      }
    `}
`;
