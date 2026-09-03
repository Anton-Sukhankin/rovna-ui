import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';
import { RovnaUI } from '@rovna-internal/components/theme';

import { NotFound } from './NotFound';

describe('NotFound', () => {
  describe('"ru" locale', () => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(<NotFound />);
      expect(snap).toMatchSnapshot();
    });
  });
  describe('"en" locale', () => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(
        <RovnaUI lang='en'>
          <NotFound />
        </RovnaUI>,
      );
      expect(snap).toMatchSnapshot();
    });
  });
});
