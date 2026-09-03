import styled from 'styled-components';

export const Root = styled.div`
  font-family: ${props => props.theme.fonts.museo};
  color: ${props => props.theme.colors.gray650};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.333;

  margin-top: 4px;
  display: flex;
  align-items: center;
`;
