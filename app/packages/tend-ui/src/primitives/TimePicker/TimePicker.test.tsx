import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { TimePicker } from './TimePicker';

import 'dayjs/locale/ru';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: unknown) => node,
}));

describe('TimePicker', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(<TimePicker />);
    expect(snap).toMatchSnapshot();
  });

  it('with dropdown renders correctly', () => {
    const snap = snapshotWithTheme(<TimePicker open />);
    expect(snap).toMatchSnapshot();
  });

  it('with custom width renders correctly', () => {
    const snap = snapshotWithTheme(<TimePicker width='100px' />);
    expect(snap).toMatchSnapshot();
  });
});
