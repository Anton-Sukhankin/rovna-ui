import styled from 'styled-components';
import { colors } from '@rovna-ui/tokens/samolet';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 24px;
  border-width: 0 0 1px 0;
  border-color: ${colors.gray100};
  border-style: solid;
  height: 38px;
  flex-shrink: 0;
  box-sizing: border-box;
`;
