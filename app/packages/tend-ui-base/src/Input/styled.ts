import styled from 'styled-components';

export const Root = styled.input`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.blue600};
  background-color: ${props => props.theme.colors.gray50};

  margin: 0;
  padding: 0;
`;
