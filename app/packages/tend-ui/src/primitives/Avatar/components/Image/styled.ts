import styled from 'styled-components';

export const Root = styled.img<{ $objectFit: 'cover' | 'contain' }>`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.$objectFit};
`;
