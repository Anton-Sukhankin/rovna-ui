import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Alert } from './Alert';

describe('Alert', () => {
  describe.each(['success', 'error', 'warning', 'info', 'neutral', 'loading'] as const)(
    '%s type',
    type => {
      it('renders correctly', () => {
        const snap = snapshotWithTheme(<Alert type={type} />);
        expect(snap).toMatchSnapshot();
      });

      it('borderless renders correctly', () => {
        const snap = snapshotWithTheme(<Alert type={type} border={false} />);
        expect(snap).toMatchSnapshot();
      });

      it('closable renders correctly', () => {
        const snap = snapshotWithTheme(<Alert type={type} closable />);
        expect(snap).toMatchSnapshot();
      });
    },
  );
});
