import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';
import { RovnaUI } from '@rovna-internal/components/theme';

import { Forbidden } from './Forbidden';

describe('Forbidden', () => {
  describe('"ru" locale', () => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(<Forbidden />);
      expect(snap).toMatchSnapshot();
    });
  });
  describe('"en" locale', () => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(
        <RovnaUI lang='en'>
          <Forbidden />
        </RovnaUI>,
      );
      expect(snap).toMatchSnapshot();
    });
  });
});
