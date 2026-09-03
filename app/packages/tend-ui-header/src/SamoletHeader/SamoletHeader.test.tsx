import React from 'react';

import { snapshotWithTheme } from '../../../tend-ui/src/tools/snapshotWithTheme';
import { SamoletHeader } from './SamoletHeader';

jest.mock('@rovna-ui/hooks', () => ({
  ...jest.requireActual('@rovna-ui/hooks'),
  useMediaQuery: () => true,
}));

describe('SamoletHeader', () => {
  describe('given "user" with role', () => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(
        <SamoletHeader
          app='s.pro'
          user={{
            username: 'Kvokka',
            firstName: 'Квокка',
            lastName: 'Квокковна',
            email: 'user@example.com',
            role: 'employee',
          }}
        />,
      );
      expect(snap).toMatchSnapshot();
    });
  });
  describe('given "user" without role', () => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(
        <SamoletHeader
          app='s.pro'
          user={{
            username: 'Kvokka',
            firstName: 'Квокка',
            lastName: 'Квокковна',
            email: 'user@example.com',
          }}
        />,
      );
      expect(snap).toMatchSnapshot();
    });
  });
});
