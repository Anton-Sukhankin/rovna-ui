import styled from 'styled-components';
import { scrollbar } from '@rovna-ui/components/styling';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: none;

  padding: 20px 16px 0 24px;
  box-sizing: border-box;

  scrollbar-gutter: stable;

  height: auto;
  max-height: 100%;
  width: 100%;

  -webkit-overflow-scrolling: touch;
  scrollbar-gutter: stable;

  ${scrollbar}
`;
