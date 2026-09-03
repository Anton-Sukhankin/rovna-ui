import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';
import { RovnaUI } from '@rovna-internal/components/theme';

import { EmptyOverlay } from './EmptyOverlay';

describe('EmptyOverlay', () => {
  describe('"ru" locale', () => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(<EmptyOverlay />);
      expect(snap).toMatchSnapshot();
    });
  });
  describe('"en" locale', () => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(
        <RovnaUI lang='en'>
          <EmptyOverlay />
        </RovnaUI>,
      );
      expect(snap).toMatchSnapshot();
    });
  });
});
