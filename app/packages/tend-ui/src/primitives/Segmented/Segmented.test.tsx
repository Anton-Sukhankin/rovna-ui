import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';
import { Home } from '@rovna-internal/components/icons/Home';

import { Segmented } from './Segmented';

describe('Segmented', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(
      <Segmented options={['Monday', 'Tuesday', 'Wednesday']} />,
    );
    expect(snap).toMatchSnapshot();
  });

  it('with icon renders correctly', () => {
    const snap = snapshotWithTheme(
      <Segmented
        options={[
          {
            icon: <Home />,
            label: 'Monday',
            value: 'Monday',
          },
          {
            icon: <Home />,
            label: 'Tuesday',
            value: 'Tuesday',
          },
          {
            icon: <Home />,
            label: 'Wednesday',
            value: 'Wednesday',
          },
        ]}
      />,
    );
    expect(snap).toMatchSnapshot();
  });

  it('with icon renders correctly', () => {
    const snap = snapshotWithTheme(
      <Segmented
        options={[
          {
            icon: <Home />,
            label: 'Monday',
            value: 'Monday',
            badge: { inner: 100 },
          },
          {
            icon: <Home />,
            label: 'Tuesday',
            value: 'Tuesday',
            badge: { inner: 24 },
          },
          {
            icon: <Home />,
            label: 'Wednesday',
            value: 'Wednesday',
            badge: { inner: 88 },
          },
        ]}
      />,
    );
    expect(snap).toMatchSnapshot();
  });
});
