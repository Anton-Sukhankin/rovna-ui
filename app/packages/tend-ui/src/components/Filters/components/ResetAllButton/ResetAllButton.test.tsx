import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';
import { RovnaUI } from '@rovna-internal/components/theme';

import { ResetAllButton } from './ResetAllButton';
import { Root } from '../Root';

describe('ResetAllButton', () => {
  describe('"ru" locale', () => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(
        <Root filters={[]}>
          <ResetAllButton />
        </Root>,
      );
      expect(snap).toMatchSnapshot();
    });
  });
  describe('"en" locale', () => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(
        <RovnaUI lang='en'>
          <Root filters={[]}>
            <ResetAllButton />
          </Root>
        </RovnaUI>,
      );
      expect(snap).toMatchSnapshot();
    });
  });
});
