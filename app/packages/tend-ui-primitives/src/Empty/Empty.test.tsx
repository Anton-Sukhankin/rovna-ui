import React from 'react';

import { snapshotWithTheme } from '../../../tend-ui/src/tools/snapshotWithTheme';
import { Empty } from './Empty';
import { sizes, variants } from './types';

describe('Empty', () => {
  describe.each(sizes)('%s size', size => {
    describe.each(variants)('%s variant', variant => {
      it('renders correctly', () => {
        const result = snapshotWithTheme(<Empty size={size} variant={variant} />);
        expect(result).toMatchSnapshot();
      });
    });
  });
});
