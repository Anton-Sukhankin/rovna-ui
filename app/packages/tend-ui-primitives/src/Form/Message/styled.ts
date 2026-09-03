import styled from 'styled-components';

export const Root = styled.div`
  color: ${props => props.theme.colors.red600};
  font-family: Museo Sans Cyrl;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;

  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;
