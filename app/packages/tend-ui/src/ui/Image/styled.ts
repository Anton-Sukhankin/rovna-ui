import { Height, Width, height, width } from '@rovna-ui/styling';
import styled from 'styled-components';

export const Root = styled.div<Width & Height>`
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  ${width};
  ${height};
`;
export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
