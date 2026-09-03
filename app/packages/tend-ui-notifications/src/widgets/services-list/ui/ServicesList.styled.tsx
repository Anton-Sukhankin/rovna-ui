import { scrollbar } from '@rovna-ui/components/styling';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: none;

  padding: 16px 16px 24px 24px;
  box-sizing: border-box;

  scrollbar-gutter: stable;

  height: auto;
  max-height: 100%;
  width: 100%;

  -webkit-overflow-scrolling: touch;
  scrollbar-gutter: stable;

  ${scrollbar}
`;
