import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';
import { RovnaUI } from '@rovna-internal/components/theme';

import { ErrorOverlay } from './ErrorOverlay';

describe('ErrorOverlay', () => {
  describe('"ru" locale', () => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(<ErrorOverlay />);
      expect(snap).toMatchSnapshot();
    });
  });
  describe('"en" locale', () => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(
        <RovnaUI lang='en'>
          <ErrorOverlay />
        </RovnaUI>,
      );
      expect(snap).toMatchSnapshot();
    });
  });
});
