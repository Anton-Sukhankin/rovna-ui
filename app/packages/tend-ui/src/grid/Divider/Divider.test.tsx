import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Divider } from './Divider';

describe('Divider', () => {
  describe.each(['horizontal', 'vertical'] as const)('%s type', type => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(<Divider type={type} />);
      expect(snap).toMatchSnapshot();
    });

    it('with "color" renders correctly', () => {
      const snap = snapshotWithTheme(<Divider type={type} color='blue600' />);
      expect(snap).toMatchSnapshot();
    });

    it('with custom margin renders correctly', () => {
      expect(snapshotWithTheme(<Divider type={type} margin={20} />)).toMatchSnapshot();
      expect(snapshotWithTheme(<Divider type={type} margin='20px' />)).toMatchSnapshot();
    });

    it('with no margin renders correctly', () => {
      expect(snapshotWithTheme(<Divider type={type} margin={0} />)).toMatchSnapshot();
      expect(snapshotWithTheme(<Divider type={type} margin='0px' />)).toMatchSnapshot();
    });
  });
});
