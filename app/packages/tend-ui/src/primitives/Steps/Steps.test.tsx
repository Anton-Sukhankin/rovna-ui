import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Steps } from './Steps';

describe('Steps', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(
      <Steps
        items={[
          {
            title: 'Заголовок 1',
            description: 'Описание 1',
          },
          {
            title: 'Заголовок 2',
            description: 'Описание 2',
          },
          {
            title: 'Заголовок 3',
            description: 'Описание 3',
          },
        ]}
      />,
    );

    expect(snap).toMatchSnapshot();
  });

  it('vertical renders correctly', () => {
    const snap = snapshotWithTheme(
      <Steps
        direction='vertical'
        items={[
          {
            title: 'Заголовок 1',
            description: 'Описание 1',
          },
          {
            title: 'Заголовок 2',
            description: 'Описание 2',
          },
          {
            title: 'Заголовок 3',
            description: 'Описание 3',
          },
        ]}
      />,
    );

    expect(snap).toMatchSnapshot();
  });
});
