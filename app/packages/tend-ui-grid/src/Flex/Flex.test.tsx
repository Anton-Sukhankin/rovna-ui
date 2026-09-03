import React from 'react';

import { snapshotWithTheme } from '../../../tend-ui/src/tools/snapshotWithTheme';
import { Flex } from './Flex';

describe('Flex', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(
      <Flex mb={100}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Flex>,
    );

    expect(snap).toMatchSnapshot();
  });
});
