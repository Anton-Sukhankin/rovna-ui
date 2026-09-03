import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Progress } from './Progress';

describe('Progress', () => {
  describe.each(['medium', 'small'] as const)('%s size', size => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(<Progress size={size} />);
      expect(snap).toMatchSnapshot();
    });
  });
});
