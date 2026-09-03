import styled from 'styled-components';

export const Root = styled.button`
  cursor: pointer;
  display: flex;
  padding: 0;
  margin: 0;
  border-color: transparent;
  background: transparent;
  color: ${props => props.theme.colors.gray650};

  /* Animation */
  transition: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-property: color;

  &:hover {
    color: ${props => props.theme.colors.gray900};
  }
`;
