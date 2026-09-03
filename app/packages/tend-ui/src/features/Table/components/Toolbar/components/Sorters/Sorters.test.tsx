import React from 'react';
import { render } from '@testing-library/react';

import { Root } from '@rovna-internal/components/features/Table';

import { Sorters } from './Sorters';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: unknown) => node,
}));

describe('Sorters', () => {
  it('renders correctly', () => {
    const snap = render(
      <Root
        sorters={[
          {
            key: 'sorter-one',
            id: 'sorter-one',
            name: 'sorter-one',
            label: 'Sorter 1',
          },
          {
            key: 'sorter-two',
            id: 'sorter-two',
            name: 'sorter-two',
            label: 'Sorter 2',
          },
        ]}
      >
        <Sorters open />
      </Root>,
    );

    expect(snap.asFragment()).toMatchSnapshot();
  });
});
