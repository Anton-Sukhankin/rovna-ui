import styled from 'styled-components';

export const Wrapper = styled.div<{ $checked: boolean }>`
  display: flex;
  height: 24px;
  align-items: center;
  opacity: ${({ $checked }) => ($checked ? '1' : '0')};
  transition: opacity 0.25s ease-in-out;
`;
