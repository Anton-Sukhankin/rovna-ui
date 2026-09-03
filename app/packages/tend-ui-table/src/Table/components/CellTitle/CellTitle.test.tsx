import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-test-renderer';

import { ContextMenu, Root, Toolbar } from '@rovna-internal/table/Table';

import { snapshotWithTheme } from '../../../../../tend-ui/src/tools/snapshotWithTheme';
import { CellTitle } from './CellTitle';

describe('CellTitle', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(
      <Root>
        <CellTitle id='contractor'>Child</CellTitle>
      </Root>,
    );
    expect(snap).toMatchSnapshot();
  });

  describe('when array-like filter is empty', () => {
    it('should not render "FilterIndicator"', async () => {
      const renderer = render(
        <Root
          value={{ filters: { contractor: [] } }}
          columns={[{ id: 'contractor' }]}
          filters={[
            {
              id: 'contractor',
              name: 'contractor',
              component: { component: 'checkbox-group-search' },
            },
          ]}
        >
          <ContextMenu id='contractor'>
            <CellTitle id='contractor'>Contractor</CellTitle>
          </ContextMenu>
        </Root>,
      );

      expect(renderer.queryByTestId('rovna-ui-filter-alt-icon')).not.toBeInTheDocument();
    });
  });

  describe('when array-like filter is not empty', () => {
    it('should render "FilterIndicator"', async () => {
      const renderer = render(
        <Root
          value={{ filters: { contractor: ['A'] } }}
          columns={[{ id: 'contractor' }]}
          filters={[
            {
              id: 'contractor',
              name: 'contractor',
              component: { component: 'checkbox-group-search' },
            },
          ]}
        >
          <ContextMenu id='contractor'>
            <CellTitle id='contractor'>Contractor</CellTitle>
          </ContextMenu>
        </Root>,
      );

      expect(renderer.queryByTestId('rovna-ui-filter-alt-icon')).toBeInTheDocument();
    });
  });

  describe('when sorters have been clicked', () => {
    it('renders correctly', () => {
      const renderer = render(
        <Root sorters={[{ id: 'contractor', name: 'contractor', label: 'Подрядчик' }]}>
          <Toolbar.Sorters open />
          <CellTitle id='contractor'>Child</CellTitle>
        </Root>,
      );

      const sorter = renderer.getByText(/Подрядчик/);

      act(() => {
        fireEvent.click(sorter);
      });

      expect(renderer.getAllByTestId('rovna-ui-arrow-up-icon').length).toBe(2);

      act(() => {
        fireEvent.click(sorter);
      });

      expect(renderer.getAllByTestId('rovna-ui-arrow-down-icon').length).toBe(2);

      act(() => {
        fireEvent.click(sorter);
      });

      expect(renderer.queryAllByText('rovna-ui-arrow-up-icon').length).toBe(0);
      expect(renderer.queryAllByText('rovna-ui-arrow-down-icon').length).toBe(0);
    });
  });
});
