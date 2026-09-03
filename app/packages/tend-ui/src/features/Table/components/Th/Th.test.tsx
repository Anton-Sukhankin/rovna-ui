import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';
import { Root } from '@rovna-internal/components/features/Table';

import { Th } from './Th';

describe('Th', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(
      <Root>
        <Th>Child</Th>
      </Root>,
    );
    expect(snap).toMatchSnapshot();
  });
});
