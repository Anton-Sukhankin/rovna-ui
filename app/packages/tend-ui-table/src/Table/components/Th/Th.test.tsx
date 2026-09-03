import React from 'react';

import { Root } from '@rovna-internal/table/Table';

import { snapshotWithTheme } from '../../../../../tend-ui/src/tools/snapshotWithTheme';
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
