import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';
import { Root } from '@rovna-internal/components/features/Table';

import { HeaderCell } from './HeaderCell';

describe('HeaderCell', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(
      <Root>
        <HeaderCell>Child</HeaderCell>
      </Root>,
    );
    expect(snap).toMatchSnapshot();
  });
});
