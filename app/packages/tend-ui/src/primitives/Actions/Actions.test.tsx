import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Actions } from './Actions';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: unknown) => node,
}));

describe('Actions', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(<Actions />);
    expect(snap).toMatchSnapshot();
  });

  it('visible renders correctly', () => {
    const snap = snapshotWithTheme(<Actions counter={50} />);
    expect(snap).toMatchSnapshot();
  });
});
