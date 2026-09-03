import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Search } from './Search';

describe('Search', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(<Search />);
    expect(snap).toMatchSnapshot();
  });

  it('title appears correctly', async () => {
    const renderer = render(<Search />);
    const input = renderer.getByTestId('rovna-ui-search');
    fireEvent.change(input, { target: { value: 'Hello Search' } });
    expect(input).toHaveAttribute('title', 'Hello Search');
  });

  describe.each([150, '150px'] as const)('when "width" is %s', width => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(<Search width={width} />);
      expect(snap).toMatchSnapshot();
    });
  });

  describe.each([
    ['margin', 16],
    ['margin', '16px'],
    ['mt', 16],
    ['mt', '16px'],
    ['mr', 16],
    ['mr', '16px'],
    ['mb', 16],
    ['mb', '16px'],
    ['ml', 16],
    ['ml', '16px'],
  ] as const)('and has %s property ', (property, value) => {
    it('renders correctly', () => {
      const props = {
        [property]: value,
      };

      const snap = snapshotWithTheme(<Search {...props} />);
      expect(snap).toMatchSnapshot();
    });
  });
});
