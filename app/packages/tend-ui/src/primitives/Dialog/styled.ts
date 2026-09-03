import styled, { createGlobalStyle } from 'styled-components';

import { Box as _Box } from '@rovna-internal/components/grid/Box';

/**
 * @deprecated Можно удалить, стили поставляются из коробки
 */
export const Styles = createGlobalStyle``;
export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
export const ImageContainer = styled.div<{
  $layout: 'contain' | 'cover';
}>`
  height: 100%;
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: ${props => (props.$layout === 'contain' ? '8px' : '16px 16px 0 0')};
`;
export const Box = styled(_Box)`
  font-family: Museo Sans Cyrl;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;
