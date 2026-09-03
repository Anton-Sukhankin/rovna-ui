import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';
import { RovnaUI } from '@rovna-internal/components/theme';

import { HidingButton } from './HidingButton';

describe('HidingButton', () => {
  describe('"ru" locale', () => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(<HidingButton />);
      expect(snap).toMatchSnapshot();
    });
  });
  describe('"en" locale', () => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(
        <RovnaUI lang='en'>
          <HidingButton />
        </RovnaUI>,
      );
      expect(snap).toMatchSnapshot();
    });
  });
});
