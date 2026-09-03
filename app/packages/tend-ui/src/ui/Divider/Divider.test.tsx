import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Divider } from './Divider';

describe('Divider', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(<Divider />);
    expect(snap).toMatchSnapshot();
  });

  it('with "color" renders correctly', () => {
    const snap = snapshotWithTheme(<Divider color='blue600' />);
    expect(snap).toMatchSnapshot();
  });

  it('with "margin" and "padding" renders correctly', () => {
    const snap = snapshotWithTheme(<Divider margin='10px' padding='5px' />);
    expect(snap).toMatchSnapshot();
  });
});
