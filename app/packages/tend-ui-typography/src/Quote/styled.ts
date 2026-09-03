import styled from 'styled-components';

export const Root = styled('q')`
  font-family: ${props => props.theme.fonts.museo};
  font-size: ${props => props.theme.fontSizes[14]};
  line-height: 20px;
`;
