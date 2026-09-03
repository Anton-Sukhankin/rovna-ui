import styled from 'styled-components';
import { Box } from '@rovna-ui/grid';

export const Root = styled(Box)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px; /* Фиксированная высота, согласно требованиям */
  box-sizing: border-box;
  padding: 0 8px; /* Внутренние отступы 8px, как требуется */
  border-radius: 4px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px; /* Максимальная высота логотипа */
  max-width: 128px; /* Максимальная ширина логотипа */

  svg {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;
