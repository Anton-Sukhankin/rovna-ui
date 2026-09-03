import styled from 'styled-components';

export const Root = styled.form<{ $gap: number }>`
  display: flex;
  flex-direction: column;
  gap: ${props => `${props.$gap}px`};
`;
