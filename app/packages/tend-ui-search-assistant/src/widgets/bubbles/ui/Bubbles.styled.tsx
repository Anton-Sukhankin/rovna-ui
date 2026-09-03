import { scrollbar } from '@rovna-ui/components/styling';
import styled from 'styled-components';

export const Bubbles = styled.div`
  width: 100%;
  flex: 1 1 auto;
  position: relative;
  z-index: 1;
  overflow: hidden;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-height: 100%;
  justify-content: flex-end;
  padding: 0 16px 0 24px;
  box-sizing: content-box;
`;

export const Scrollable = styled.div`
  overflow-y: auto;
  height: auto;
  display: block;
  width: 100%;
  max-height: 100%;
  overflow-x: hidden;
  position: absolute;
  inset: 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-gutter: stable;

  &.is-scrolling .is-pinned {
    opacity: 1;
  }

  ${scrollbar}
`;

export const BubblesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
