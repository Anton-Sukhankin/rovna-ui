import styled from 'styled-components';
import { scrollbar } from '@rovna-ui/components/styling';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: none;

  padding: 0 24px 24px;
  box-sizing: border-box;

  scrollbar-gutter: stable;

  height: auto;
  max-height: 100%;
  width: 100%;

  -webkit-overflow-scrolling: touch;
  scrollbar-gutter: stable;

  ${scrollbar}
`;
