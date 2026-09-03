import React from 'react';

import { snapshotWithTheme } from '../../../../../../../../../tend-ui/src/tools/snapshotWithTheme';
import { RovnaUI } from '../../../../../../../../../tend-ui/src/theme/RovnaUI';
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
