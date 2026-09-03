import styled from 'styled-components';

export const Container = styled.div`
  position: sticky;
  top: -1px;
  opacity: 1;
  z-index: 1;

  padding: 4px;
  transition: opacity 0.25s ease-in-out;

  &.is-pinned {
    opacity: 0;
  }
`;

export const Body = styled.div`
  position: relative;
  width: fit-content;
  border-radius: 12px;
  padding: 2px 8px;
  margin: 0 auto;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(1px);
`;
