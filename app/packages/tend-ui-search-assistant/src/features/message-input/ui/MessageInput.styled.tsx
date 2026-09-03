import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 24px 16px 24px;
  gap: 8px;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 1;

  &.shadow {
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
  }
`;
