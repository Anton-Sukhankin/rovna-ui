import styled from 'styled-components';
import { scrollbar } from '@rovna-ui/components/styling';

export const Root = styled.div.attrs({ role: 'tree', 'aria-label': 'Дерево' })`
  overflow: hidden auto;
  flex: 1;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  ${scrollbar};
`;
