import React from 'react';
import { render } from '@testing-library/react';

import { RovnaUI } from '@rovna-internal/components/theme';

import { ColumnsSettings } from './ColumnsSettings';
import { useColumns, useColumnsSettings } from './hooks';
import { ColumnConfig } from './core';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

describe('ColumnsSettings', () => {
  describe('"ru" locale', () => {
    it('renders correctly', () => {
      const Component = () => {
        const [, model] = useColumns<ColumnConfig>([
          { id: '1', title: 'Column 1' },
          { id: '2', title: 'Column 2' },
          { id: '3', title: 'Column 3' },
        ]);
        const properties = useColumnsSettings(model);

        return <ColumnsSettings open {...properties} />;
      };

      const renderer = render(<Component />, { wrapper: RovnaUI });
      expect(renderer.asFragment()).toMatchSnapshot();
    });
  });

  describe('"en" locale', () => {
    it('renders correctly', () => {
      const Component = () => {
        const [, model] = useColumns<ColumnConfig>([
          { id: '1', title: 'Column 1' },
          { id: '2', title: 'Column 2' },
          { id: '3', title: 'Column 3' },
        ]);
        const properties = useColumnsSettings(model);

        return (
          <RovnaUI lang='en'>
            <ColumnsSettings open {...properties} />
          </RovnaUI>
        );
      };

      const renderer = render(<Component />, { wrapper: RovnaUI });
      expect(renderer.asFragment()).toMatchSnapshot();
    });
  });
});
