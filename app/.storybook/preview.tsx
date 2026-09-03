import type { Preview } from '@storybook/react-vite';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import dayjs from 'dayjs';

import { RovnaUI } from '../packages/tend-ui/src/theme';
import { withRovnaUI } from './decorators';
import 'dayjs/locale/ru';

dayjs.locale('ru');
RovnaUI.init();

const preview: Preview = {
  decorators: [withRovnaUI],
  parameters: {
    viewport: {
      options: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
    },
    options: {
      storySort: {
        order: [
          'Общая информация',
          'Rovna UI',
          [
            'Main',
            'Primitives',
            'Icons',
            'Logos',
            'Notifications',
            'Search Assistant',
            '*',
          ],
          '*',
        ],
      },
    },
    design: {
      name: 'Figma',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    a11y: {
      test: 'error',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Тема компонентов',
      defaultValue: 'samolet',
      toolbar: {
        title: 'Тема',
        icon: 'eye',
        items: [
          {
            value: 'samolet',
            title: 'Основная тема Rovna UI',
          },
          {
            value: 'global',
            title: 'Тема Global продуктов',
          },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      description: 'Язык компонентов',
      defaultValue: 'ru',
      toolbar: {
        title: 'Язык',
        icon: 'globe',
        items: [
          { value: 'en', right: '🇺🇸', title: 'Английский' },
          { value: 'ru', right: '🇷🇺', title: 'Русский' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
