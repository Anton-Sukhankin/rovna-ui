import { createGlobalStyle } from 'styled-components';

type RuntimeConfig = {
  fonts?: {
    baseUrl?: string;
  };
};

const fontBaseUrl = (
  (
    globalThis as typeof globalThis & { __ROVNA_UI_RUNTIME_CONFIG__?: RuntimeConfig }
  ).__ROVNA_UI_RUNTIME_CONFIG__?.fonts?.baseUrl ?? '/fonts'
).replace(/\/$/, '');

export const MuseoSansCyrl = createGlobalStyle`
  @font-face {
    font-family: 'Museo Sans Cyrl';
    src: local('Museo Sans Cyrl'),
      url('${fontBaseUrl}/MuseoSansCyrl-250.woff') format('woff'),
      url('${fontBaseUrl}/MuseoSansCyrl-250.ttf') format('truetype');
    font-weight: 250;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Museo Sans Cyrl';
    src: local('Museo Sans Cyrl'),
      url('${fontBaseUrl}/MuseoSansCyrl-250Italic.woff') format('woff'),
      url('${fontBaseUrl}/MuseoSansCyrl-250Italic.ttf') format('truetype');
    font-weight: 250;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Museo Sans Cyrl';
    src: local('Museo Sans Cyrl'),
      url('${fontBaseUrl}/MuseoSansCyrl-300.woff') format('woff'),
      url('${fontBaseUrl}/MuseoSansCyrl-300.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Museo Sans Cyrl';
    src: local('Museo Sans Cyrl'),
      url('${fontBaseUrl}/MuseoSansCyrl-300Italic.woff') format('woff'),
      url('${fontBaseUrl}/MuseoSansCyrl-300Italic.ttf') format('truetype');
    font-weight: 300;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Museo Sans Cyrl';
    src: local('Museo Sans Cyrl'),
      url('${fontBaseUrl}/MuseoSansCyrl-400.woff') format('woff'),
      url('${fontBaseUrl}/MuseoSansCyrl-400.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Museo Sans Cyrl';
    src: local('Museo Sans Cyrl'),
      url('${fontBaseUrl}/MuseoSansCyrl-400Italic.woff') format('woff'),
      url('${fontBaseUrl}/MuseoSansCyrl-400Italic.ttf') format('truetype');
    font-weight: 400;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Museo Sans Cyrl';
    src: local('Museo Sans Cyrl'),
      url('${fontBaseUrl}/MuseoSansCyrl-600.woff') format('woff'),
      url('${fontBaseUrl}/MuseoSansCyrl-600.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Museo Sans Cyrl';
    src: local('Museo Sans Cyrl'),
      url('${fontBaseUrl}/MuseoSansCyrl-600Italic.woff') format('woff'),
      url('${fontBaseUrl}/MuseoSansCyrl-600Italic.ttf') format('truetype');
    font-weight: 600;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Museo Sans Cyrl';
    src: local('Museo Sans Cyrl'),
      url('${fontBaseUrl}/MuseoSansCyrl-700.woff') format('woff'),
      url('${fontBaseUrl}/MuseoSansCyrl-700.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Museo Sans Cyrl';
    src: local('Museo Sans Cyrl'),
      url('${fontBaseUrl}/MuseoSansCyrl-700Italic.woff') format('woff'),
      url('${fontBaseUrl}/MuseoSansCyrl-700Italic.ttf') format('truetype');
    font-weight: 700;
    font-style: italic;
    font-display: swap;
  }
`;
