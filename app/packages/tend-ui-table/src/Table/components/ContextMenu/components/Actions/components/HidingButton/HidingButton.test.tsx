import React from 'react';

import { RovnaUI } from '../../../../../../../../../tend-ui/src/theme/RovnaUI';
import { snapshotWithTheme } from '../../../../../../../../../tend-ui/src/tools/snapshotWithTheme';
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
