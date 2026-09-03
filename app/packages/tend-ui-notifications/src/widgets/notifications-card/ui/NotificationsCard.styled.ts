import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: grid;
  grid-gap: 4px;

  &:hover {
    #notification-checkbox,
    #notification-archive-btn {
      opacity: 1;
    }
  }
`;
