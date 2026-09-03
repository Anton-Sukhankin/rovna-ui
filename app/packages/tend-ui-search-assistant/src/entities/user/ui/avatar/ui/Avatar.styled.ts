import { colors } from '@rovna-ui/tokens/samolet';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: ${colors.blue100};
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  position: sticky;
  top: 0;
  bottom: 2px;
  overflow: hidden;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  color: ${colors.blue600};
  user-select: none;
`;

export const Image = styled.img`
  width: 24px;
  height: 24px;
  border-radius: inherit;
  display: block;
  user-drag: none;
  object-fit: cover;
`;
