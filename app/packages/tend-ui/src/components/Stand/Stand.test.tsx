import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Stand } from './Stand';

describe('Stand', () => {
  describe.each(['dev', 'stage', 'prod'] as const)('%s stand', stand => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(<Stand stand={stand} />);
      expect(snap).toMatchSnapshot();
    });
  });
});
