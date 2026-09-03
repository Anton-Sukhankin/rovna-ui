import styled from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: inline-flex;
  background: transparent;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${props => props.theme.colors.gray200};
  color: ${props => props.theme.colors.gray900};
`;
