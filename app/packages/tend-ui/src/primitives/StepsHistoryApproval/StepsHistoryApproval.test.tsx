import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { StepsHistoryApproval } from './StepsHistoryApproval';
import { items } from './data';

describe('StepsHistoryApproval', () => {
  const historyApprovalProps = {
    items,
  };

  it('renders correctly with history approval props', () => {
    const snap = snapshotWithTheme(<StepsHistoryApproval {...historyApprovalProps} />);

    expect(snap).toMatchSnapshot();
  });

  it('renders correctly default stepper', () => {
    const snap = snapshotWithTheme(<StepsHistoryApproval items={items} />);

    expect(snap).toMatchSnapshot();
  });
});
