import styled, { keyframes } from 'styled-components';

import { Box } from '@rovna-internal/components/grid/Box';

const opacity = keyframes`
  100% {
    opacity: .5;
  }
  `;

export const Root = styled(Box)`
  animation: ${opacity} ease-in-out 1s infinite alternate;
`;
