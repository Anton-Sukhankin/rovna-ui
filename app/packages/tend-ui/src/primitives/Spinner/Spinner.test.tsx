import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Spinner } from './Spinner';

describe('Spinner', () => {
  describe.each(['xs', 'medium', 'small', 'large'] as const)('%s size', size => {
    it.each(['white', 'black', 'yellow'] as const)(
      'with %s color renders correctly',
      color => {
        const snap = snapshotWithTheme(<Spinner size={size} color={color} />).toJSON();
        expect(snap).toMatchSnapshot();
      },
    );

    it('with children renders correctly', () => {
      const snap = snapshotWithTheme(<Spinner size={size}>Children</Spinner>).toJSON();
      expect(snap).toMatchSnapshot();
    });

    it('loading=false renders correctly', () => {
      const snap = snapshotWithTheme(
        <Spinner size={size} loading={false}>
          Children
        </Spinner>,
      ).toJSON();
      expect(snap).toMatchSnapshot();
    });
  });
});
