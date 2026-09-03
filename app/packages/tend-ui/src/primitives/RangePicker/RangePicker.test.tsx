import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { RangePicker } from './RangePicker';

import 'dayjs/locale/ru';

jest.useFakeTimers().setSystemTime(new Date('2023-11-09'));
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: unknown) => node,
}));

describe('RangePicker', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(<RangePicker />);
    expect(snap).toMatchSnapshot();
  });

  it('with dropdown renders correctly', () => {
    const snap = snapshotWithTheme(<RangePicker open />);
    expect(snap).toMatchSnapshot();
  });
});
