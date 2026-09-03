import { createGlobalStyle } from 'styled-components';

/**
 * Нормализует браузерные стили
 */
export const Normalize = createGlobalStyle`
  html {
    overflow: hidden;
    height: 100%
  }

  body {
    margin: 0;
    overflow: hidden auto;
    height: 100%;
  }

  [hidden] {
      display: none !important;
  }

  #root {
    height: 100%;
  }
`;
