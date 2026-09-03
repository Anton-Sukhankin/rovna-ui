import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Title } from './Title';

describe('Title', () => {
  it.each(['h1', 'h2', 'h3', 'h4', 'h5', 'd1', 'd2'] as const)(
    '%s level renders correctly',
    level => {
      const snap = snapshotWithTheme(<Title level={level}>Title</Title>);
      expect(snap).toMatchSnapshot();
    },
  );
});
