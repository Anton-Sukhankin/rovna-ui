import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';
import { RovnaUI } from '@rovna-internal/components/theme';

import { Layout } from './Layout';

describe('Layout', () => {
  describe('"ru" locale', () => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(<Layout />);
      expect(snap).toMatchSnapshot();
    });
  });
  describe('"en" locale', () => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(
        <RovnaUI lang='en'>
          <Layout />
        </RovnaUI>,
      );
      expect(snap).toMatchSnapshot();
    });
  });
});
