import React from 'react';

import { Root } from '@rovna-internal/table/Table';

import { snapshotWithTheme } from '../../../../../tend-ui/src/tools/snapshotWithTheme';
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
