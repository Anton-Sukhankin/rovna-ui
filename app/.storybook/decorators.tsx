import React from 'react';
import type { Decorator } from '@storybook/react-vite';

import { RovnaUI } from '../packages/tend-ui/src/theme';
import { MuseoSansCyrl } from '../packages/tend-ui-fonts/src';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  code {
    white-space: pre;
  }
`;

export const withRovnaUI: Decorator = (Story, context) => {
  const theme = context.globals.theme;
  const lang = context.globals.locale;

  return (
    <RovnaUI lang={lang} theme={theme}>
      <GlobalStyles />
      <MuseoSansCyrl />
      <Story />
    </RovnaUI>
  );
};
